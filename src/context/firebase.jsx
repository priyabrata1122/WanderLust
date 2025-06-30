import {createContext} from 'react'
import {initializeApp} from 'firebase/app'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDIiS_mfzd182EycuBQNkuEswl5-E6S4kg",
  authDomain: "wanderlust-bf31b.firebaseapp.com",
  projectId: "wanderlust-bf31b",
  storageBucket: "wanderlust-bf31b.firebasestorage.app",
  messagingSenderId: "122300758087",
  appId: "1:122300758087:web:5defd9f91058e33ad55962"
};


const firebaseApp=initializeApp(firebaseConfig);
const googleProvider=new GoogleAuthProvider();
const auth=getAuth(firebaseApp);
const db=getFirestore(firebaseApp);

export const FirebaseContext=createContext(null);

export const FirebaseProvider=(props)=>{

    const signIn=()=>{
        return signInWithPopup(auth, googleProvider)
        .then(async (result)=>{
            const user=result.user;
            const token=await user.getIdToken();

            const credential=GoogleAuthProvider.credentialFromResult(result);
            const googleAccessToken=credential.accessToken;

            localStorage.setItem("user",JSON.stringify({
                name:user.displayName,
                email:user.email,
                photoURL:user.photoURL,
                uid:user.uid,
                token:token,
                googleAccessToken:googleAccessToken
            }));

            console.log("User info saved to local storage");
            return user;
        })
        .catch((err)=>{
            console.log("Sign in failed");
            throw err;
        })
    }


    return(
        <FirebaseContext.Provider value={{signIn,auth,db}}>
            {props.children}
        </FirebaseContext.Provider>
    )
} 