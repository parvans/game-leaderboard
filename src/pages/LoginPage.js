import './styles.css';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import toast, { Toaster } from 'react-hot-toast';
import { userLogin } from '../API/apiService';
export default function LoginPage() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [showPassword, setShowPassword] = useState(false);
    const {setUserInfo}=useContext(UserContext);
    const navigate=useNavigate();

    const handleLogin=async(e)=>{
        e.preventDefault();        
        try {
            const res=await userLogin({
                email:email,
                password:password
            });            
            if(res.ok){
                // console.log(res.data);
                localStorage.setItem("user-token",res.data.token)
                setUserInfo(res.data.id);
                // toast.success(res.data.message);
                navigate("/")
            }else{
                toast.error(res.data.error);
            }           
        } catch (error) {
            console.log(error);
            
        }


    }

    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
      if (e.key === 'Enter') {
        handleLogin(e);
      }
    };

  return (
    <div>
        <form className='login'>
        <form className='login' onSubmit={handleLogin}>
            <h1>Login</h1>
            <input type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} onKeyDown={handleKeypress} />
            <div className="password-container">

            <input type={showPassword ? "text" : "password"}  placeholder='password' value={password} 
            onChange={(e)=>setPassword(e.target.value)} onKeyDown={handleKeypress} />
            {password.length>0 &&<i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={() => setShowPassword(!showPassword)}></i>}
            </div>
            <button className='loginBtn' type='submit' onClick={handleLogin}>Login</button>
            
        </form>
        <Toaster
        position="top-center"
        reverseOrder={false}
        />
        </form>
    </div>
  )
}
