# 💬 Real-Time Chat App  
A full-stack real-time chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Socket.IO.  

## Working
<div style="overflow: hidden; ">
<h3>Create new account or login existing account.</h3>
  <img src="login.png" alt="login" style="width: 100%; object-fit: cover; object-position: center;">
  <h3>Chat in real time with your friends.</h3>
  <hr/>
  <img src="msg_both.png" alt="login" style="width: 100%; object-fit: cover; object-position: center;">
  <h3>Edit your profile later.</h3>
  <hr/>
  <img src="update.png" alt="login" style="width: 100%; object-fit: cover; object-position: center;">
</div>

## Features  
🔐 JWT-based user authentication (register/login) | 💬 One-to-one real-time messaging | ✍️ Typing indicators | 📥 Persistent messages in MongoDB | 🌐 Socket.IO for WebSocket support | 🖥️ Responsive UI using React + Tailwind | 🧩 Clean modular code (client + server)  

## Tech Stack  
Frontend: React.js, Tailwind CSS, React Router, Axios

Backend: Node.js, Express.js, MongoDB, Mongoose
Real-time: Socket.IO

## Deployment: 
    
    Frontend https://chat-app-frontend-ruddy-omega.vercel.app/login,
            
    Backend https://chat-app-backend-eta-blue.vercel.app/api/status  

## Folder Structure  
/client – React frontend

/server – Express backend API  

## Getting Started  
1️⃣ Clone the repo:  
`git clone https://github.com/amank010/Chat-App.git && cd Chat-App`  

2️⃣ Start Backend:  
`cd server && npm install && npm run dev`  

3️⃣ Start Frontend:  
`cd client && npm install && npm run dev`  

⚠️ Don't forget to configure `.env` files for both frontend and backend (e.g. JWT_SECRET, Mongo URI, etc.)  