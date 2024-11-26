// import React, { useState, useEffect } from 'react';
// import { db, auth } from '../firebase'; // Assuming you have these exports in firebase.js
// import { collection, addDoc, query, onSnapshot, orderBy, doc, getDoc, getFirestore } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';

// export default function Dashboard() {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [user, setUser] = useState(null);
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         const auth = getAuth();
//         const db = getFirestore();

//         const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//             if (currentUser) {
//                 setUser(currentUser);

//                 // Fetch user data from Firestore
//                 const userDocRef = doc(db, "users", currentUser.uid);
//                 const userDoc = await getDoc(userDocRef);

//                 if (userDoc.exists()) {
//                     setData(userDoc.data());
//                 } else {
//                     console.log("No such document!");
//                 }
//             } else {
//                 console.log("No user is signed in.");
//             }
//         });

//         return () => unsubscribe();
//     }, []);

//     useEffect(() => {
//         const q = query(collection(db, 'messages'), orderBy('timestamp'));
//         const unsubscribe = onSnapshot(q, async (querySnapshot) => {
//             const messages = [];
//             for (const docSnapshot of querySnapshot.docs) {
//                 const data = docSnapshot.data();
//                 const userDoc = await getDoc(doc(db, 'users', data.senderId));
//                 messages.push({ ...data, id: docSnapshot.id, username: userDoc.data().username });
//             }
//             setMessages(messages);
//         });
//         return () => unsubscribe();
//     }, []);

//     const handleSend = async () => {
//         if (newMessage.trim() === '') return;

//         await addDoc(collection(db, 'messages'), {
//             text: newMessage,
//             senderId: auth.currentUser.uid,
//             timestamp: new Date(),
//         });

//         setNewMessage('');
//     };

//     if (!user) {
//         return <div>Please log in to view your dashboard.</div>;
//     }

//     // Ensure data is not null and has the expected structure
//     const username = data?.username || "Unknown User";

//     return (
//         <div>
//             <div>
//                 <h1>Welcome, {username}</h1>
//                 {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//             </div>

//             <div>
//                 {messages.map((message) => (
//                     <div key={message.id}>
//                         <strong>{message.username}</strong>: {message.text}
//                     </div>
//                 ))}
//             </div>
//             <input
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Type a message"
//             />
//             <button onClick={handleSend}>Send</button>
//         </div>
//     );
// };





// import React, { useState, useEffect } from 'react';
// import { db, auth } from '../firebase';
// import { collection, addDoc, query, onSnapshot, orderBy, doc, getDoc, getFirestore } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';

// export default function Dashboard() {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [user, setUser] = useState(null);
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         const auth = getAuth();
//         const db = getFirestore();

//         const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//             if (currentUser) {
//                 setUser(currentUser);

//                 // Fetch user data from Firestore
//                 const userDocRef = doc(db, "users", currentUser.uid);
//                 const userDoc = await getDoc(userDocRef);

//                 if (userDoc.exists()) {
//                     setData(userDoc.data());
//                 } else {
//                     console.log("No such document!");
//                 }
//             } else {
//                 console.log("No user is signed in.");
//             }
//         });

//         return () => unsubscribe();
//     }, []);

//     useEffect(() => {
//         const q = query(collection(db, 'messages'), orderBy('timestamp'));
//         const unsubscribe = onSnapshot(q, async (querySnapshot) => {
//             const messages = [];
//             for (const docSnapshot of querySnapshot.docs) {
//                 const data = docSnapshot.data();
//                 try {
//                     const userDoc = await getDoc(doc(db, 'users', data.senderId));
//                     messages.push({ ...data, id: docSnapshot.id, username: userDoc.exists() ? userDoc.data().username : 'Unknown User' });
//                 } catch (error) {
//                     console.error("Error fetching user document:", error);
//                 }
//             }
//             setMessages(messages);
//         });
//         return () => unsubscribe();
//     }, []);
    

//     const handleSend = async () => {
//         if (newMessage.trim() === '') return;

//         await addDoc(collection(db, 'messages'), {
//             text: newMessage,
//             senderId: auth.currentUser.uid,
//             timestamp: new Date(),
//         });

//         setNewMessage('');
//     };

//     if (!user) {
//         return <div>Please log in to view your dashboard.</div>;
//     }

//     // Ensure data is not null and has the expected structure
//     const username = data?.username || "Unknown User";

//     return (
//         <div>
//             <div>
//                 <h1>Welcome, {username}</h1>
//                 {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//             </div>

