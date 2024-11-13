import React, { useState } from 'react'
import "./Sstyle.css";
import Input from '../../input/iindex';
import Button from '../../Button/Bindex';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth } from '../../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from '../../../firebase';


const Signupsignin = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setloading] = useState(false);
    const [loginform, setloginform] = useState(false);
    const navigate = useNavigate();

    function Signupwithemial(){
      setloading(true);
      console.log("Name:", name);
      console.log("email:", email);
      console.log("Password:", password);
      console.log("Confirmpassword:", confirmPassword);
      // Authenticate the user or basically create a new account using email and password
      if (name !="" && email !="" && password !="" && confirmPassword !=""){
        if (password === confirmPassword){
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
           // Signed up 
          const user = userCredential.user;
          console.log("user...", user);
          toast.success("User created successfully...");
          setloading(false); 
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          createDoc(user);
          // create a doc with the userid as the following id
          navigate("/dashboard");
         
        })
          .catch((error) => {
          toast.error("User already in use kindly login into your account.....");
          setloading(false);
          // ..
       });
      }else{
        toast.error("Password and confirm-password must match")
        setloading(false);
      }
     }else{
            toast.error("All fields are mandatory !");
            setloading(false);
      }
    }
    function loginwithemial() {
      setloading(true);
      console.log("email:", email);
      console.log("password:",password);
      if ( email !="" && password !=""){  
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      toast.success("User logged in great...");
      setloading(false);
      console.log("loggedin user was", user);
      navigate("/dashboard");
      // ...
  })
  .catch((error) => {
    toast.error("User not found Kindly signup...")
  });
      }else{
        toast.error("Please enter all fields...")
      }
    }
   async function createDoc(user) {
      setloading(true);
      //make sure that the doc with the uid doesn't exist...
      //Create a doc
      if (!user) return;

      const userRef = doc( db, "users", user.uid);
      const userData = await getDoc(userRef);
      if (!userData.exists()) {
      try{
      await setDoc(doc(db, "users", user.uid), {
      name: user.displayName ? user.displayName : name,
      email: user.email,
      photoURL: user.photoURL ? user.photoURL : "", 
      createdAt: new Date(),
        });
        toast.success("Doc created successfully...");
      setloading(false);
      }catch(e){
        toast.error(e.message);
        setloading(false);
      }
       } else{
        //toast.error("Doc already exists...");
        setloading(false);
       }
    }
    function googleAuth(){
      setloading(true);
      const provider = new GoogleAuthProvider();
      try{
      signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log("user...", user);
    createDoc(user);
    navigate("/Dashboard");
    toast.success("LoggedIn with Google");
    setloading(false);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
    setloading(false);
    
  });
    } catch(e){
      toast.error(e.message);
      setloading(false);
    }
  }

    return (
      <>
      {loginform?(<div className='signupin-wrapper'>
      <h2 className='title'>Login In <span style={{color:"var(--theme)"}}>Your Financer...</span></h2>
      <form >
        
        <Input 
        label={"Email"}
        state={email}
        setstate={setEmail}
        placeholder={"tharunkumar2912@gmail.com"}
        
        />
        <Input 
        type="password"
        label={"Password"}
        state={password}
        setstate={setPassword}
        placeholder={"Abced@2345"}
        
        />
         <Button disabled={loading} text={loading?"Loading...":"Login using Email and Password"} onClick={loginwithemial} />
         <p style={{textAlign:'center', margin:0}}>or</p>
         <Button text={ loading?"Loading...":"Login using Google"} 
                 onClick={googleAuth}
         />
         <p style={{textAlign:'center', margin:0, cursor:'pointer'}} 
            onClick={ () => setloginform(!loginform)}
         >or don't have an account? click here</p>
      </form>
    </div>):
    (<div className='signupin-wrapper'>
      <h2 className='title'>Signup on <span style={{color:"var(--theme)"}}>Your Financer...</span></h2>
      <form >
        <Input 
        label={"Full Name"}
        state={name}
        setstate={setName}
        placeholder={"Tharun Reddy"}
        
        />
        <Input 
        label={"Email"}
        state={email}
        setstate={setEmail}
        placeholder={"tharunkumar2912@gmail.com"}
        
        />
        <Input 
        type="password"
        label={"Password"}
        state={password}
        setstate={setPassword}
        placeholder={"Abced@2345"}
        
        />
        <Input 
        type="password"
        label={"Confrim Password"}
        state={confirmPassword}
        setstate={setConfirmPassword}
        placeholder={"Abced@2345"}
         />
         <Button disabled={loading} text={loading?"Loading...":"Signup using Email and Password"} onClick={Signupwithemial} />
         <p style={{textAlign:'center', margin:0}}>or</p>
         <Button text={ loading?"Loading...":"Signup using Google"} 
                 onClick={googleAuth}
         />
         <p style={{textAlign:'center', margin:0, cursor:"pointer"}}
            onClick={ () => setloginform(!loginform)}
         >or have an account? click here</p>
      </form>
    </div>)}
      
    </>
  )
}

export default Signupsignin;
