// import React, { useState, useEffect } from 'react';
// import { firestore, auth } from '../firebase';

// const Chat = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribeAuth = auth.onAuthStateChanged(setUser);
//     return () => unsubscribeAuth();
//   }, []);

//   useEffect(() => {
//     const unsubscribeMessages = firestore.collection('messages')
//       .orderBy('createdAt')
//       .onSnapshot(snapshot => {
//         setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//       });
//     return () => unsubscribeMessages();
//   }, []);

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (user && message.trim()) {
//       await firestore.collection('messages').add({
//         text: message,
//         uid: user.uid,
//         createdAt: firebase.firestore.FieldValue.serverTimestamp()
//       });
//       setMessage('');
//     }
//   };

//   return (
//     <div>
//       <div>
//         {messages.map(msg => (
//           <div key={msg.id}>
//             <strong>{msg.uid}</strong>: {msg.text}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSend}>
//         <input 
//           type="text" 
//           value={message} 
//           onChange={(e) => setMessage(e.target.value)} 
//           placeholder="Type a message" 
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chat;

// // Chat.js
// import React, { useEffect, useState } from 'react';
// import { db, auth } from '../firebase';
// import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//   }, []);

//   useEffect(() => {
//     const q = query(collection(db, "messages"), orderBy("createdAt"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       await addDoc(collection(db, "messages"), {
//         text: message,
//         uid: user.uid,
//         createdAt: serverTimestamp()
//       });
//       setMessage('');
//     }
//   };

//   return (
//     <div className='pt-96'>
//       <div>
//         {messages.map((msg) => (
//           <div key={msg.id}>
//             <strong>{msg.uid}</strong>: {msg.text}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSend}>
//         <input 
//           type="text" 
//           value={message} 
//           onChange={(e) => setMessage(e.target.value)} 
//           placeholder="Type a message" 
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chat;

// import React, { useState, useEffect } from 'react';
// import Message from '../Components/Message'; // Adjust the import path as necessary
// import { db, auth } from '../firebase';
// import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// const Chat = ({ messages, handleSend, message, setMessage }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//   }, []);

//   useEffect(() => {
//     const q = query(collection(db, "messages"), orderBy("createdAt"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       await addDoc(collection(db, "messages"), {
//         text: message,
//         uid: user.uid,
//         createdAt: serverTimestamp()
//       });
//       setMessage('');
//     }
//   };

//   return (
//     <div className='pt-96'>
//       <div>
//         {messages.map((msg) => (
//           <Message key={msg.id} text={msg.text} uid={msg.uid} />
//         ))}
//       </div>
//       <form onSubmit={handleSend}>
//         <input 
//           type="text" 
//           value={message} 
//           onChange={(e) => setMessage(e.target.value)} 
//           placeholder="Type a message" 
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chat;

























// // Chat.js
// import React, { useEffect, useRef, useState } from 'react';
// import { db, auth } from '../firebase';
// import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import { useLocation } from 'react-router-dom';
// import { format } from 'date-fns';
// import TranslationComponent from '../TranslationComponent';
// import axios from 'axios';
// import translate from 'google-translate-api-x';

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [user, setUser] = useState(null);


//   // translate
//   const [translatedMessages, setTranslatedMessages] = useState([]);
//   const [targetLanguage, setTargetLanguage] = useState('en');


//   const { search } = useLocation();
//   const queryParams = new URLSearchParams(search);
//   const selectedUserId = queryParams.get('userId');

//   const chatContainerRef = useRef(null);

//   useEffect(() => {
//     onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//   }, []);

//   // useEffect(() => {
//   //   const q = query(collection(db, "messages"), orderBy("createdAt"));
//   //   const unsubscribe = onSnapshot(q, (snapshot) => {
//   //     setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//   //   });
//   //   return () => unsubscribe();
//   // }, []);







//   // useEffect(() => {
//   //   if (user && selectedUserId) {
//   //     const q = query(
//   //       collection(db, "messages"),
//   //       where("senderId", "in", [user.uid, selectedUserId]),
//   //       where("recipientId", "in", [user.uid, selectedUserId]),
//   //       orderBy("createdAt")
//   //     );
//   //     const unsubscribe = onSnapshot(q, (snapshot) => {
//   //       setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//   //     });
//   //     return () => unsubscribe();
//   //   }
//   // }, [user, selectedUserId]);

//   useEffect(() => {
//     if (user && selectedUserId) {
//       const q = query(
//         collection(db, "messages"),
//         where("senderId", "in", [user.uid, selectedUserId]),
//         where("recipientId", "in", [user.uid, selectedUserId]),
//         orderBy("createdAt")
//       );
//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setMessages(msgs);
//         translateMessages(msgs, targetLanguage);
//       });
//       return () => unsubscribe();
//     }
//   }, [user, selectedUserId, targetLanguage]);

//   console.log('msgs', messages);


//   const translateMessages = async (msgs, language) => {
//     try {
//       const translations = await Promise.all(msgs.map(async (msg) => {
//         const response = await axios.post('http://localhost:5000/translate', {
//           text: msg.text,
//           targetLanguage: language,
//         });
//         return { ...msg, text: response.data.translatedText };
//       }));
//       setTranslatedMessages(translations);
//     } catch (error) {
//       console.error('Error translating messages:', error);
//     }
//   };

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       await addDoc(collection(db, "messages"), {
//         text: message,
//         // uid: user.uid,
//         senderId: user.uid,
//         recipientId: selectedUserId,
//         createdAt: serverTimestamp()
//       });
//       setMessage('');
//     }
//   };
//   const languages = [
//     { code: 'en', name: 'English' },
//     { code: 'es', name: 'Spanish' },
//     { code: 'fr', name: 'French' },
//     { code: 'hi', name: 'Hindi' },
//     { code: 'gu', name: 'Gujarati' },
//     { code: 'mr', name: 'Marathi' },
//     { code: 'ta', name: 'Tamil' },
//     { code: 'te', name: 'Telugu' },
//     { code: 'sa', name: 'Sanskrit' },
//     // Add more languages as needed
//   ];

//   // const timestamp = messages.createdAt ? messages.createdAt.toDate() : new Date();
//   // const formattedTime = format(timestamp, 'p'); // Format time as per your requirement

//   const formatTimestamp = (timestamp) => {
//     if (!timestamp) return ''; // In case the timestamp is null or undefined
//     return format(new Date(timestamp.seconds * 1000), 'hh:mm a');
//   };

//   function formatDate(date) {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };


//     //     const previousDate = index > 0 ? messages[index - 1].createdAt.toDate() : null;
//     // const isNewDate = !previousDate || currentDate.toDateString() !== previousDate.toDateString();
//     // setnew(isNewDate)
//     return date.toLocaleDateString(undefined, options);
//   }


//   // useEffect(() => {
//   //   if (chatContainerRef.current) {
//   //     chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//   //   }
//   // }, [messages]);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [translatedMessages]);
//   // }, [messages]);


//   return (

//     <div className=''>
//       <div className=' overflow-y-auto h-[563px]  px-7' ref={chatContainerRef}>
//         {translatedMessages.map((msg, index) => {
//           const currentMessageDate = msg.createdAt ? msg.createdAt.toDate() : null;
//           const previousMessageDate = index > 0 && translatedMessages[index - 1].createdAt ? translatedMessages[index - 1].createdAt.toDate() : null;
//           const isNewDate = currentMessageDate && (!previousMessageDate || currentMessageDate.toDateString() !== previousMessageDate.toDateString());

//           return (
//             <React.Fragment key={msg.id}>
//               {isNewDate && (
//                 <div className="text-center text-white my-4 sticky top-3">
//                   <span className="bg-gray-400 px-2 text-[13px] py-1">{formatDate(currentMessageDate)}</span>
//                 </div>
//               )}
//               <div className={`flex ${user.uid === msg.senderId ? 'justify-end' : 'justify-start'} my-2`}>
//                 <div className={`w-fit px-2 pt-2 rounded-md flex  ${user.uid === msg.senderId ? 'bg-blue-600' : 'bg-white'}`}>
//                   <p className={`text-[14px] font-normal ${user.uid === msg.senderId ? 'text-white' : 'text-black'}`}>{msg.text}</p>
//                   <p className={`text-[10px] pt-4 ps-4  ${user.uid === msg.senderId ? ' text-gray-300' : 'text-gray-600'}`}>{formatTimestamp(msg.createdAt)}</p>
//                 </div>
//               </div>
//             </React.Fragment>
//           );
//         })}
//       </div>

//       <div className='bg-blue-200 border-t-2  border-dark-blue '>
//         <form onSubmit={handleSend} className='flex items-center justify-between'>
//           <select className=' bg-slate-200' value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
//             {languages.map((lang) => (
//               <option key={lang.code} value={lang.code}>
//                 {lang.name}
//               </option>
//             ))}
//           </select>
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type a message"
//             className=' py-3 ps-3 bg-transparent outline-none text-[15px] w-full'
//           />
//           <button type="submit" className='text-2xl pe-2'><i className="ri-send-plane-2-line"></i></button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Chat;





















// import React, { useEffect, useRef, useState } from 'react';
// import { db, auth } from '../firebase';
// import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import { useLocation } from 'react-router-dom';
// import { format } from 'date-fns';
// import axios from 'axios';

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [user, setUser] = useState(null);

//   // Translate
//   const [translatedMessages, setTranslatedMessages] = useState([]);
//   const [targetLanguage, setTargetLanguage] = useState('en');

//   const { search } = useLocation();
//   const queryParams = new URLSearchParams(search);
//   const selectedUserId = queryParams.get('userId');


//   //reply
//   const [replyingTo, setReplyingTo] = useState(null);
//   const [hoveredMessageId, setHoveredMessageId] = useState(null);




//   const [replyTo, setReplyTo] = useState(null);
// const [replyMessage, setReplyMessage] = useState('');

// const handleReplyClick = (messageId) => {
//   setReplyTo(messageId);
//   // Scroll to the bottom to show the reply box
//   chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// };


// const handleReplySend = async (e) => {
//   e.preventDefault();
//   if (replyMessage.trim()) {
//     await addDoc(collection(db, `conversations/${user.uid}/${selectedUserId}`), {
//       curUserReactions: null,
//       otherUserReaction: null,
//       forwarded: false,
//       message: replyMessage,
//       senderId: user.uid,
//       repliedTo: replyTo,
//       time: serverTimestamp(),
//       read: false
//     });

//     await addDoc(collection(db, `conversations/${selectedUserId}/${user.uid}`), {
//       curUserReactions: null,
//       otherUserReaction: null,
//       forwarded: false,
//       message: replyMessage,
//       senderId: user.uid,
//       repliedTo: replyTo,
//       time: serverTimestamp(),
//       read: false
//     });

//     setReplyMessage('');
//     setReplyTo(null); // Clear the reply state
//   }
// };





//   const chatContainerRef = useRef(null);

//   useEffect(() => {
//     onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//   }, []);

//   useEffect(() => {
//     if (user && selectedUserId) {
//       const convoQuery = query(
//         collection(db, `conversations/${user.uid}/${selectedUserId}`),
//         orderBy("time")
//       );

//       const unsubscribe = onSnapshot(convoQuery, (snapshot) => {
//         const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setMessages(msgs);
//         translateMessages(msgs, targetLanguage);
//       });

//       return () => unsubscribe();
//     }
//   }, [user, selectedUserId, targetLanguage]);

//   const translateMessages = async (msgs, language) => {
//     try {
//       const translations = await Promise.all(msgs.map(async (msg) => {
//         const response = await axios.post('http://localhost:5000/translate', {
//           text: msg.message,
//           targetLanguage: language,
//         });
//         return { ...msg, message: response.data.translatedText };
//       }));
//       setTranslatedMessages(translations);
//     } catch (error) {
//       console.error('Error translating messages:', error);
//     }
//   };

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       await addDoc(collection(db, `conversations/${user.uid}/${selectedUserId}`), {
//         curUserReactions: null,
//         otherUserReaction: null,
//         forwarded: false,
//         message: message,
//         senderId: user.uid,
//         // repliedTo:  null,
//         repliedTo: replyingTo ? replyingTo.id : null,

//         time: serverTimestamp(),
//         read: false
//       });

//       await addDoc(collection(db, `conversations/${selectedUserId}/${user.uid}`), {
//         curUserReactions: null,
//         otherUserReaction: null,
//         forwarded: false,
//         message: message,
//         senderId: user.uid,
//         // repliedTo:  null,
//         repliedTo: replyingTo ? replyingTo.id : null,

//         time: serverTimestamp(),
//         read: false
//       });

//       setMessage('');
//     }
//   };

//   const formatTimestamp = (timestamp) => {
//     if (!timestamp) return '';
//     return format(new Date(timestamp.seconds * 1000), 'hh:mm a');
//   };

//   const formatDate = (date) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return date.toLocaleDateString(undefined, options);
//   };

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [translatedMessages]);

//   const languages = [
//     { code: 'en', name: 'English' },
//     { code: 'es', name: 'Spanish' },
//     { code: 'fr', name: 'French' },
//     { code: 'hi', name: 'Hindi' },
//     { code: 'gu', name: 'Gujarati' },
//     { code: 'mr', name: 'Marathi' },
//     { code: 'ta', name: 'Tamil' },
//     { code: 'te', name: 'Telugu' },
//     { code: 'sa', name: 'Sanskrit' },
//   ];

// //   return (
// //     <div className=''>
// //       <div className='overflow-y-auto h-[563px] px-7' ref={chatContainerRef}>
// //         {/* {translatedMessages.map((msg, index) => {
// //           const currentMessageDate = msg.time ? msg.time.toDate() : null;
// //           const previousMessageDate = index > 0 && translatedMessages[index - 1].time ? translatedMessages[index - 1].time.toDate() : null;
// //           const isNewDate = currentMessageDate && (!previousMessageDate || currentMessageDate.toDateString() !== previousMessageDate.toDateString());

// //           return (
// //             <React.Fragment key={msg.id}>
// //               {isNewDate && (
// //                 <div className="text-center text-white my-4 sticky top-3">
// //                   <span className="bg-gray-400 px-2 text-[13px] py-1">{formatDate(currentMessageDate)}</span>
// //                 </div>
// //               )}
// //               <div className={`flex ${user.uid === msg.senderId ? 'justify-end' : 'justify-start'} my-2`}>
// //                 <div className={`w-fit px-2 pt-2 rounded-md flex ${user.uid === msg.senderId ? 'bg-blue-600' : 'bg-white'}`}>
// //                   <p className={`text-[14px] font-normal ${user.uid === msg.senderId ? 'text-white' : 'text-black'}`}>{msg.message}</p>
// //                   <p className={`text-[10px] pt-4 ps-4 ${user.uid === msg.senderId ? 'text-gray-300' : 'text-gray-600'}`}>{formatTimestamp(msg.time)}</p>
// //                 </div>
// //               </div>
// //             </React.Fragment>
// //           );
// //         })} */}
// //         {translatedMessages.map((msg, index) => {
// //   const currentMessageDate = msg.time ? msg.time.toDate() : null;
// //   const previousMessageDate = index > 0 && translatedMessages[index - 1].time ? translatedMessages[index - 1].time.toDate() : null;
// //   const isNewDate = currentMessageDate && (!previousMessageDate || currentMessageDate.toDateString() !== previousMessageDate.toDateString());

// //   return (
// //     <React.Fragment key={msg.id}>
// //       {isNewDate && (
// //         <div className="text-center text-white my-4 sticky top-3">
// //           <span className="bg-gray-400 px-2 text-[13px] py-1">{formatDate(currentMessageDate)}</span>
// //         </div>
// //       )}
// //       <div 
// //         className={`flex ${user.uid === msg.senderId ? 'justify-end' : 'justify-start'} my-2`} 
// //         onMouseEnter={() => setHoveredMessageId(msg.id)}
// //         onMouseLeave={() => setHoveredMessageId(null)}
// //       >
// //         <div className={`w-fit px-2 pt-2 rounded-md flex relative ${user.uid === msg.senderId ? 'bg-blue-600' : 'bg-white'}`}>

// //         {msg.repliedTo && (
// //       <div className="text-gray-500 text-xs mb-1">
// //         Replied to: {translatedMessages.find(m => m.id === msg.repliedTo)?.message}
// //       </div>
// //     )}

// //           <p className={`text-[14px] font-normal ${user.uid === msg.senderId ? 'text-white' : 'text-black'}`}>{msg.message}</p>
// //           <p className={`text-[10px] pt-4 ps-4 ${user.uid === msg.senderId ? 'text-gray-300' : 'text-gray-600'}`}>{formatTimestamp(msg.time)}</p>
// //           {hoveredMessageId === msg.id && (
// //             <button 
// //               onClick={() => setReplyingTo(msg)}
// //               className="absolute right-0 top-0 text-gray-500 hover:text-black"
// //             >
// //               <i className="ri-reply-line"></i>
// //             </button>
// //           )}
// //         </div>


// //       </div>
// //     </React.Fragment>
// //   );
// // })}

// //       </div>

// //       <div className='bg-blue-200 border-t-2 border-dark-blue'>
// //         <form onSubmit={handleSend} className='flex items-center justify-between'>
// //           <select className='bg-slate-200' value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
// //             {languages.map((lang) => (
// //               <option key={lang.code} value={lang.code}>
// //                 {lang.name}
// //               </option>
// //             ))}
// //           </select>
// //           <input
// //             type="text"
// //             value={message}
// //             onChange={(e) => setMessage(e.target.value)}
// //             placeholder="Type a message"
// //             className='py-3 ps-3 bg-transparent outline-none text-[15px] w-full'
// //           />
// //           <button type="submit" className='text-2xl pe-2'><i className="ri-send-plane-2-line"></i></button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// return (
//   <div className=''>
//     <div className='overflow-y-auto h-[400px] px-7' ref={chatContainerRef}>
//       {translatedMessages.map((msg, index) => {
//         const currentMessageDate = msg.time ? msg.time.toDate() : null;
//         const previousMessageDate = index > 0 && translatedMessages[index - 1].time ? translatedMessages[index - 1].time.toDate() : null;
//         const isNewDate = currentMessageDate && (!previousMessageDate || currentMessageDate.toDateString() !== previousMessageDate.toDateString());

//         return (
//           <React.Fragment key={msg.id}>
//             {isNewDate && (
//               <div className="text-center text-white my-4 sticky top-3">
//                 <span className="bg-gray-400 px-2 text-[13px] py-1">{formatDate(currentMessageDate)}</span>
//               </div>
//             )}
//             <div className={`relative flex ${user.uid === msg.senderId ? 'justify-end' : 'justify-start'} my-2`}>
//               <div className={`w-fit px-2 pt-2 rounded-md flex ${user.uid === msg.senderId ? 'bg-blue-600' : 'bg-white'}`}>
//                 <p className={`text-[14px] font-normal ${user.uid === msg.senderId ? 'text-white' : 'text-black'}`}>{msg.message}</p>
//                 <p className={`text-[10px] pt-4 ps-4 ${user.uid === msg.senderId ? 'text-gray-300' : 'text-gray-600'}`}>{formatTimestamp(msg.time)}</p>
//               </div>
//               <button
//                 className='absolute right-0 top-0 mt-1 mr-2'
//                 onClick={() => handleReplyClick(msg.id)}
//               >
//                 <i className='ri-reply-line'></i>
//               </button>
//             </div>
//           </React.Fragment>
//         );
//       })}
//     </div>

//     {replyTo && (
//       <div className='bg-gray-200 p-2'>
//         <div className='border rounded-md p-2 mb-2'>
//           <p className='text-gray-700'>Replying to:</p>
//           <p className='text-gray-900'>{translatedMessages.find(msg => msg.id === replyTo)?.message}</p>
//         </div>
//         <form onSubmit={handleReplySend} className='flex items-center'>
//           <input
//             type="text"
//             value={replyMessage}
//             onChange={(e) => setReplyMessage(e.target.value)}
//             placeholder="Type your reply"
//             className='py-2 px-3 w-full border rounded-md'
//           />
//           <button type="submit" className='ml-2 text-blue-500'>Send</button>
//         </form>
//       </div>
//     )}

//     <div className='bg-blue-200 border-t-2 border-dark-blue'>
//       <form onSubmit={handleSend} className='flex items-center justify-between'>
//         <select className='bg-slate-200' value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
//           {languages.map((lang) => (
//             <option key={lang.code} value={lang.code}>
//               {lang.name}
//             </option>
//           ))}
//         </select>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message"
//           className='py-3 ps-3 bg-transparent outline-none text-[15px] w-full'
//         />
//         <button type="submit" className='text-2xl pe-2'><i className="ri-send-plane-2-line"></i></button>
//       </form>
//     </div>
//   </div>
// );

// };

// export default Chat;


// import React, { useEffect, useRef, useState } from 'react';
// import { db, auth } from '../firebase';
// import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import { useLocation } from 'react-router-dom';
// import { format } from 'date-fns';
// import axios from 'axios';

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [user, setUser] = useState(null);
//   const [translatedMessages, setTranslatedMessages] = useState([]);
//   const [targetLanguage, setTargetLanguage] = useState('en');
//   const [replyTo, setReplyTo] = useState(null);

//   const { search } = useLocation();
//   const queryParams = new URLSearchParams(search);
//   const selectedUserId = queryParams.get('userId');

//   const chatContainerRef = useRef(null);

//   useEffect(() => {
//     onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//   }, []);

//   useEffect(() => {
//     if (user && selectedUserId) {
//       const convoQuery = query(
//         collection(db, `conversations/${user.uid}/${selectedUserId}`),
//         orderBy("time")
//       );

//       const unsubscribe = onSnapshot(convoQuery, (snapshot) => {
//         const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setMessages(msgs);
//         translateMessages(msgs, targetLanguage);
//       });

//       return () => unsubscribe();
//     }
//   }, [user, selectedUserId, targetLanguage]);

//   const translateMessages = async (msgs, language) => {
//     try {
//       const translations = await Promise.all(msgs.map(async (msg) => {
//         const response = await axios.post('http://localhost:5000/translate', {
//           text: msg.message,
//           targetLanguage: language,
//         });
//         return { ...msg, message: response.data.translatedText };
//       }));
//       setTranslatedMessages(translations);
//     } catch (error) {
//       console.error('Error translating messages:', error);
//     }
//   };

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       await addDoc(collection(db, `conversations/${user.uid}/${selectedUserId}`), {
//         curUserReactions: null,
//         otherUserReaction: null,
//         forwarded: false,
//         message: message,
//         senderId: user.uid,
//         repliedTo: replyTo ? replyTo.id : null,
//         time: serverTimestamp(),
//         read: false
//       });

//       await addDoc(collection(db, `conversations/${selectedUserId}/${user.uid}`), {
//         curUserReactions: null,
//         otherUserReaction: null,
//         forwarded: false,
//         message: message,
//         senderId: user.uid,
//         repliedTo: replyTo ? replyTo.id : null,
//         time: serverTimestamp(),
//         read: false
//       });

//       setMessage('');
//       setReplyTo(null);
//     }
//   };

//   const formatTimestamp = (timestamp) => {
//     if (!timestamp) return '';
//     return format(new Date(timestamp.seconds * 1000), 'hh:mm a');
//   };

//   const formatDate = (date) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return date.toLocaleDateString(undefined, options);
//   };

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [translatedMessages]);

//   const languages = [
//     { code: 'en', name: 'English' },
//     { code: 'es', name: 'Spanish' },
//     { code: 'fr', name: 'French' },
//     { code: 'hi', name: 'Hindi' },
//     { code: 'gu', name: 'Gujarati' },
//     { code: 'mr', name: 'Marathi' },
//     { code: 'ta', name: 'Tamil' },
//     { code: 'te', name: 'Telugu' },
//     { code: 'sa', name: 'Sanskrit' },
//   ];

//   return (
//     <div className=''>
//       <div className='overflow-y-auto h-[563px] px-7' ref={chatContainerRef}>
//         {translatedMessages.map((msg, index) => {
//           const currentMessageDate = msg.time ? msg.time.toDate() : null;
//           const previousMessageDate = index > 0 && translatedMessages[index - 1].time ? translatedMessages[index - 1].time.toDate() : null;
//           const isNewDate = currentMessageDate && (!previousMessageDate || currentMessageDate.toDateString() !== previousMessageDate.toDateString());

//           return (
//             <React.Fragment key={msg.id}>
//               {isNewDate && (
//                 <div className="text-center text-white my-4 sticky top-3">
//                   <span className="bg-gray-400 px-2 text-[13px] py-1">{formatDate(currentMessageDate)}</span>
//                 </div>
//               )}
//               <div className={`flex ${user.uid === msg.senderId ? 'justify-end' : 'justify-start'} my-2`}>
//                 <div className={`w-fit px-2 pt-2 rounded-md flex ${user.uid === msg.senderId ? 'bg-blue-600' : 'bg-white'}`}>
//                   {msg.repliedTo && (
//                     <div className="bg-gray-200 p-2 rounded-md mb-1">
//                       <p className={`text-[12px] ${user.uid === msg.senderId ? 'text-gray-700' : 'text-gray-900'}`}>
//                         <strong>Replied to:</strong> {translatedMessages.find(m => m.id === msg.repliedTo)?.message}
//                       </p>
//                     </div>
//                   )}
//                   <p className={`text-[14px] font-normal ${user.uid === msg.senderId ? 'text-white' : 'text-black'}`}>{msg.message}</p>
//                   <p className={`text-[10px] pt-4 ps-4 ${user.uid === msg.senderId ? 'text-gray-300' : 'text-gray-600'}`}>{formatTimestamp(msg.time)}</p>
//                 </div>
//               </div>
//             </React.Fragment>
//           );
//         })}
//       </div>

//       <div className='bg-blue-200 border-t-2 border-dark-blue'>
//         <form onSubmit={handleSend} className='flex items-center justify-between'>
//           <select className='bg-slate-200' value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
//             {languages.map((lang) => (
//               <option key={lang.code} value={lang.code}>
//                 {lang.name}
//               </option>
//             ))}
//           </select>
//           {replyTo && (
//             <div className="bg-gray-200 p-2 rounded-md mb-2">
//               <p className='text-[12px] text-gray-900'>
//                 <strong>Replying to:</strong> {replyTo.message}
//               </p>
//             </div>
//           )}
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder={replyTo ? "Type your reply..." : "Type a message"}
//             className='py-3 ps-3 bg-transparent outline-none text-[15px] w-full'
//           />
//           <button type="submit" className='text-2xl pe-2'><i className="ri-send-plane-2-line"></i></button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Chat;


import React, { useEffect, useRef, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, getDocs, getDoc, doc, deleteDoc, updateDoc, setDoc, runTransaction } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';
import naughtyWords from 'naughty-words';
import '../../src/assets/css/Chat.css';
// import { FaEllipsisV, FaTrashAlt, FaEdit } from 'react-icons/fa';


const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [translatedMessages, setTranslatedMessages] = useState([]);
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [replyTo, setReplyTo] = useState(null);

  console.log(translatedMessages, "reply to");

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const selectedUserId = queryParams.get('userId');

  const chatContainerRef = useRef(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    if (user && selectedUserId) {

      //cheking blocked user, if found 
      const checkBlockedStatus = async () => {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        // if (userDoc.exists() && userDoc.data().blocked.includes(selectedUserId)) {
        //   console.log('This user is blocked.');
        //   // setMessages([]); // Clear messages or show a message indicating the user is blocked
        // } 
        if (userDoc.exists()) {
          const blockedUsers = userDoc.data().blocked || [];
          if (blockedUsers.includes(selectedUserId)) {
            console.log('This user is blocked.');
          }
          else {
            const convoQuery = query(
              collection(db, `conversations/${user.uid}/${selectedUserId}`),
              orderBy("time")
            );
            const unsubscribe = onSnapshot(convoQuery, (snapshot) => {
              // const msgs = snapshot.docs.map(doc => ({ ...doc.data() }));
              const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              // setMessages(msgs);
              translateMessages(msgs, targetLanguage);
            });
            return () => unsubscribe();
          }
        }
      }
      checkBlockedStatus();

    }
  // }, [user, selectedUserId]);
  }, [user, selectedUserId, targetLanguage]);


  //translate msg and send further for process.
  const translateMessages = async (msgs, language) => {
    try {
      const translations = await Promise.all(msgs.map(async (msg) => {
        const response = await axios.post('http://localhost:5000/translate', {
          text: msg.message,
          targetLanguage: language,
        });
        return { ...msg, message: response.data.translatedText };
      }));
      setTranslatedMessages(translations);
    } catch (error) {
      console.error('Error translating messages:', error);
    }
  };


  //target languages from badwords
  const Targetlanguages = ['en', 'hi']; // Add any other language codes you want to support
  let badWordsList = [];

  // Combine bad word lists from selected languages
  Targetlanguages.forEach((lang) => {
    badWordsList = [...badWordsList, ...naughtyWords[lang]];
  });

  badWordsList = [...badWordsList, 'idiot','stupid'];


  const filterBadWords = (message) => {
    // Create a regular expression that matches any bad word
    const badWordsRegex = new RegExp(badWordsList.join('|'), 'gi');

    // Replace bad words with asterisks
    return message.replace(badWordsRegex, (matchedBadWord) => {
      return '*'.repeat(matchedBadWord.length);
    });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (message.trim()) {

      const userRef = doc(db, 'users', user.uid);
      const recipientRef = doc(db, 'users', selectedUserId);
      const userDoc = await getDoc(userRef);
      const recipientDoc = await getDoc(recipientRef);

      if (userDoc.exists() && recipientDoc.exists()) {
        const userBlockedList = userDoc.data().blocked || [];
        const recipientBlockedList = recipientDoc.data().blocked || [];

        // Check if either user has blocked the other
        if (userBlockedList.includes(selectedUserId) || recipientBlockedList.includes(user.uid)) {
          alert('Message cannot be sent. One of the users has blocked the other.');
          return; // Prevent sending the message
        }
      }




      const senderConversationPath = `conversations/${user.uid}/${selectedUserId}`;
      const receiverConversationPath = `conversations/${selectedUserId}/${user.uid}`;

      const newMessageRef = doc(collection(db, senderConversationPath)); // This creates a new document reference
      const messageId = newMessageRef.id; // Get the ID for the new message


      const repliedMessage = replyTo ? {
        curUserReactions: null,
        otherUserReaction: null,
        forwarded: false,
        message: replyTo.message,
        senderId: user.uid,
        repliedTo: null,
        time: replyTo.time,
        read: false
      } : null;

      const filteredMessage = filterBadWords(message);

      // Check if any reaction is present in the message text
      let foundReaction = null;
      for (let reaction of reactions) {
        if (filteredMessage.includes(reaction)) {
          foundReaction = reaction;
          break; // Stop at the first found reaction
        }
      }

      // If a reaction is found, update the reaction count in the users collection
      if (foundReaction) {
        await updateReactionCount(foundReaction); // Update the reaction count in 'users' collection
      }


      const newMessage = {
        curUserReactions: null,
        otherUserReaction: null,
        forwarded: false,
        message: filteredMessage,
        senderId: user.uid,
        repliedTo: repliedMessage,
        time: serverTimestamp(),
        read: false
      };

      // Set the document for the sender
      await setDoc(doc(db, senderConversationPath, messageId), newMessage);
      // Set the document for the receiver
      await setDoc(doc(db, receiverConversationPath, messageId), newMessage);

      setMessage('');
      setReplyTo(null);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    return format(new Date(timestamp.seconds * 1000), 'hh:mm a');
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  //if someone send msg your interface will scroll to bottom for show new msg.
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    }, [translatedMessages]);
  // }, [messages]);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'hi', name: 'Hindi' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'mr', name: 'Marathi' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
    { code: 'sa', name: 'Sanskrit' },
  ];

  const handleReplyClick = (msg) => {
    setReplyTo(msg);
  };


  console.log("forwarded", messages);


  const [isForwardMode, setIsForwardMode] = useState(false);
  const [forwardMessage, setForwardMessage] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);


  useEffect(() => {
    // Fetch all users when forward mode is activated
    if (isForwardMode) {
      const fetchUsers = async () => {
        const usersSnapshot = await getDocs(collection(db, "users")); // Assuming you have a users collection
        const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllUsers(usersList);
      };
      fetchUsers();
    }
  }, [isForwardMode]);

  console.log("all users", allUsers);


  const handleForwardClick = (msg) => {
    setIsForwardMode(true);
    setForwardMessage(msg);
    console.log(msg, "jj");
  };




  const handleUserSelect = (userId) => {
    setSelectedUsers(prevSelected => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter(id => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  const handleForwardConfirm = async () => {
    if (forwardMessage && selectedUsers.length > 0) {
      selectedUsers.forEach(async (userId) => {
        console.log(forwardMessage, "llllll");

        const repliedMessage = replyTo ? {
          curUserReaction: null,
          otherUserReaction: null,
          forwarded: false,
          message: replyTo.message,
          senderId: user.uid,
          repliedTo: null,
          time: replyTo.time,
          read: false
        } : null;

        await addDoc(collection(db, `conversations/${user.uid}/${userId}`), {
          // ...forwardMessage,
          forwarded: true,
          senderId: user.uid,  // Updating senderId to the current user as it will send msg as my msg not opposite.
          time: serverTimestamp(),
          curUserReaction: null,
          otherUserReaction: null,
          message: forwardMessage.message,
          repliedTo: repliedMessage,
          read: false
        });

        await addDoc(collection(db, `conversations/${userId}/${user.uid}`), {
          // ...forwardMessage,
          forwarded: true,
          senderId: user.uid,  // Updating senderId to the current user as it will send msg as my msg not opposite.
          time: serverTimestamp(),
          curUserReactions: null,
          otherUserReaction: null,
          message: forwardMessage.message,
          repliedTo: repliedMessage,
          read: false
        });
      });
      setIsForwardMode(false);
      setSelectedUsers([]);
      setForwardMessage(null);
    }
  };



  //delete and edit msg

  const [showDropdownForMsgId, setShowDropdownForMsgId] = useState(null);
  const handleOptionsClick = (msgId) => {
    if (!showDropdownForMsgId) {
      setShowDropdownForMsgId(msgId);
      setReact(null); // Ensure the reaction menu is hidden when opening the options

      // setReact(null);
    }
    else {
      setShowDropdownForMsgId(null);

    }
  };


  //delete
  const handleDeleteMessage = async (msgId) => {
    if (!msgId) {
      console.error("Message ID is undefined, cannot delete message.");
      return;
    }
    try {
      await deleteDoc(doc(db, `conversations/${user.uid}/${selectedUserId}`, msgId));
      await deleteDoc(doc(db, `conversations/${selectedUserId}/${user.uid}`, msgId));
    } catch (error) {
      console.error("Error deleting message: ", error);
    }
  };
  // const reactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];


  //edit
  const [isEditingMsgId, setIsEditingMsgId] = useState(null);
  const [editedMessage, setEditedMessage] = useState('');

  const handleEditMessageClick = (msgId, message) => {
    setIsEditingMsgId(msgId);
    setEditedMessage(message);
    setShowDropdownForMsgId(null); // Hide dropdown
  };

  const handleSaveEditedMessage = async (msgId) => {
    if (!editedMessage.trim()) return; // Prevent saving empty messages

    try {
      await updateDoc(doc(db, `conversations/${user.uid}/${selectedUserId}`, msgId), {
        message: editedMessage,
      });
      await updateDoc(doc(db, `conversations/${selectedUserId}/${user.uid}`, msgId), {
        message: editedMessage,
      });

    } catch (error) {
      console.error("Error updating message: ", error);
    }
    setIsEditingMsgId(null); // Exit edit mode
    setEditedMessage(''); // Clear the edited message
  };

  const handleCancelEdit = () => {
    setIsEditingMsgId(null);
    setEditedMessage('');
  };


  const reactions = ["❤️", "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊",
    "😇", "🙂", "🙃", "😉", "😋", "😎", "😍", "🥰", "😘", "😚",
    "😗", "😙", "😜", "😝", "😛", "🤑", "😲", "😳", "🤪", "😵‍💫",
    "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥴", "😴", "💤", "😪",
    "😋", "😦", "😧", "😨", "😰", "😱", "😖", "😞", "😟", "😕",
    "🙁", "😔", "😫", "😩", "🥱", "😤", "😣", "😢", "😭", "😦",
    "👿", "😈", "😡", "🤬", "😐", "😑", "😶", "😇", "🙄", "😷",
    "🤢", "🤮", "🤥", "🤫", "🤭", "🧐", "🤓", "😈", "🤠", "🤡",
    "👺", "👹", "👻", "💀", "☠", "👽", "👾", "🤖", "🎃", "😺",
    "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🤎", "🧡",
    "💛", "💚", "💙", "💜", "🤍", "🖤", "🤎", "❤", "💔", "❣",
    "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "💌", "💫",
    "✨", "⭐", "🌟", "🎇", "🎆", "🌠", "🎉", "🎊", "🎈", "🎋",
    "✌", "🤙", "🤝", "👍", "👎", "👊", "✊", "🤛", "🤜", "🤚",
    "👋", "🤟", "✌", "🤙", "🤘", "👌", "👈", "👉", "👆", "👇",
    "☝", "✋", "🤚", "🖐", "🖖", "👍", "👎", "👊", "✊", "🤛",
    "🤜", "🤝", "🙌", "👐", "🤲", "🤞", "🤟", "🤘", "🤙", "👈",
    "👉", "👆", "👇", "☝", "👍", "👎", "👏", "🙏", "👍", "👎",
    "👊", "✊", "🤛", "🤜", "🤝", "💪", "🦾", "🙌", "👐", "🤲",
    "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "👇", "☝", "✋",
    "🤚", "🖐", "🖖", "👍", "👎", "👏", "🙏", "👍", "👎", "👊",
    "✊", "🤛", "🤜", "🤝", "💪", "🦾", "🙌", "👐", "🤲", "🤞",
    "🤟", "🤘", "🤙", "👈", "👉", "👆", "👇", "☝", "✋", "🤚",
    "🖐", "🖖", "👍", "👎", "👏", "🙏", "👍", "👎", "👊", "✊",
    "🤛", "🤜", "🤝", "💪", "🦾", "🙌", "👐", "🤲", "🤞", "🤟",
    "🤘", "🤙", "👈", "👉", "👆", "👇", "☝", "✋", "🤚", "🖐",
    "🖖", "👍", "👎", "👏", "🙏", "👍", "👎", "👊", "✊", "🤛",
    "🤜", "🤝", "💪", "🦾", "🙌", "👐", "🤲", "🤞", "🤟", "🤘",
    "🤙", "👈", "👉", "👆", "👇", "☝", "✋", "🤚", "🖐", "🖖",
    "🎁", "🎀", "🪅", "🎗", "🏵", "🎖", "🏅", "🥇", "🥈", "🥉",
    "🏆", "🏀", "⚽", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🎱",
    "🎳", "🏏", "🏑", "🏒", "🥍", "🏓", "🏸", "🥊", "🥋", "🎯",
    "⛳", "🪁", "🎣", "🤿", "🎽", "🎿", "🛷", "🥌", "🛼", "🛹",
    "🎮", "🕹", "🎰", "🎲", "🧩", "🧸", "♠", "♥", "♦", "♣",
    "♟", "🃏", "🀄", "🎴", "🎭", "🖼", "🎨", "🧵", "🧶", "🪡",
    "🧶", "🪡", "🧵", "🪡", "🪢", "🪣", "🪡", "🎥", "🎞", "📽",
    "🎬", "🍿", "🥤", "🍻", "🥂", "🍷", "🥃", "🍸", "🍹", "🍾",
    "🧃", "🧉", "🧊", "🥛", "🍼", "🫖", "☕", "🍵", "🍶", "🍺",
    "🍼", "🫖", "☕", "🍵", "🍶", "🍺", "🍻", "🥂", "🍷", "🥃",
    "🍸", "🍹", "🍾", "🧃", "🧉", "🧊", "🥤", "🧋", "🧃", "🧉",
    "🧊", "🥤", "🧋", "🧃", "🧉", "🧊", "🥤", "🧋", "🧃", "🧉",
    "🧊", "🥤", "🧋", "🍧", "🍨", "🍦", "🥧", "🧁", "🍰", "🎂",
    "🍮", "🍭",];


  const [isReact, setReact] = useState(null);
  console.log(isReact, "react");

  // const [editedMessage, setEditedMessage] = useState('');

  const handleAddReaction = async (msgId) => {
    setShowDropdownForMsgId(null); // Hide dropdown
    setReact(msgId);
    // setIsReactingTo(msgId);

    console.log(msgId);
  }


  const getcurReactbymsgID = async (msgId) => {
    
    try {
      // Reference to the specific message document
      const messageRef = doc(db, `conversations/${user.uid}/${selectedUserId}`, msgId); 
     
      // Fetch the document
      const messageSnapshot = await getDoc(messageRef);
 
      if (messageSnapshot.exists()) {
       const messageData = messageSnapshot.data(); // Get the data from the document
       console.log("Message Data: ", messageData); // Do something with the data
       
       return messageData.curUserReaction; // Return the message data if needed
     } else {
       console.log("No such message exists!");
       return null;
     }
   } catch (error) {
     console.error("Error fetching message data:", error);
   }
  }


  // Function to add a reaction to the message
  const AddReactionToDB = async (msgId, reaction) => {
    const OldReaction =  await getcurReactbymsgID(msgId);
    try {
      await updateDoc(doc(db, `conversations/${user.uid}/${selectedUserId}`, msgId), {
        curUserReaction: reaction, // Assuming you're using this field for current user's reaction
      });
      await updateDoc(doc(db, `conversations/${selectedUserId}/${user.uid}`, msgId), {
        otherUserReaction: reaction, // Assuming this field for the other user's reaction
      });

    } catch (error) {
      console.error("Error adding reaction: ", error);
    }
    setReact(null);
    updateReactionCount(reaction,OldReaction);
    // setShowReactionDropdownForMsgId(null); // Close dropdown after reaction is selected
  };



  const [isReactingTo, setIsReactingTo] = useState(null);



  // Function to update reaction count
  const updateReactionCount = async (reaction,oldreaction = "") => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid); // Reference to the current user's document

    try {
      await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userRef);

        if (!userDoc.exists()) throw "User document does not exist!";

        const currentReactionCounts = userDoc.data().emojiCountMap || {};

        const oldReactionCount = (currentReactionCounts[oldreaction] || 0) - 1;
        const newReactionCount = (currentReactionCounts[reaction] || 0) + 1;

        transaction.update(userRef, {
          [`emojiCountMap.${oldreaction}`]: oldReactionCount,
        });
        transaction.update(userRef, {
          [`emojiCountMap.${reaction}`]: newReactionCount,
        });

        // After updating the reaction count, re-fetch reaction counts for analysis
        const updatedReactionCounts = { ...currentReactionCounts, [reaction]: newReactionCount };
        await updateUserEmotionStatus(updatedReactionCounts, transaction); // Update emotion status based on reactions

      });

    } catch (error) {
      console.error("Failed to update reaction count:", error);
    }
    console.log("updatereaction", user.uid);
  };


  // Function to analyze reactions and update user's emotional status
  const updateUserEmotionStatus = async (reactionCounts, transaction) => {

    console.log("Current reaction counts:", reactionCounts); // Debugging step
    const userRef = doc(db, 'users', user.uid); // Reference to the current user's document

    try {

      let maxReaction = null;
      let maxCount = 0;

      // Find the reaction with the highest count
      for (const [reaction, count] of Object.entries(reactionCounts)) {
        if (count > maxCount) {
          maxCount = count;
          maxReaction = reaction;
        }
      }

      let emotionalStatus = "neutral"; // Default status
      const reactionMapping = reactions.reduce((acc, reaction) => {
        acc[reaction] = reaction; // Use the same value for the key
        return acc;
      }, {});

      // Set the emotional status based on the reaction with the highest count
      if (maxReaction) {
        emotionalStatus = reactionMapping[maxReaction] || "neutral";
      }

      transaction.update(userRef, { currentEmotion: emotionalStatus }); // Perform write here

      console.log(`Updated emotional status to ${emotionalStatus}`);
    } catch (error) {
      console.error("Error updating user emotional status:", error);
    }
  };

  const handleReaction = (messageId, reaction) => {
    setIsReactingTo(messageId);
    updateReactionCount(reaction);
  };

  //   // State to store the selected reaction and manage which message's reaction dropdown is open
  // const [showReactionDropdownForMsgId, setShowReactionDropdownForMsgId] = useState(null);
  // const reactions = ['👍', '❤️', '😂', '😮', '😢', '😡']; // List of reactions

  // // Function to toggle the reaction dropdown for a specific message
  // const handleReactionClick = (msgId) => {
  //   if (showReactionDropdownForMsgId === msgId) {
  //     setShowReactionDropdownForMsgId(null); // Close if it's already open for this message
  //   } else {
  //     setShowReactionDropdownForMsgId(msgId); // Open for the selected message
  //   }
  // };

  // // Function to add a reaction to the message
  // const handleAddReaction = async (msgId, reaction) => {
  //   try {
  //     await updateDoc(doc(db, `conversations/${user.uid}/${selectedUserId}`, msgId), {
  //       curUserReactions: reaction, // Assuming you're using this field for current user's reaction
  //     });
  //     await updateDoc(doc(db, `conversations/${selectedUserId}/${user.uid}`, msgId), {
  //       otherUserReaction: reaction, // Assuming this field for the other user's reaction
  //     });
  //   } catch (error) {
  //     console.error("Error adding reaction: ", error);
  //   }
  //   setShowReactionDropdownForMsgId(null); // Close dropdown after reaction is selected
  // };



  // const [reactionMenuMsgId, setReactionMenuMsgId] = useState(null);
  // const [msgReactions, setMsgReactions] = useState({});

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(doc(db, `conversations/${user.uid}/${selectedUserId}`), (doc) => {
  //     const data = doc.data();
  //     if (data) {
  //       setMessages(data.messages); // Assuming messages are stored in an array
  //       const reactions = data.messages.reduce((acc, msg) => {
  //         acc[msg.id] = msg.reactions || {};
  //         return acc;
  //       }, {});
  //       setMsgReactions(reactions);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [user, selectedUserId]);


  // const handleAddReaction = async (msgId, reaction) => {
  //   if (!msgId) return;
  //   try {
  //     const updatedReactions = {
  //       ...msgReactions[msgId],
  //       [user.uid]: reaction,
  //     };
  //     setMsgReactions((prev) => ({
  //       ...prev,
  //       [msgId]: updatedReactions,
  //     }));

  //     await updateDoc(doc(db, `conversations/${user.uid}/${selectedUserId}`, msgId), {
  //       reactions: updatedReactions,
  //     });
  //   } catch (error) {
  //     console.error("Error adding reaction: ", error);
  //   }
  // };

  // const handleShowReactionMenu = (msgId) => {
  //   setReactionMenuMsgId(reactionMenuMsgId === msgId ? null : msgId);
  // };


  return (
    <div className=''>
      <div className='overflow-y-auto h-[563px] px-7' ref={chatContainerRef}>


        {/* Forward Msg */}

        {isForwardMode && (
          <div className="forward-box">
            <div className="user-list">
              {allUsers.length > 0 ? (
                allUsers.map((usr) => (
                  <div
                    key={usr.id}
                    onClick={() => handleUserSelect(usr.id)}
                    className={`user-item ${selectedUsers.includes(usr.id) ? 'selected' : ''}`}
                  >
                    <img src={usr.profilePictureUrl} alt="User Avatar" />
                    <span>{usr.username}</span>
                  </div>
                ))
              ) : (
                <p>Loading users...</p>
              )}
            </div>
            <button onClick={handleForwardConfirm} className='ms-1 mt-5 btn bg-blue-400 px-4 py-2 rounded-md font-bold'>Forward</button>
            <button onClick={() => setIsForwardMode(false)} className='ms-10 mt-5 btn bg-red-600 text-white px-4 py-2 rounded-md font-bold'>Cancel</button>
          </div>
        )}



        {/* Display Massage */}

        {/* {messages.map((msg, index) => { */}
            {translatedMessages.map((msg, index) => {

          if (msg) {
            console.log(msg, "rr");
            // return null;
          }
          // {translatedMessages.map((msg, index) => {
          const currentMessageDate = msg.time ? msg.time.toDate() : null;
          // const previousMessageDate = index > 0 && messages[index - 1].time ? messages[index - 1].time.toDate() : null;
          const previousMessageDate = index > 0 && translatedMessages[index - 1].time ? translatedMessages[index - 1].time.toDate() : null;
          const isNewDate = currentMessageDate && (!previousMessageDate || currentMessageDate.toDateString() !== previousMessageDate.toDateString());

          // const repliedMessage = translatedMessages.find(m => m.id === msg.repliedTo);
          // const repliedMessage = messages.find(m => m.id === msg.repliedTo);

          return (
            <React.Fragment key={msg.id}>
              {isNewDate && (
                <div className="text-center text-white my-4 sticky top-3">
                  <span className="bg-gray-400 px-2 text-[13px] py-1">{formatDate(currentMessageDate)}</span>
                </div>
              )}
              <div className={`relative flex ${user.uid === msg.senderId ? 'justify-end' : 'justify-start'} my-2 replyShow      message-box ${user.uid === msg.senderId ? 'sent' : 'received'}`} onDoubleClick={() => handleForwardClick(msg)} // Trigger forward on double click
              >

                <div
                  className="pr-2 cursor-pointer replyIcon"
                  onClick={() => handleReplyClick(msg)}
                >
                  <i className="ri-reply-line text-lg text-gray-600"></i>
                </div>

                <div className={`w-fit px-2 pt-2 rounded-md ${user.uid === msg.senderId ? 'bg-blue-600' : 'bg-white'} ${msg.curUserReaction || msg.otherUserReaction ? 'mb-4' : ''} `}>

                  {msg.repliedTo && (
                    <div className={`p-2 rounded-md mb-1 ${user.uid === msg.senderId ? 'bg-blue-300' : 'bg-gray-200'}`}>
                      <p className={`text-[12px] ${user.uid === msg.senderId ? 'text-black' : 'text-gray-900'}`}>
                        <strong>Replied to:</strong> <br />{msg.repliedTo?.message}
                        {/* <strong>Replied to:</strong> {messages.find(m => m.id === msg.repliedTo)?.message} */}
                        {/* <strong>Replied to:</strong> {translatedMessages.find(m => m.id === msg.repliedTo)?.message} */}
                        {/* <strong>Replied to:</strong> {repliedMessage.message} */}
                      </p>
                    </div>
                  )}

                  <div className=" relative">
                    {msg.forwarded ? (<p className='text-xs text-gray-800'>forwarded</p>) : ("")}


                    <div className='flex justify-between'>
                      {isEditingMsgId === msg.id ? (
                        <div className="flex flex-col">
                          <input
                            type="text"
                            className="text-[14px] font-normal text-black"
                            value={editedMessage}
                            onChange={(e) => setEditedMessage(e.target.value)}
                            autoFocus
                          />
                          <div className="flex space-x-2 mt-2">
                            <button
                              className="px-2 py-1 bg-blue-500 text-white rounded"
                              onClick={() => handleSaveEditedMessage(msg.id)}
                            >
                              Save
                            </button>
                            <button
                              className="px-2 py-1 bg-gray-500 text-white rounded"
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div
                            className={`text-[14px] font-normal ${user.uid === msg.senderId ? 'text-white' : 'text-black'} 
                            `}
                            onClick={() => handleOptionsClick(msg.id)}
                          >
                            {msg.message}
                          </div>


                        </div>

                      )}

                      <p className={`text-[10px] pt-4 ps-4 ${user.uid === msg.senderId ? 'text-gray-300' : 'text-gray-600'}`}>
                        {formatTimestamp(msg.time)}
                      </p>
                    </div>

                    {/* Reaction dropdown */}
                    {/* {showReactionDropdownForMsgId === msg.id && (
          <div
            className={`absolute ${user.uid === msg.senderId ? 'right-[200px] top-[-15px]' : 'right-[-100px] top-5'} mt-2 w-32 bg-white shadow-lg rounded-lg z-10`}
          >
            {reactions.map((reaction) => (
              <button
                key={reaction}
                className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left hover:rounded-lg"
                onClick={() => handleAddReaction(msg.id, reaction)}
              >
                {reaction}
              </button>
            ))}
          </div>
        )} */}



                    {showDropdownForMsgId == msg.id && (
                      <div className={`absolute ${user.uid === msg.senderId ? 'right-[200px] top-[-15px]' : 'right-[-100px] top-5'} mt-2 w-28 bg-white shadow-lg rounded-lg z-10`}>
                        <button className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left hover:rounded-lg"
                          onClick={() => handleEditMessageClick(msg.id, msg.message)}>
                          <i class="ri-edit-box-line pe-2 cursor-pointer"></i>
                          Edit
                        </button>
                        <button
                          className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left hover:rounded-lg"
                          onClick={() => handleDeleteMessage(msg.id)}
                        >
                          <i className="ri-delete-bin-line pe-1 cursor-pointer"></i> Delete
                        </button>
                        <button
                          className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left hover:rounded-lg"
                          onClick={() => handleAddReaction(msg.id)}
                        >
                          ❤️ React
                        </button>

                      </div>
                    )}

                    {/* Display Reaction */}
                    <div className='relative'>
                      {msg.otherUserReaction && (
                        <div className='bg-gray-100 absolute left-[-15px] bottom-[-18px] rounded-lg'>
                          <p>{msg.otherUserReaction}</p>
                        </div>
                      )}
                    </div>

                    <div className='relative'>
                      {msg.curUserReaction && (
                        <div className={`bg-gray-100 absolute ${msg.otherUserReaction ? 'left-[11px]' : 'left-[-15px]'}   bottom-[-18px] rounded-lg`}>
                          <p>{msg.curUserReaction}</p>
                        </div>
                      )}
                    </div>



                    {/* Display Reaction List */}
                    <div className='relative z-10'>
                      {isReact == msg.id && (
                        <div className={` bg-gray-700 w-60 h-64 flex flex-wrap absolute  ${user.uid === msg.senderId ? 'right-72' : 'right-[-500px]'}  bottom-[-20px] overflow-auto cursor-pointer`}>
                          {reactions.map((icon, index) => (
                            <div key={index} className='w-8 h-8 flex justify-center items-center'>
                              <p className='text-xl' onClick={() => AddReactionToDB(msg.id, icon)}>{icon}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>


                  </div>

                </div>
              </div>
            </React.Fragment>
          );
        })}




      </div>


      <div className='bg-blue-200 border-t-2 border-dark-blue'>
        <form onSubmit={handleSend} className='flex items-center justify-between'>
          <select className='ms-2 p-1 bg-pink-600 text-white' value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>


          {replyTo && (
            <div className="bg-blue-400 px-2 py-1 rounded-md ms-4 flex">
              <p className='text-[12px] text-gray-900'>
                <strong>Replying to:</strong> {replyTo.message}
              </p>
            </div>

          )}

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={replyTo ? "Type your reply..." : "Type a message"}
            className='py-3 ps-3 bg-transparent outline-none text-[15px] w-full'
          />
          <button type="submit" className='text-2xl pe-2'><i className="ri-send-plane-2-line"></i></button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
