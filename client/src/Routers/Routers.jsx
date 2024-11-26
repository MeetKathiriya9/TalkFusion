import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
// import Dashboard from '../Pages/Dashboard'
import TranslationComponent from '../TranslationComponent'
import Register from '../Pages/Register'
import DeleteUser from '../Pages/Delete'
import ChatDashboard from '../Components/ChatDashboard'
import Chats from '../Pages/Chats'
import Chat from '../Components/Chat'
import UserPresence from '../Components/UserPresence'
import ChatDashboardChatbox from '../Components/ChatDashboardChatbox'
import FriendRequest from '../Components/FriendRequest'
// import NTFList from '../Components/NTFList'
import NFTDashboard from '../Components/NFTDashboard'
// import userOnlineStatus from '../Components/UserOnlineStatus'

export default function Routers() {
  
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
  };

  // userOnlineStatus();

  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/delete" element={<DeleteUser />} />
        {/* <Route path="/chat" element={ <Dashboard></Dashboard>} /> */}
        <Route path="/radhe" element={ <TranslationComponent></TranslationComponent>} />
        <Route path="/chats" element={ <Chats></Chats>} />
        <Route path="/addfriend" element={ <FriendRequest></FriendRequest>} />
        <Route path="/notification" element={ <NFTDashboard></NFTDashboard>} />
{/* 
        <Route path="/chat" element={<Chat selectedUserId={selectedUserId} />} />
        <Route path="/user-list" element={<ChatDashboardChatbox onSelectUser={() => handleSelectUser(userId)} />} /> */}

        <Route path="/chat" element={<Chat/>} />
        <Route path="/user-list" element={<ChatDashboardChatbox/>} />


      </Routes>
    </>
  )
}