//             <div>
//                 {messages.map((message) => (
//                     <div key={message.id}>
//                         <strong>{message.username}</strong>: {message.text}
//                     </div>
//                 ))}
//             </div>
//             <input
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Type a message"
//             />
//             <button onClick={handleSend}>Send</button>
//         </div>
//     );
// };




// import React, { useState, useEffect } from 'react';
// import { db, auth } from '../firebase'; // Ensure firebase.js is properly configured and exported
// import { collection, addDoc, query, onSnapshot, orderBy, doc, getDoc, getFirestore, serverTimestamp } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';

// export default function Dashboard() {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [user, setUser] = useState(null);
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         const auth = getAuth();
//         const db = getFirestore();

//         const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//             if (currentUser) {
//                 setUser(currentUser);

//                 // Fetch user data from Firestore
//                 const userDocRef = doc(db, "users", currentUser.uid);
//                 const userDoc = await getDoc(userDocRef);

//                 if (userDoc.exists()) {
//                     setData(userDoc.data());
//                 } else {
//                     console.log("No such document!");
//                 }
//             } else {
//                 console.log("No user is signed in.");
//             }
//         });

//         return () => unsubscribe();
//     }, []);

//     useEffect(() => {
//         const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
//         const unsubscribe = onSnapshot(q, async (querySnapshot) => {
//             const messages = [];
//             for (const docSnapshot of querySnapshot.docs) {
//                 const data = docSnapshot.data();
//                 try {
//                     const userDoc = await getDoc(doc(db, 'users', data.senderId));
//                     messages.push({ ...data, id: docSnapshot.id, username: userDoc.exists() ? userDoc.data().username : 'Unknown User' });
//                 } catch (error) {
//                     console.error("Error fetching user document:", error);
//                 }
//             }
//             setMessages(messages);
//         });
//         return () => unsubscribe();
//     }, []);

//     const handleSend = async () => {
//         if (newMessage.trim() === '') return;

//         await addDoc(collection(db, 'messages'), {
//             text: newMessage,
//             senderId: auth.currentUser.uid,
//             timestamp: serverTimestamp(),
//         });

//         setNewMessage('');
//     };

//     if (!user) {
//         return <div>Please log in to view your dashboard.</div>;
//     }

//     const username = data?.username || "Unknown User";

//     return (
//         <div className="min-h-screen bg-gray-100 p-6">
//             <div className="bg-white p-6 rounded shadow-md">
//                 <h1 className="text-2xl font-bold mb-4">Welcome, {username}</h1>
//                 {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//             </div>

//             <div className="mt-6 bg-white p-6 rounded shadow-md">
//                 <div className="mb-4">
//                     {messages.map((message) => (
//                         <div key={message.id} className="mb-2">
//                             <strong>{message.username}</strong>: {message.text}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="flex items-center">
//                     <input
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         placeholder="Type a message"
//                         className="w-full p-2 border rounded mr-2"
//                     />
//                     <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
//                 </div>
//             </div>
//         </div>
//     );
// };




// import React, { useState, useEffect } from 'react';
// import { db, auth } from '../firebase'; // Ensure firebase.js is properly configured and exported
// import { collection, addDoc, query, onSnapshot, orderBy, doc, getDoc, getFirestore, serverTimestamp } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';

// export default function Dashboard() {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [user, setUser] = useState(null);
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         const auth = getAuth();
//         const db = getFirestore();

//         const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//             if (currentUser) {
//                 setUser(currentUser);

//                 // Fetch user data from Firestore
//                 const userDocRef = doc(db, "users", currentUser.uid);
//                 const userDoc = await getDoc(userDocRef);

//                 if (userDoc.exists()) {
//                     setData(userDoc.data());
//                 } else {
//                     console.log("No such document!");
//                 }
//             } else {
//                 console.log("No user is signed in.");
//             }
//         });

//         return () => unsubscribe();
//     }, []);

//     useEffect(() => {
//         const db = getFirestore();
//         const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
//         const unsubscribe = onSnapshot(q, async (querySnapshot) => {
//             const messages = [];
//             for (const docSnapshot of querySnapshot.docs) {
//                 const data = docSnapshot.data();
//                 try {
//                     const userDoc = await getDoc(doc(db, 'users', data.senderId));
//                     messages.push({ ...data, id: docSnapshot.id, username: userDoc.exists() ? userDoc.data().username : 'Unknown User' });
//                 } catch (error) {
//                     console.error("Error fetching user document:", error);
//                 }
//             }
//             setMessages(messages);
//         });
//         return () => unsubscribe();
//     }, []);

