import React, { useContext, useState } from 'react'
import assets from '../assets/assets';
import { authContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [currState, setCurrState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setisDataSubmitted] = useState(false);

  const navigate = useNavigate();
  const {login} = useContext(authContext)

  const onSubmitHandler=async(e)=>{
    e.preventDefault();

    if(currState==="Sign Up" && !isDataSubmitted){
      setisDataSubmitted(true)
      return;
    }

    const result = await login(currState === "Sign Up"? "signup" : "login",{fullName, email, password, bio})

if(result?.success){
  navigate('/');
}

  }
  
  return (
    <div className='flex items-center min-h-screen bg-cover bg-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
     
    {/* left */}
    <img src={assets.logo_big} className='w-[min(30vw,250px)]' alt="" />
    
    {/* right */}
    <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-5 rounded-lg shadow-lg'>
      <h2 className='flex font-medium text-2xl justify-between items-center'>
        {currState}
        {isDataSubmitted && 
        <img
        onClick={()=>setisDataSubmitted(false)}
        src={assets.arrow_icon} className='w-5 cursor-pointer ' alt="" />
        }
      </h2>

      {currState==="Sign Up" && !isDataSubmitted &&(
        <input
        onChange={(e)=>setFullName(e.target.value)} value={fullName} 
        type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' required />
      )}
      {
        !isDataSubmitted && (
          <>
          <input
          onChange={(e)=>setEmail(e.target.value)} value={email}
           type="email" placeholder='Email Address' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2  focus:ring-indigo-500'/>
          <input
          onChange={(e)=>setPassword(e.target.value)} value={password}
           type="password" placeholder='Password' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2  focus:ring-indigo-500'/>
        </>
        )}

        {currState === "Sign Up" && isDataSubmitted &&(
          <textarea
          onChange={(e)=>setBio(e.target.value)} value={bio}
           type="text" rows={4} placeholder='Provide a short bio....' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2  focus:ring-indigo-500' required/>
        )
        }
        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 rounded-md cursor-pointer'>
          {currState==="Sign Up"? "Create Account":"Login Now"}
        </button>
        
        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox" name="" id="" />
          <p>Agree to the terms of use & privacy policy.</p>
       </div>

       <div className='text-sm'>
        {currState==="Sign Up"?  (

          <p className='text-gray-400'>Already have an account? 
          <span onClick={()=>{setCurrState("Login"); setisDataSubmitted(false)}} className='text-purple-500 cursor-pointer'> Login here</span> </p>
        ):(
          <p className='text-gray-400'>Create an account. 
          <span onClick={()=>setCurrState("Sign Up")} className='text-purple-500 cursor-pointer'> Click here</span> </p>
          
        )
      }
       </div>
    
    </form>
    </div>
  )
}

export default Login
