// import React from 'react'
// import ChatDashboard from '../Components/ChatDashboard'
// import ChatInterface from '../Components/ChatInterface'

// export default function Chats() {
//   return (
//     <div className='flex'>

//         <div className='flex-none w-24'>
//         <ChatDashboard></ChatDashboard>

//         </div>

//         <div className='flex-auto w-64'>
//         <ChatInterface></ChatInterface>

//         </div>
//     </div>
//   )
// }
// import React from 'react';
// import ChatDashboard from '../Components/ChatDashboard';
// import ChatInterface from '../Components/ChatInterface';

// export default function Chats() {
//   return (
//     <div className='flex h-screen'>
//       <div className='w-1/3 bg-orange-400'>
//         <ChatDashboard />
//       </div>
//       <div className='w-2/3 bg-lime-500'>
//         <ChatInterface />
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import ChatDashboard from '../Components/ChatDashboard';
import ChatInterface from '../Components/ChatInterface';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function Chats() {
  


  // let inactivityTimeout;

  // const setOffline = async (userId) => {
  //   const userRef = doc(db, 'users', userId);
  //   await updateDoc(userRef, {
  //     online: false,
  //     lastActive: serverTimestamp()
  //   });
  // };

  // const setOnline = async (userId) => {
  //   const userRef = doc(db, 'users', userId);
  //   await updateDoc(userRef, {
  //     online: true,
  //     lastActive: serverTimestamp()
  //   });
  // };

  // const resetInactivityTimeout = (userId) => {

  //   clearTimeout(inactivityTimeout);
  //   setOnline(userId); 

  //   inactivityTimeout = setTimeout(() => {
  //     setOffline(userId);
  //   }, 1000000);
  // };

  // useEffect(() => {
  //   const updateUserStatus = async (userId, status) => {
  //     const userRef = doc(db, 'users', userId);
  //     await updateDoc(userRef, {
  //       online: status,
  //       lastActive: serverTimestamp()
  //     });
  //   };

  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       await updateUserStatus(user.uid, true); 

  //       // resetInactivityTimeout(user.uid);

  //       // window.addEventListener('mousemove', () => resetInactivityTimeout(user.uid));
  //       // window.addEventListener('keypress', () => resetInactivityTimeout(user.uid));
  //     }
  //   });

  //   // Clean up event listeners on component unmount
  //   return () => {
  //     // window.removeEventListener('mousemove', resetInactivityTimeout);
  //     // window.removeEventListener('keypress', resetInactivityTimeout);
  //     clearTimeout(inactivityTimeout);
  //   };
  // }, []);


  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/3 h-full bg-blue-200 ">
        <ChatDashboard />
      </div>
      <div className="w-2/3 h-full bg-blue-100">
        <ChatInterface />
      </div>
    </div>
  );
}

