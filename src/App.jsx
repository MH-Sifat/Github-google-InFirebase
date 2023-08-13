
import './App.css'
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app);
function App() {
 const [usershow,setUsershow]=useState({})
 const googleProvider = new GoogleAuthProvider();

 const handleGoogleLogin = () =>{
 signInWithPopup(auth,googleProvider)
 .then(result =>{
  const user = result.user;
  console.log(user);
  setUsershow(user)
  })
 .catch(error =>{
  console.log('Error',error);
  }) 
}

 const githubProvider = new GithubAuthProvider();
 const handleGithubLogin = () =>{

  signInWithPopup(auth,githubProvider)
  .then(result=>{
    const user = result.user;
    console.log(user);
    setUsershow(user);

  })
  .catch(error=>{
    console.log('Github Error',error);
  })
}
const handleSignOut = ()=>{
  signOut(auth)
  .then(()=>{
   setUsershow({})
  })
  .catch((error)=>{
   console.log('ERROR::',error);
  })
}
  return (
   <div>
    <div>
    {
      usershow?.uid ? <button onClick={handleSignOut}>Sign Out</button> : <>
      <button onClick={handleGoogleLogin}>LogIN with google</button>
    <button onClick={handleGithubLogin}>SignIn With Github </button>
      </>
    }
    </div>
     <h1>ready</h1>
     <h3>{usershow?.displayName}</h3>
     <img src={usershow?.photoURL} alt="" />
     <p>E-mail: {usershow?.email}</p>
    
   </div>
  )
}

export default App
