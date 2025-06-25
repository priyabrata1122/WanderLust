import React, { useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import {Input} from '../components/ui/input'

function CreateTrip() {

    const [place,setPlace] =useState();
  return (
    <div 
    style={{
        position:"relative",
        top:"3rem",
        width:"70rem",
        left:"12rem"
    }}
    className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-25 createtrip'>
        <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
        <p className='mt-3 text-gray-500 text-xl'> Just provide some basic information , and our trip planner will generate a <br /> customized itinerary based on your preferences</p>


        <div className='flex flex-col gap-8'>
            <div className='mt-20 '>
                <h2 className='text-xl my-3 font-medium'>What is destination of choice ? </h2>
                <GooglePlacesAutocomplete
                    apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                    selectProps={{
                        place,
                        onChange:(v)=>{
                            setPlace(v);
                            console.log(v);
                        }
                    }}
                />
                 
            </div>
            <div>
                <h2 className='text-xl my-3 font-medium'>How many days are you staying ? </h2>
                <Input placeholder={'Ex.3'} type="number"></Input>
            </div>

            <div>
                <h2 className='text-xl my-3 font-medium'>What is your budget ?</h2>
                 <div>
                    {SelestBudgetOptions.map}
                 </div>
            </div>
             
        </div>
    </div>
    
  )
}

export default CreateTrip
