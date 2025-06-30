import React, { use, useContext, useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '../components/ui/input'
import { SelestBudgetOptions , SelectTravelesList, AI_PROMPT} from '../constants/options';
import '../styles/Style_createTrip.css';
import { toast } from 'sonner';
import { ai, model, config } from '../service/AIModal';
import { FirebaseContext } from '../context/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function CreateTrip() {

    const [place, setPlace] = useState();
    const [formdata,setFormdata] = useState([]);

    const context=useContext(FirebaseContext);
    // console.log(context);
    const [user,setUser]=useState(null);

    const [loading,setLoading]=useState(false);

    const handleOnChange=(mname,value)=>{
        
        setFormdata({
            ...formdata,
            [mname]:value
        })
    } 

    // useEffect(()=>{
    //     console.log(formdata);
    // },[formdata]);

    const generateTrip=async ()=>{
        if(formdata?.noOfDays>5 || !formdata?.location || !formdata?.budget || !formdata?.people || !formdata?.noOfDays){
            toast("Please fill up Valid details")
            return;
        }

        setLoading(true);

        const FINAL_PROMPT=AI_PROMPT
        .replace('{location}',formdata?.location?.label)
        .replace('{noOfDays}',formdata?.noOfDays)
        .replace('{couple}',formdata?.people)
        .replace('{budget}',formdata?.budget)
        .replace('{noOfDays}',formdata?.noOfDays)

        console.log(FINAL_PROMPT);

        const contents = [
            {
            role: 'user',
            parts: [
                {
                text: FINAL_PROMPT,
                },
            ],
            },
        ];

        try {
            const response = await ai.models.generateContentStream({
            model,
            config,
            contents,
            });

            let fullText="";

            for await (const chunk of response) {
                fullText+=chunk.text;
            } 

            console.log(fullText);
            await SaveAITrips(fullText);

            toast("Trip generated and Saved");
        } catch (err) {
            console.error("Error generating trip:", err);
            toast("Failed to generate trip");
        }
        setLoading(false);
    }

    const SaveAITrips=async (Tripdata)=>{
        
        setLoading(true);

        const user=JSON.parse(localStorage.getItem('user'));
        const docId=Date.now().toString();
        await setDoc(doc(context.db,"AITrips",docId),{
            userSelection:formdata,
            tripData:JSON.parse(Tripdata),
            userEmail:user?.email,
            id:docId
        });

        setLoading(false);
    }

    useEffect(()=>{
        onAuthStateChanged(context.auth,user=>{
            if(user){
                setUser(user);
            }
            else{
                setUser(null);
            }
        })
    },[]);

    console.log(user);

    const handleOnClick=async ()=>{
        if(user){
            generateTrip();
        }
        else{
            try{
                await context.signIn();
                setTimeout(() => {
                    generateTrip();
                }, 1000);
            }
            catch(err){
                console.log("Sign in Failed", err);
                toast("Sign In failed, Pleasae try again");
            }
        }
    }

    return (
        <div
            style={{
                position: "relative",
                width: "96%",
                left: "1.5rem",
                top:"5rem",
                height:'57rem'
            }} className='maindiv'>
                <h1
                style={{
                    position:'fixed',
                    fontSize:'2.7rem',
                    top:'20rem',
                    left:'3rem',
                    color:'#5e5e5e'
                }}>Got a Vacation up? <br /> Start here by filling details</h1>
                <div className='insidediv'>
                    <h1 className='text-4xl ml-15 mb-5 font-serif'>Tell us your travel preferences ⛺🌴</h1>
                    <p className='text-xl text-gray-600 mb-5'> Just provide some basic information , and our trip planner will generate a <br /> customized itinerary based on your preferences</p>
                    <div>
                        <div>
                            <h2 className='text-xl font-serif mb-2'>What is destination of choice ? </h2>
                            <GooglePlacesAutocomplete
                                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                                selectProps={{
                                    place,
                                    onChange: (v) => {
                                        setPlace(v);
                                        handleOnChange('location',v);
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <h2 className='mt-7 text-xl font-serif mb-2'>How many days are you staying ? </h2>
                            <input className='border-gray border-2 rounded-sm w-full h-10 p-2 mb-7'
                            onChange={
                                (e)=>{
                                    handleOnChange('noOfDays',e.target.value)
                                }
                            }
                            placeholder={'Example - 3'} type="number"></input>
                        </div>

                        <div>
                            <h2 className='text-xl font-serif mb-4'>What is your budget ?</h2>
                            <div className='flex columns-3 justify-between'>
                                {
                                    SelestBudgetOptions.map((items, index) => (
                                        <div 
                                        className={`border-solid border-1 p-2 rounded-md cursor-pointer w-56 hover:shadow-lg
                                            ${formdata?.budget==items.title && 'border-black shadow-lg'}`}
                                        onClick={()=>{
                                            handleOnChange('budget',items.title);
                                        }}
                                        key={index}>
                                            <h1 className='text-2xl'>{items.icon}</h1>
                                            <h1 className='font-bold text-xl'>{items.title}</h1>
                                            <h4 className='text-gray-500'>{items.desc}</h4>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div>
                            <h2 className='mt-7 text-xl font-serif mb-2'>Who do you plan to travel with ?</h2>
                            <div className='flex w-full flex-wrap justify-between'>
                                {
                                    SelectTravelesList.map((items, index) => (
                                        <div 
                                        className={`border-solid border-1 p-2 rounded-md cursor-pointer mb-3 w-56 hover:shadow-lg
                                            ${formdata?.people==items.peple && 'border-black shadow-lg'}`}
                                        onClick={()=>{
                                            handleOnChange('people',items.peple)
                                        }}
                                        key={index}>
                                            <h1 className='text-2xl'>{items.icon}</h1>
                                            <h1 className='text-xl font-bold'>{items.title}</h1>
                                            <h4 className='text-gray-500'>{items.desc}</h4>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    </div>

                    <div className=''>
                        {
                            loading?
                            <>
                                <div className='left-150 w-30 relative mb-3  pt-1 pb-1 pl-2 pr-2 rounded-md text-lg bg-gray-500 text-white'>Loading...</div>
                            </>
                            :
                            <>
                                <button className='left-150 relative mb-3 pt-1 pb-1 pl-2 pr-2 rounded-md text-lg bg-black text-white cursor-pointer' onClick={()=>{handleOnClick()}}>Gererate Trip</button>
                            </>
                        }
                    </div>
                </div>
        </div>
    )
}

export default CreateTrip
