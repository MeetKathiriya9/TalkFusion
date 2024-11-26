import { collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

const ChatDashboardChatbox = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);

    const navigate = useNavigate();

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const selectedUserId = queryParams.get('userId');

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const querySnapshot = await getDocs(collection(db, "users"));
    //         setUsers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    //     };
    //     fetchUsers();
    // }, []);
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);

    
    useEffect(() => {
        // const fetchUsers = async () => {
        //     const querySnapshot = await getDocs(collection(db, "users"));
        //     setUsers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        // };

        const fetchChatListUsers = async () => {
            if (user) {
                // Step 1: Fetch the current user's chatList
                const currentUserDoc = await getDoc(doc(db, "users", user.uid));
                const userData = currentUserDoc.data();

                // const chatList = currentUserDoc.data().chatList || [];
                const chatList = userData?.chatList || [];

                if (chatList.length > 0) {
                    // Step 2: Fetch users who are in the chatList
                    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
                        const chatListUsers = snapshot.docs
                            .map(doc => ({ id: doc.id, ...doc.data() }))
                            .filter(user => chatList.includes(user.id)); // Step 3: Filter users by chatList

                    setUsers(chatListUsers);

                });
                return () => unsubscribe(); // Cleanup the listener

                }
                else {
                    console.log("No users in chatList");
                }
            }
        };

        fetchChatListUsers();

        // fetchUsers();
    }, [user]);
    console.log("logined ", users);


    const handleSelectUser = (userId) => {
        navigate(`/chats?userId=${userId}`);
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.mail.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* SearchBar */}

            <div className='relative flex items-center mb-2'>
                <i className="ri-search-line absolute left-9 text-dark-blue"></i>
                <input
                    type="text"
                    name='searchbar'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='w-full mx-7 rounded-md p-2 ps-8 bg-white outline-none border-2 border-blue-50 hover:border-solid hover:border-2 hover:border-blue-900 focus:border-blue-900'
                    placeholder='Search or start new chat'
                />
            </div>


            {/* ChatList */}

            <div className=' overflow-auto h-[550px] '>

                {filteredUsers.map(user => (
                    <div key={user.id} onClick={() => handleSelectUser(user.userId)} className={`p-3 my-2 mx-4 rounded-md flex items-center  ${selectedUserId == user.userId ? ("bg-white") : ("hover:bg-gray-200")}`}>
                        <div className="relative">
                            <img src={user.profilePictureUrl || "https://picsum.photos/200/300"} className='w-12 h-12 rounded-full' alt="user profile picture" />

                            <p className=' text-sm absolute bottom-[-8px] left-[-5opx]'>{user.currentEmotion}</p>
                        </div>
                        <div className='ps-4'>
                            <h1 className='text-md font-semibold text-dark-blue text-left'>{user.username}</h1>
                            <p className='text-md text-gray-500 w-80 truncate'>{user.mail}</p>
                        </div>
                    </div>
                ))}


                {/* {users.map(user => (
                // <div key={user.id} onClick={() => handleSelectUser(user.id)} className='p-3 my-2 mx-4 rounded-md flex items-center hover:bg-white'>
                <div key={user.id} onClick={() => handleSelectUser(user.userId)} className='p-3 my-2 mx-4 rounded-md flex items-center hover:bg-white'>
                    <div className="">
                        <img src={user.profilePictureUrl || "https://picsum.photos/200/300"} className='w-12 h-12 rounded-full' alt="user profile picture" />
                    </div>
                    <div className='ps-4'>
                        <h1 className='text-md font-semibold text-dark-blue text-left'>{user.username}</h1>
                        <p className='text-md text-gray-500 w-80 truncate'>{user.mail}</p>
                    </div>
                </div>
            ))} */}
            </div>
        </>
    )
}

export default ChatDashboardChatbox;
