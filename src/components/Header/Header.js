import "./style.css"
import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userProfile } from "../../API/apiService";
import { UserContext } from "../../context/UserContext";

export default function Header() {
    const {userInfo,setUserInfo}=useContext(UserContext);
    const navigate=useNavigate();
    const handlePofile=async()=>{
        try {
            const res=await userProfile();
            if(res.ok){
                // console.log(res);
                setUserInfo(res?.data?.data)
            }else{
                console.log(res.data);
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const logOut=()=>{
        localStorage.clear();
        setUserInfo(null)
        navigate("/")
    }

    useEffect(()=>{
        handlePofile();
    },[])
    
  return (
    <header>
        <Link to="/" className='logo'>GLS</Link>
        <nav>
          {!userInfo?(
            <>
            <Link to="/login">Login</Link>
          {/* <Link to="register">Register</Link> */}
            </>
          ):(
            <>
            <Link onClick={logOut}>Logout</Link>
            </>
          )}
        </nav>
    </header>
  )
}