//     const handleSend = async () => {
//         const db = getFirestore();
//         const auth = getAuth();

//         if (newMessage.trim() === '') return;

//         await addDoc(collection(db, 'messages'), {
//             text: newMessage,
//             senderId: auth.currentUser.uid,
//             timestamp: serverTimestamp(),
//         });

//         setNewMessage('');
//     };

//     if (!user) {
//         return <div>Please log in to view your dashboard.</div>;
//     }

//     const username = data?.username || "Unknown User";

//     return (
//         <div className="min-h-screen bg-gray-100 p-6">
//             <div className="bg-white p-6 rounded shadow-md">
//                 <h1 className="text-2xl font-bold mb-4">Welcome, {username}</h1>
//                 {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//             </div>

//             <div className="mt-6 bg-white p-6 rounded shadow-md">
//                 <div className="mb-4">
//                     {messages.map((message) => (
//                         <div key={message.id} className="mb-2">
//                             <strong>{message.username}</strong>: {message.text}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="flex items-center">
//                     <input
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         placeholder="Type a message"
//                         className="w-full p-2 border rounded mr-2"
//                     />
//                     <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
//                 </div>
//             </div>
//         </div>
//     );
// };



// import React, { useState, useEffect } from 'react';
// import { db, auth } from '../firebase'; // Ensure firebase.js is properly configured and exported
// import { collection, addDoc, query, onSnapshot, orderBy, doc, getDoc, getFirestore, serverTimestamp } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';

// export default function Dashboard() {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [user, setUser] = useState(null);
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         const auth = getAuth();
//         const db = getFirestore();

//         const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//             if (currentUser) {
//                 setUser(currentUser);

//                 // Fetch user data from Firestore
//                 const userDocRef = doc(db, "users", currentUser.uid);
//                 const userDoc = await getDoc(userDocRef);

//                 if (userDoc.exists()) {
//                     setData(userDoc.data());
//                 } else {
//                     console.log("No such document!");
//                 }
//             } else {
//                 console.log("No user is signed in.");
//             }
//         });

//         return () => unsubscribe();
//     }, []);

//     useEffect(() => {
//         const db = getFirestore();
//         const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
//         const unsubscribe = onSnapshot(q, async (querySnapshot) => {
//             const messages = [];
//             for (const docSnapshot of querySnapshot.docs) {
//                 const data = docSnapshot.data();
//                 try {
//                     const userDoc = await getDoc(doc(db, 'users', data.senderId));
//                     messages.push({ ...data, id: docSnapshot.id, username: userDoc.exists() ? userDoc.data().username : 'Unknown User' });
//                 } catch (error) {
//                     console.error("Error fetching user document:", error);
//                 }
//             }
//             setMessages(messages);
//         });
//         return () => unsubscribe();
//     }, []);

//     const handleSend = async () => {
//         const db = getFirestore();
//         const auth = getAuth();

//         if (newMessage.trim() === '') return;

//         await addDoc(collection(db, 'messages'), {
//             text: newMessage,
//             senderId: auth.currentUser.uid,
//             timestamp: serverTimestamp(),
//         });

//         setNewMessage('');
//     };

//     if (!user) {
//         return <div>Please log in to view your dashboard.</div>;
//     }

//     const username = data?.username || "Unknown User";

//     return (
//         <div className="min-h-screen bg-gray-100 p-6">
//             <div className="bg-white p-6 rounded shadow-md">
//                 <h1 className="text-2xl font-bold mb-4">Welcome, {username}</h1>
//                 {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//             </div>

//             <div className="mt-6 bg-white p-6 rounded shadow-md">
//                 <div className="mb-4">
//                     {messages.map((message) => (
//                         <div key={message.id} className="mb-2">
//                             <strong>{message.username}</strong>: {message.text}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="flex items-center">
//                     <input
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         placeholder="Type a message"
//                         className="w-full p-2 border rounded mr-2"
//                     />
//                     <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
//                 </div>
//             </div>
//         </div>
//     );
// };


// import React, { useState, useEffect } from 'react';
// import { db, auth } from '../firebase'; // Ensure firebase.js is properly configured and exported
// import { collection, addDoc, query, onSnapshot, orderBy, doc, getDoc, getFirestore, serverTimestamp } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';

// export default function Dashboard() {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [user, setUser] = useState(null);
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         const auth = getAuth();
//         const db = getFirestore();

//         const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//             if (currentUser) {
//                 setUser(currentUser);

//                 // Fetch user data from Firestore
//                 const userDocRef = doc(db, "users", currentUser.uid);
//                 const userDoc = await getDoc(userDocRef);

