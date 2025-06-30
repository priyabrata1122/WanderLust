import React, { use, useContext, useEffect, useState } from 'react'
import '../styles/Style_header.css'
import {Link} from 'react-router-dom'
import { FirebaseContext } from '../context/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth';

function Header() {
  const context=useContext(FirebaseContext);
  const auth=context.auth;
  
  const [user,setUser]=useState(null);
  
  useEffect(()=>{
    onAuthStateChanged(auth,user=>{
      if(user){
        setUser(user);
      }
      else{
        setUser(null);
      }
    })
  },[]);

  // console.log(context);
  console.log(user);
  return (
    <div className="header">
        <Link to={'/'}>
          <h1 className='logoname'>wANDERLUST</h1>
        </Link>
        <div className="navbar">
            <h1>Out Tours</h1>
            <h1>About</h1>
            <h1>FAQs</h1>
        </div>

        {
          user?
          (<button className='signinbtn' onClick={()=>{
            signOut(auth)
            .then(()=>{
              localStorage.removeItem("user");
            })
          }}>Log out</button>)
          :
          (<button className='signinbtn' onClick={()=>{
            context.signIn()
          }}>Signin</button>)
        }

        {/* <button onClick={()=>{
          context.signIn();
        }} className='signinbtn'>Sign In</button> */}
    </div>
  )
}

export default Header
