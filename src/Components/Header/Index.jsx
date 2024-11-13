import React, { useEffect } from "react";
import "./Style.css";
import { auth } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import Dashboard from "../../Pages/Dashboard";
import photo from "../../assets/user.svg";
const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user){
      navigate("/Dashboard");
    }
  }, [user, loading])
  
  function Logoutfun(){
   try{ signOut(auth).then(() => {
      toast.success("Logged out successfully");
      navigate("/");
    }).catch((error) => {
      toast.error(error.message);
    });
  }catch(e){
    toast.error(e.message);
  }
}

  return (
    <div className="navbar">
      <p className="Logo">You are Finance Master is here... </p>
      {user && ( 
      <div style={{display:"flex", alignItems:"center", gap:"0.75rem"}}>
        <img src={user.photoURL ? user.photoURL : photo}
              style={{ borderRadius:"50%", height:"2rem", width:"2rem"}} 
            />
        <p className= "Link"  onClick={Logoutfun}>Logout</p> 
        </div>
        )}
    </div>
  );
};

export default Header;