//                 if (userDoc.exists()) {
//                     setData(userDoc.data());
//                 } else {
//                     console.log("No such document!");
//                 }
//             } else {
//                 console.log("No user is signed in.");
//             }
//         });

//         return () => unsubscribe();
//     }, []);

//     useEffect(() => {
//         const db = getFirestore();
//         const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
//         const unsubscribe = onSnapshot(q, async (querySnapshot) => {
//             const messages = [];
//             for (const docSnapshot of querySnapshot.docs) {
//                 const data = docSnapshot.data();
//                 try {
//                     const userDoc = await getDoc(doc(db, 'users', data.senderId));
//                     messages.push({ ...data, id: docSnapshot.id, username: userDoc.exists() ? userDoc.data().username : 'Unknown User' });
//                 } catch (error) {
//                     console.error("Error fetching user document:", error);
//                 }
//             }
//             setMessages(messages);
//         });
//         return () => unsubscribe();
//     }, []);

//     const handleSend = async () => {
//         const db = getFirestore();
//         const auth = getAuth();

//         if (newMessage.trim() === '') return;

//         await addDoc(collection(db, 'messages'), {
//             text: newMessage,
//             senderId: auth.currentUser.uid,
//             timestamp: serverTimestamp(),
//         });

//         setNewMessage('');
//     };

//     if (!user) {
//         return <div>Please log in to view your dashboard.</div>;
//     }

//     const username = data?.username || "Unknown User";

//     return (
//         <div className="min-h-screen bg-gray-100 p-6">
//             <div className="bg-white p-6 rounded shadow-md">
//                 <h1 className="text-2xl font-bold mb-4">Welcome, {username}</h1>
//                 {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//             </div>

//             <div className="mt-6 bg-white p-6 rounded shadow-md">
//                 <div className="mb-4">
//                     {messages.map((message) => (
//                         <div key={message.id} className="mb-2">
//                             <strong>{message.username}</strong>: {message.text}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="flex items-center">
//                     <input
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         placeholder="Type a message"
//                         className="w-full p-2 border rounded mr-2"
//                     />
//                     <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
//                 </div>
//             </div>
//         </div>
//     );
// };
    



// Example usage in a parent component
// import React, { useState, useEffect } from 'react';
// import ChatList from '../Components/ChatList'; // Adjust the import path as necessary

// export default function Dashboard(){
//   const [chats, setChats] = useState([]);

//   useEffect(() => {
//     // Fetch chat list from your database
//     // For example: const fetchedChats = await fetchChatsFromDatabase();
//     // setChats(fetchedChats);
//   }, []);

//   return (
//     <div>
//       <ChatList chats={chats} />
//       {/* Other components like Chat */}
//     </div>
//   );
// };

// import React, { useState, useEffect } from 'react';
// import ChatList from '../Components/ChatList'; // Adjust the import path as necessary
// import Chat from '../Components/Chat'; // Ensure you have a Chat component imported
// import { db, auth } from '../firebase';
// import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
// import { onAuthStateChanged } from 'firebase/auth';

// export default function Dashboard() {
//   const [chats, setChats] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//   }, []);

//   useEffect(() => {
//     // Fetch chat list from your database
//     const fetchChats = async () => {
//       // Example: Fetch chats from Firestore
//       const chatsQuery = query(collection(db, 'chats'));
//       const unsubscribe = onSnapshot(chatsQuery, (snapshot) => {
//         const fetchedChats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setChats(fetchedChats);
//       });
//       return () => unsubscribe();
//     };

//     fetchChats();
//   }, []);

//   useEffect(() => {
//     if (selectedChat) {
//       const q = query(collection(db, 'messages'), orderBy('createdAt'));
//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         setMessages(snapshot.docs
//           .map(doc => ({ id: doc.id, ...doc.data() }))
//           .filter(msg => msg.chatId === selectedChat.id));
//       });
//       return () => unsubscribe();
//     }
//   }, [selectedChat]);

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (message.trim() && selectedChat && user) {
//       await addDoc(collection(db, 'messages'), {
//         text: message,
//         uid: user.uid,
//         createdAt: serverTimestamp(),
//         chatId: selectedChat.id
//       });
//       setMessage('');
//     }
//   };

//   return (
//     <div>
//       <ChatList chats={chats} onSelectChat={setSelectedChat} />
//       {selectedChat && (
//         <Chat messages={messages} handleSend={handleSend} message={message} setMessage={setMessage} />
//       )}
//     </div>
//   );
// }

