import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '../components/ui/input'
import { SelestBudgetOptions , SelectTravelesList} from '../constants/options';

function CreateTrip() {

    const [place, setPlace] = useState();
    const [formdata,setFormdata] = useState([]);

    const handleOnChange=(mname,value)=>{
        
        setFormdata({
            ...formdata,
            [mname]:value
        })
    } 

    // useEffect(()=>{
    //     console.log(formdata);
    // },[formdata]);

    const generateTrip=()=>{
        if(formdata?.noOfDays>5){
            console.log("Pkease enter a small number");
            return;
        }
        console.log(formdata);
    }

    return (
        <div
            style={{
                position: "relative",
                top: "3rem",
                width: "70rem",
                left: "12rem",
            }}
            className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-25'>
            <h2 className='font-bold text-3xl'>Tell us your travel preferences ⛺🌴</h2>
            <p className='mt-3 text-gray-500 text-xl'> Just provide some basic information , and our trip planner will generate a <br /> customized itinerary based on your preferences</p>


            <div className='flex flex-col gap-8'>
                <div className='mt-20 '>
                    <h2 className='text-xl my-3 font-medium'>What is destination of choice ? </h2>
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
                    <h2 className='text-xl my-3 font-medium'>How many days are you staying ? </h2>
                    <Input 
                    onChange={
                        (e)=>{
                            handleOnChange('noOfDays',e.target.value)
                        }
                    }
                    placeholder={'Example - 3'} type="number"></Input>
                </div>

                <div className='mt-10'>
                    <h2 className='text-xl my-3 font-medium'>What is your budget ?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-3'>
                        {
                            SelestBudgetOptions.map((items, index) => (
                                <div 
                                onClick={()=>{
                                    handleOnChange('budget',items.title);
                                }}
                                key={index} 
                                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                                ${formdata?.budget==items.title && 'shadow-lg border-black'}`}>
                                    <h1>{items.icon}</h1>
                                    <h1 className='text-2xl font-bold'>{items.title}</h1>
                                    <h4 className='text-l text-gray-500'>{items.desc}</h4>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className='mt-10'>
                    <h2 className='text-xl my-3 font-medium'>Who do you plan to travel with ?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-3'>
                        {
                            SelectTravelesList.map((items, index) => (
                                <div 
                                onClick={()=>{
                                    handleOnChange('people',items.peple)
                                }}
                                key={index} 
                                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                                ${formdata?.people==items.peple && 'shadow-lg border-black'}`}>
                                    <h1>{items.icon}</h1>
                                    <h1 className='text-2xl font-bold'>{items.title}</h1>
                                    <h4 className='text-l text-gray-500'>{items.desc}</h4>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>

            {/* <div className='my-10 justify-end flex'>
                <Button className>Generate Trip</Button>
            </div> */}

            <div className='my-10 justify-end flex'>
                <button style={{
                    width:"8rem",
                    height:"2.5rem",
                    backgroundColor:"Black",
                    color:"white",
                    borderRadius:"5px",
                    marginBottom:'2rem',
                    cursor:'pointer'
                }} onClick={()=>{generateTrip()}}>Gererate Trip</button>
            </div>

        </div>

    )
}

export default CreateTrip
