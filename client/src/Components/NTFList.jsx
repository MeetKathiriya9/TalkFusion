import React from 'react'
import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, updateDoc, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function NTFList() {

    const [sentRequests, setSentRequests] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const [user, setUser] = useState(null);

    // Store full user data (name, profile picture, etc.)
    const [sentUsersData, setSentUsersData] = useState([]);
    const [receivedUsersData, setReceivedUsersData] = useState([]);

    const [history, setHistory] = useState([]);
    const [usernames, setUsernames] = useState({});
    const [qqq, setqqq] = useState(false);



    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);

    useEffect(() => {
        if (user) {
            const userDocRef = doc(db, "users", user.uid);

            const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
                const userData = snapshot.data();
                // setSentRequests(userData.friendRequestSent || []);
                // setReceivedRequests(userData.friendRequestReceived || []);

                const sent = userData.friendRequestSent || [];
                const received = userData.friendRequestReceived || [];

                // Set IDs of sent and received requests
                setSentRequests(sent);
                setReceivedRequests(received);
                setNotifications(userData.actionHistory || []);  // Get notification history

                // Fetch full user data for both sent and received requests
                fetchUsersData(sent, setSentUsersData);
                fetchUsersData(received, setReceivedUsersData);

                // Fetch usernames for notification history
                fetchNotificationUsernames(userData.actionHistory);
            });

            return () => unsubscribe();  // Cleanup listener on unmount
        }
    }, [user]);


    // Function to accept a friend request
    const acceptFriendRequest = async (friendId) => {
        try {
            const currentUserDocRef = doc(db, "users", user.uid);
            const friendUserDocRef = doc(db, "users", friendId);

            // Step 1: Add each other to chatList
            await updateDoc(currentUserDocRef, {
                chatList: arrayUnion(friendId),
                friendRequestReceived: arrayRemove(friendId), // Remove from received requests
                actionHistory: arrayUnion({
                    type: "friendRequestAccepted",
                    from: friendId,
                    timestamp: Timestamp.now(),
                })
            });

            await updateDoc(friendUserDocRef, {
                chatList: arrayUnion(user.uid),
                friendRequestSent: arrayRemove(user.uid),  // Remove from sent requests
                actionHistory: arrayUnion({
                    type: "friendRequestAccepted",
                    to: user.uid,
                    timestamp: Timestamp.now(),
                })
            });

            console.log(`Accepted friend request from ${friendId}`);
        } catch (error) {
            console.error("Error accepting friend request:", error);
        }
    };

    // Function to remove/reject a friend request
    const removeFriendRequest = async (friendId) => {
        try {
            const currentUserDocRef = doc(db, "users", user.uid);
            const friendUserDocRef = doc(db, "users", friendId);

            // Step 1: Remove from received/sent friend requests
            await updateDoc(currentUserDocRef, {
                friendRequestReceived: arrayRemove(friendId), // Remove from received requests
                actionHistory: arrayUnion({
                    type: "friendRequestRemoved",
                    from: friendId,
                    timestamp: Timestamp.now(),
                })
            });

            await updateDoc(friendUserDocRef, {
                friendRequestSent: arrayRemove(user.uid),  // Remove from sent requests
                actionHistory: arrayUnion({
                    type: "friendRequestRemoved",
                    to: user.uid,
                    timestamp: Timestamp.now(),
                })
            });

            console.log(`Removed friend request from ${friendId}`);
        } catch (error) {
            console.error("Error removing friend request:", error);
        }
    };

    const cancelFriendRequest = async (friendId) => {
        try {
            const currentUserDocRef = doc(db, "users", user.uid);
            const friendUserDocRef = doc(db, "users", friendId);

            // Remove the friendId from the sent requests array
            await updateDoc(currentUserDocRef, {
                friendRequestSent: arrayRemove(friendId),
                actionHistory: arrayUnion({
                    type: "friendRequestCancelled",
                    to: friendId,
                    timestamp: Timestamp.now(),
                })
            });

            // Remove the current user's UID from the recipient's received requests array
            await updateDoc(friendUserDocRef, {
                friendRequestReceived: arrayRemove(user.uid),
                actionHistory: arrayUnion({
                    type: "friendRequestCancelled",
                    from: user.uid,
                    timestamp: Timestamp.now(),
                })
            });

            console.log(`Canceled friend request to ${friendId}`);
        } catch (error) {
            console.error("Error canceling friend request:", error);
        }
    };

    // Function to fetch user data from Firestore based on user IDs
    const fetchUsersData = async (userIds, setUsersData) => {
        const userPromises = userIds.map(async (userId) => {
            const userDocRef = doc(db, 'users', userId);
            const userSnapshot = await getDoc(userDocRef);
            if (userSnapshot.exists()) {
                return { id: userId, ...userSnapshot.data() };
            }
            return null;
        });

        const usersData = await Promise.all(userPromises);
        setUsersData(usersData.filter(Boolean));  // Filter out any null results
    };


     // Fetch usernames for notifications
     const fetchNotificationUsernames = async (notifications) => {
        const userIds = notifications.reduce((ids, notification) => {
            if (notification.from) ids.add(notification.from);
            if (notification.to) ids.add(notification.to);
            return ids;
        }, new Set());

        const usernamePromises = Array.from(userIds).map(async (userId) => {
            const userDocRef = doc(db, 'users', userId);
            const userSnapshot = await getDoc(userDocRef);
            if (userSnapshot.exists()) {
                return { id: userId, username: userSnapshot.data().username };
            }
            return null;
        });

        const usersData = await Promise.all(usernamePromises);
        const usernameMap = {};
        usersData.forEach((user) => {
            if (user) {
                usernameMap[user.id] = user.username;
            }
        });
        setUsernames(usernameMap);
    };

    // Helper function to get username from ID
    const getUsername = (userId) => {
        // if(usernames[userId]){
        //     setqqq(true)
            return usernames[userId];

        // }else{
        //     return;
        // }
        // const f = usernames[userId] || `Userw ${userId}`;
        // console.log(f,"name");
        
    };

    // console.log(sentRequests,"send");
    return (
        // <div className="notifications m-[30px] p-[30px]">
        //     <h3 >Friend Requests Sent</h3>
        //     <ul>
        //         {sentRequests.map(userId => (
        //             <li key={userId}>You sent a friend request to User {userId}</li>
        //         ))}
        //     </ul>

        //     <h3>Friend Requests Received</h3>
        //     <ul>
        //         {receivedRequests.map(userId => (
        //             <li key={userId}>You received a friend request from User {userId}</li>
        //         ))}
        //     </ul>
        // </div>

        //     <div className="notifications  m-[30px] p-[30px]">
        //     <h3>Friend Requests Received</h3>
        //     <ul>
        //         {receivedRequests.length > 0 ? (
        //             receivedRequests.map(friendId => (
        //                 <li key={friendId}>
        //                     You received a friend request from User {friendId}
        //                     <button onClick={() => acceptFriendRequest(friendId)}>Accept</button>
        //                     <button onClick={() => removeFriendRequest(friendId)}>Remove</button>
        //                 </li>
        //             ))
        //         ) : (
        //             <li>No received friend requests</li>
        //         )}
        //     </ul>

        //     <h3>Friend Requests Sent</h3>
        //     <ul>
        //         {sentRequests.length > 0 ? (
        //             sentRequests.map(friendId => (
        //                 <li key={friendId}>
        //                     You sent a friend request to User {friendId}
        //                     <button onClick={() => cancelFriendRequest(friendId)}>Cancel Request</button>
        //                 </li>
        //             ))
        //         ) : (
        //             <li>No sent friend requests</li>
        //         )}
        //     </ul>
        // </div>


        <div className=" overflow-auto h-[618px] ">
            {/* Friend Requests Received Section */}
            {/* <h3 className="text-xl font-semibold text-gray-800 mb-4">Friend Requests Received</h3> */}
            <ul className="mx-5 my-2">
                {/* {receivedUsersData.length > 0 ? ( */}
                {receivedUsersData.map(({ id, username, profilePictureUrl }) => (
                    <>

                        {/* <div className="text-gray-700">You sent a friend request to</div> */}

                        <li key={id} className="flex items-center justify-between bg-blue-100 border-none py-3 px-3 mt-1 mb-5 rounded-lg shadow-md borde">

                            <div className='w-full'>
                                <div className=' flex items-center justify-between mb-4'>
                                    <div className=' flex items-center'>
                                        <img src={profilePictureUrl || "https://picsum.photos/200/300"} className='w-12 h-12 rounded-full' alt="profile picture" />
                                        <h1 className='text-md font-semibold text-dark-blue text-left ps-3'>{username}</h1>
                                    </div>
                                </div>

                                <button
                                    onClick={() => acceptFriendRequest(id)}
                                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-lg">
                                    Accept
                                </button>
                                <button
                                    onClick={() => removeFriendRequest(id)}
                                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg ms-4">
                                    Remove
                                </button>


                            </div>

                            {/* <div className="text-gray-700">You received a friend request from User {id}</div> */}

                        </li>
                    </>
                ))}
                {/* // ) : (

                //     <li className="text-gray-500">No received friend requests</li>
                // )} */}
            </ul>

            {/* Divider */}
            {/* <div className="my-6 border-t border-gray-300"></div> */}

            {/* Friend Requests Sent Section */}
            {/* <h3 className="text-xl font-semibold text-gray-800 mb-4">Friend Requests Sent</h3> */}
            <ul className="mx-5 my-2">
                {/* {sentUsersData.length > 0 ? ( */}
                {sentUsersData.map(({ id, username, profilePictureUrl }) => (
                    <>
                        <div className="text-gray-700">You sent a friend request to</div>

                        <li key={id} className="flex items-center justify-between bg-blue-100 border-none py-3 px-3 mt-1 mb-5 rounded-lg shadow-md border">

                            <div className='w-full'>
                                <div className=' flex items-center justify-between'>

                                    <div className=' flex items-center'>
                                        <img src={profilePictureUrl || "https://picsum.photos/200/300"} className='w-12 h-12 rounded-full' alt="profile picture" />
                                        <h1 className='text-md font-semibold text-dark-blue text-left ps-3'>{username}</h1>
                                    </div>

                                    <button
                                        onClick={() => cancelFriendRequest(id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg">
                                        Cancel
                                    </button>

                                </div>
                            </div>

                        </li>
                    </>
                ))}
                {/* ) : (
                    <li className="text-gray-500">No sent friend requests</li>
                )} */}
            </ul>


            {/* Friend Request History
            <h3>Friend Request History</h3>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>
                        {notification.type === "friendRequestAccepted" && (
                            <div className=' bg-gray-200'>
                                <p>Friend request accepted from {notification.from || notification.to} on ${new Date(notification.timestamp.seconds * 1000).toLocaleString()}</p>
                            </div>
                        )}
                        {notification.type === "friendRequestRemoved" &&
                            `Friend request removed from User ${notification.from || notification.to} on ${new Date(notification.timestamp.seconds * 1000).toLocaleString()}`
                        }
                        {notification.type === "friendRequestCancelled" &&
                            `Friend request cancelled to/from User ${notification.from || notification.to} on ${new Date(notification.timestamp.seconds * 1000).toLocaleString()}`
                        }
                    </li>
                ))}
            </ul> */}

             {/* Friend Request History */}
             {/* <h3>Friend Request History</h3> */}
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>

                        {(notification.type === "friendRequestAccepted" && notification.to) &&  (
                            <div className='bg-blue-50 border-none py-3 px-3 mt-1 mb-3 mx-3 rounded-lg shadow-md border'>
                                <p>Friend request accepted by {getUsername(notification.to)} on {new Date(notification.timestamp.seconds * 1000).toLocaleString()}</p>
                                {/* <p>Friend request accepted from {getUsername(notification.from)} on {new Date(notification.timestamp.seconds * 1000).toLocaleString()}</p> */}
                            </div>
                        )}

                        {(notification.type === "friendRequestAccepted" && notification.from) &&  (
                            <div className='bg-blue-50 border-none py-3 px-3 mt-1 mb-3 mx-3 rounded-lg shadow-md border'>
                                <p>Friend request accepted by you on {new Date(notification.timestamp.seconds * 1000).toLocaleString()}</p>
                                {/* <p>Friend request accepted from {getUsername(notification.from)} on {new Date(notification.timestamp.seconds * 1000).toLocaleString()}</p> */}
                            </div>
                        )}

                        {(notification.type === "friendRequestRemoved" && notification.to) &&  (
                            <div className='bg-blue-50 border-none py-3 px-3 mt-1 mb-3 mx-3 rounded-lg shadow-md border'>
                                <p>Friend request removed by {getUsername(notification.to)} on {new Date(notification.timestamp.seconds * 1000).toLocaleString()}</p>
                                {/* <p>Friend request accepted from {getUsername(notification.from)} on {new Date(notification.timestamp.seconds * 1000).toLocaleString()}</p> */}
                            </div>
                        )}

                        {(notification.type === "friendRequestRemoved" && notification.from) &&  (
                            <div className='bg-blue-50 border-none py-3 px-3 mt-1 mb-3 mx-3 rounded-lg shadow-md border'>
                                <p>Friend request removed by you on {new Date(notification.timestamp.seconds * 1000).toLocaleString()}</p>
                                {/* <p>Friend request accepted from {getUsername(notification.from)} on {new Date(notification.timestamp.seconds * 1000).toLocaleString()}</p> */}
                            </div>
                        )}

                        {(notification.type === "friendRequestCancelled" && notification.to) &&  (
                            <div className='bg-blue-50 border-none py-3 px-3 mt-1 mb-3 mx-3 rounded-lg shadow-md border'>
                                <p>Friend request cancelled by you on {new Date(notification.timestamp.seconds * 1000).toLocaleString()}</p>
                                {/* <p>Friend request accepted from {getUsername(notification.from)} on {new Date(notification.timestamp.seconds * 1000).toLocaleString()}</p> */}
                            </div>
                        )}

                        {(notification.type === "friendRequestCancelled" && notification.from) &&  (
                            <div className='bg-blue-50 border-none py-3 px-3 mt-1 mb-3 mx-3 rounded-lg shadow-md border'>
                                <p>Friend request cancelled by {getUsername(notification.from)} on {new Date(notification.timestamp.seconds * 1000).toLocaleString()}</p>
                                {/* <p>Friend request accepted from {getUsername(notification.from)} on {new Date(notification.timestamp.seconds * 1000).toLocaleString()}</p> */}
                            </div>
                        )}


{/* 
                        {notification.type === "friendRequestRemoved" && (
                            <div className='bg-gray-200'>
                                <p>Friend request removed by {getUsername(notification.to)} on {new Date(notification.timestamp.seconds * 1000).toLocaleString()}</p>
                                <p>Friend request removed by {getUsername(notification.from)} on {new Date(notification.timestamp.seconds * 1000).toLocaleString()}</p>
                            </div>
                        )} */}
                        {/* {notification.type === "friendRequestCancelled" && (
                            <div className='bg-gray-200'>
                                <p>Friend request cancelled by {getUsername(notification.to)} on {new Date(notification.timestamp.seconds * 1000).toLocaleString()}</p>
                                <p>Friend request cancelled by {getUsername(notification.from)} on {new Date(notification.timestamp.seconds * 1000).toLocaleString()}</p>
                            </div>
                        )} */}
                    </li>
                ))}
            </ul>

        </div>

    );
}