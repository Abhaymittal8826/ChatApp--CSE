import React, { useEffect, useContext } from 'react';
import { Navigate, Route, Routes,useNavigate} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import { Toaster } from 'react-hot-toast';
import { authContext } from './context/authContext';




const App = () => {
  const {authUser} = useContext(authContext)
   const navigate = useNavigate();

//   useEffect(() => {
//   if (authUser) {
//     navigate('/');
//   }
// }, [authUser]);


  return (
    
    <div className="bg-[url('/bgImage.svg')] bg-contain">
      <Toaster/>
      <Routes>
             console.log("🧠 authUser inside App:", authUser);

        <Route path='/' element={authUser? <HomePage/>: <Navigate to="/login"/>}/>

        <Route path='/login' element={!authUser? <Login/>: <Navigate to="/"/> } />
        <Route path='/profile' element={authUser? <ProfilePage/> : <Navigate to="/login"/>} />
      </Routes>
      
    </div>
  )
} 

export default App
