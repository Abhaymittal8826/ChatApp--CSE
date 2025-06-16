import React, { useContext, useEffect, useRef, useState } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { chatContext } from "../context/chatContext";
import { authContext } from "../context/authContext";
import toast from "react-hot-toast";

const ChatContainer = () => {

  const {selectedUser,setSelectedUser, messages, getMessages, sendMessage} = useContext(chatContext)
  const {authUser, onlineUsers} = useContext(authContext)

  const scrollEnd = useRef();
  const [input, setInput] =useState('');

  //handle sending a message
  const handleSendMessage = async(e)=>{
    e.preventDefault();
    if(input.trim()==="") return null;
    await sendMessage({text: input.trim()});
    setInput("")
  }

  //Handle sending image
  const handleSendImage = async(e)=>{
    const file = e.target.files[0];
    if(!file || !file.type.startsWith("image/")){
      toast.error("Select an image file");
      return;
    }
    const reader= new FileReader();
    
    reader.onload = async()=>{
      await sendMessage({image: reader.result})
      e.target.value=""
    }
    reader.readAsDataURL(file)
  }

  useEffect(()=>{
    if(selectedUser){
      getMessages(selectedUser._id)
    }
  },[selectedUser])

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="overflow-scroll backdrop-blur-lg h-full relative">
      {/* ------------------header------------------ */}

      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img src={selectedUser.profilePic ||assets.avatar_icon} alt="" className="rounded-full w-8" />
        <p className="text-white flex-1 text-lg flex items-center gap-2">
          {selectedUser.fullName}
          
          {onlineUsers.includes(selectedUser._id) &&<span className="w-2 h-2 rounded-full bg-green-400"></span>}
        </p>
        <img className="md:hidden max-w-7" src={assets.arrow_icon} alt="" />
        <img className="max-w-5 max-md:hidden" src={assets.help_icon} alt="" />
      </div>
      {/*------------- chatarea----- */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${
              msg.senderId !== authUser._id && "flex-row-reverse"
            }`}
          >
            {msg.image ? (
              <img src={msg.image} alt="" className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8" />
            ) : (
              <p
                className={`p-2 max-w-[200px] text-white border border-gray-700 bg-violet-500/30 font-light md:text-sm rounded-lg mb-8 break-all ${
                  msg.senderId === authUser._id ? 'rounded-br-none':
                  'rounded-bl-none'
                }`}
              > 
                {msg.text}
              </p>
            )}
            <div className="text-center text-xs">
              <img
                src={
                  msg.senderId === authUser._id ? authUser?.profilePic ||
                      assets.avatar_icon : selectedUser?.profilePic ||
                     assets.avatar_icon
                }
                className="rounded-full w-8"
                alt=""
              />
              <p className="text-gray-500 ">{formatMessageTime(msg.createdAt)}</p>
            </div>
            <div ref={scrollEnd}></div>
          </div>
        ))}
        {/* -----------bottom area ----------- */}
          <div className="flex items-center gap-3 p-3 absolute bottom-0 left-0 right-0">
                <div className="flex flex-1 items-center px-3 rounded-full bg-gray-100/10">
                    <input onChange={(e)=>setInput(e.target.value)} value={input}
                    onKeyDown={(e)=>e.key==="Enter"? handleSendMessage(e): null}
                    type="text" placeholder="Send a message" className="flex-1 p-3 text-sm border-none rounded-lg outline-none placeholder:text-gray-400 text-white bg-transparent" />
                    <input
                    onChange={handleSendImage} 
                    type="file" id="image" accept="image/png,image/jpeg" hidden/>
                    <label htmlFor="image">
                        <img src={assets.gallery_icon} alt="" className="mr-2 w-5 cursor-pointer" />
                    </label>
                </div>
                <img onClick={handleSendMessage} src={assets.send_button} className="w-7 mr-2 cursor-pointer" alt="" />
          </div>
      </div>
    </div>
  ) : (
    <div
      className="flex flex-col items-center justify-center gap-2 text-gray-500
         bg-white/10 max-md:hidden"
    >
      <img src={assets.logo_icon} className="max-w-16" alt="" />
      <p className="text-white text-lg font-medium">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
