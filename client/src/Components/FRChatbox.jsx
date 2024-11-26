import { collection, doc, getDoc, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';


export default function FRChatbox() {

    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [chatList, setchatList] = useState([]);
    // const navigate = useNavigate();

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const selectedUserId = queryParams.get('userId');


    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);
    console.log("friend", user);


    // const currentUser = auth.currentUser;


    // useEffect(() => {
    // const fetchUsers = async () => {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     setUsers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    // };

    //     const fetchChatListUsers = async () => {
    //         if (user) {
    //             // Step 1: Fetch the current user's chatList
    //             const currentUserDoc = await getDoc(doc(db, "users", user.uid));
    //             const userData = currentUserDoc.data();

    //             // const chatList = currentUserDoc.data().chatList || [];
    //             const chatList = userData?.chatList || [];

    //             if (chatList.length > 0) {
    //                 // Step 2: Fetch users who are in the chatList
    //                 const querySnapshot = await getDocs(collection(db, "users"));
    //                 const chatListUsers = querySnapshot.docs
    //                     .map(doc => ({ id: doc.id, ...doc.data() }))
    //                     .filter(user => chatList.includes(user.id)); // Step 3: Filter users by chatList

    //                 setUsers(chatListUsers);
    //             }
    //             else {
    //                 console.log("No users in chatList");
    //             }
    //         }
    //     };

    //     fetchChatListUsers();

    //     // fetchUsers();
    // }, [user]);

    // const chatList = [];
    useEffect(() => {
        if (user) {
            const fetchUsers = async () => {
                try {
                    const currentUserDoc = await getDoc(doc(db, "users", user.uid));
                    const userData = currentUserDoc.data();

                    // const chatList = currentUserDoc.data().chatList || [];
                    // chatList = userData?.chatList || [];
                    // setchatList(chatList)
                    setchatList(userData?.chatList || []); // Set chatList from user data


                    console.log("chatlist", chatList);
                } catch (error) {
                    console.error("error into fetch chatlist users", error);

                }



                const querySnapshot = await getDocs(collection(db, "users"));
                setUsers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            };
            fetchUsers();
        }
    }, [user]);
    console.log("login ", users);


    // const handleSelectUser = (userId) => {
    //     navigate(`/chats?userId=${userId}`);
    // };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.mail.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sendFriendRequest = async (currentUserId, recipientUserId) => {
        try {
            // Step 1: Update friendRequestsSent array for the current user (User A)
            const currentUserDocRef = doc(db, "users", currentUserId);
            await updateDoc(currentUserDocRef, {
                friendRequestSent: arrayUnion(recipientUserId)
            });

            // Step 2: Update friendRequestsReceived array for the recipient (User B)
            const recipientUserDocRef = doc(db, "users", recipientUserId);
            await updateDoc(recipientUserDocRef, {
                friendRequestReceived: arrayUnion(currentUserId)
            });

            console.log(`Friend request sent from ${currentUserId} to ${recipientUserId}`);
        } catch (error) {
            console.error("Error sending friend request: ", error);
        }
    };

    const handleSendFriendRequest = (recipientUserId) => {
        sendFriendRequest(user.uid, recipientUserId);
    };

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
                    placeholder='Search New Friends'
                />
            </div>


            {/* ChatList */}

            <div className=' overflow-auto h-[550px] '>

                {searchQuery !== '' ? (
                    <>
                        {filteredUsers.map(userA => (
                            <div key={userA.id} className={`p-3 my-2 mx-4 rounded-md flex items-center  ${selectedUserId == userA.userId ? ("bg-white") : ("hover:bg-gray-200")}`}>

                                <div className="">
                                    <img src={userA.profilePictureUrl || "https://picsum.photos/200/300"} className='w-12 h-12 rounded-full' alt="user profile picture" />
                                </div>
                                <div className='ps-4'>
                                    <h1 className='text-md font-semibold text-dark-blue text-left'>{userA.username}</h1>

                                    {
                                        (!chatList.includes(userA.id) && user) ? (
                                            // <button
                                            //     onClick={() => handleSendFriendRequest(userA.id)}
                                            //     className="send-friend-request-btn"
                                            // >
                                            //     Send Friend Request
                                            // </button>
                                            <>
                                                {!chatList.includes(userA.id) && (userA.id !== user.uid) ? (
                                                    <button
                                                        onClick={() => handleSendFriendRequest(userA.id)}
                                                        className="send-friend-request-btn">
                                                        Send Friend Request
                                                    </button>
                                                ) : (userA.id === user.uid) ? (
                                                    <p className="text-gray-500">(You)</p>
                                                ) : (
                                                    <p className="text-gray-500">In Chat List</p>
                                                )}
                                            </>
                                        ) : (
                                            <p className="text-gray-500">In Chat List</p>
                                        )
                                    }
                                    
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <p className=' text-center mt-60'>Type something for find new friends</p>
                )}




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
