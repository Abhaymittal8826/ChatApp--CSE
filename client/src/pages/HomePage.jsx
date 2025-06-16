import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { chatContext } from '../context/chatContext'

const HomePage = () => {
   const {selectedUser} = useContext(chatContext)
  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
      <div className={`grid grid-cols-1 relative border-2 border-gray-600 rounded-2xl backdrop-blur-xl h-[100%] overflow-hidden ${selectedUser ?'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]':'md:grid-cols-2'}`}>
        <Sidebar />
        <ChatContainer />
        <RightSidebar /> 
      </div>
    </div>
  )
}

export default HomePage
