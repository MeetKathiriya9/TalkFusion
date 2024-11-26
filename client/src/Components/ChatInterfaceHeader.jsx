import { arrayRemove, arrayUnion, doc, getDoc, updateDoc,onSnapshot, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';
import { Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import '../assets/css/USeronlineStatus.css'
import { format } from 'date-fns';

const ChatInterfaceHeader = () => {

  const [selectedUser, setSelectedUser] = useState(null);
  const [user, setUser] = useState(null);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const selectedUserId = queryParams.get('userId');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);


  useEffect(() => {
    if (selectedUserId) {
      const fetchUser = async () => {
        const userDoc = await getDoc(doc(db, 'users', selectedUserId));
        if (userDoc.exists()) {
          setSelectedUser(userDoc.data());

          console.log(selectedUser, "eeee");

        } else {
          console.log('No such user!');
        }
      };
      fetchUser();


    }
  }, [selectedUserId]);


  // console.log("selected user",selectedUserId);
  // console.log("selected user data",selectedUser);
  // console.log("selected user data", selectedUser.photoURL);



  const blockUser = async (blockedUserId) => {
    // toggleMenu();
    if (user) {
      const userRef = doc(db, 'users', user.uid);

      try {
        await updateDoc(userRef, {
          blocked: arrayUnion(blockedUserId),
        });
        console.log(`User ${blockedUserId} has been blocked.`);
      } catch (error) {
        console.error('Error blocking user:', error);
      }
    }
  };

  const unblockUser = async (blockedUserId) => {
    // toggleMenu();

    if (user) {
      const userRef = doc(db, 'users', user.uid);

      try {
        await updateDoc(userRef, {
          blocked: arrayRemove(blockedUserId),
        });
        console.log(`User ${blockedUserId} has been unblocked.`);
      } catch (error) {
        console.error('Error unblocking user:', error);
      }
    }
  };



  const [profilestatus, setProfileStatus] = useState(false);

  const ProfileView = () => {
    setProfileStatus(!profilestatus);
    // alert("click")
  }

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    return format(new Date(timestamp.seconds * 1000), 'hh:mm a');
  };


  

  //status changing

  const [isOnline, setIsOnline] = useState(false); // Local state to track user's online status
  const [loading, setLoading] = useState(true);    // Loading state to handle initial fetch

  useEffect(() => {
    let userDocRef = null;
    let unsubscribeSnapshot = null;

    const updateStatus = async (onlineStatus) => {
        if (userDocRef) {
            try {
                await updateDoc(userDocRef, {
                    online: onlineStatus,
                    lastActive: serverTimestamp()
                });
            } catch (error) {
                console.error("Error updating status: ", error);
            }
        }
    };

    const handleAuthChange = (user) => {
        if (user) {
            userDocRef = doc(db, "users", user.uid);

            // Listen to Firestore for real-time updates of the user's online status
            unsubscribeSnapshot = onSnapshot(userDocRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    setIsOnline(docSnapshot.data().online);
                    setLoading(false); // Stop loading once data is fetched
                }
            });

            // User is online when logged in
            updateStatus(true);

            // Detect page visibility changes
            const handleVisibilityChange = () => {
                if (document.visibilityState === 'visible') {
                    updateStatus(true);
                } else {
                    updateStatus(false);
                }
            };

            // Detect internet connectivity changes
            const handleOnlineStatus = () => {
                updateStatus(navigator.onLine);
            };

            

            // Add event listeners
            document.addEventListener('visibilitychange', handleVisibilityChange);
            window.addEventListener('online', handleOnlineStatus);
            window.addEventListener('offline', handleOnlineStatus);

            // Cleanup event listeners on unmount or logout
            return () => {
                document.removeEventListener('visibilitychange', handleVisibilityChange);
                window.removeEventListener('online', handleOnlineStatus);
                window.removeEventListener('offline', handleOnlineStatus);
            };

        } else {
            if (userDocRef) {
                updateStatus(false); // Set offline on logout
            }
        }
    };

    // Listen to authentication changes (login/logout)
    const unsubscribeAuth = onAuthStateChanged(auth, handleAuthChange);

    // Cleanup on unmount
    return () => {
        if (unsubscribeSnapshot) unsubscribeSnapshot(); // Stop listening to Firestore changes
        if (unsubscribeAuth) unsubscribeAuth();         // Stop listening to auth changes
    };
}, []);

  // console.log(onlineSt,"what???");
  // console.log(onlineStatus,"what??????????????");


  return (
    <>

      {selectedUser ? (

        <div>

          <div className='bg-blue-200 border-b-2 border-dark-blue pt-3 pb-2 px-4 flex items-center justify-between' onClick={ProfileView}>
            <div className='flex items-center '>
              <div>
                <img src={selectedUser.profilePictureUrl || "https://picsum.photos/200/300"} className='w-12 h-12 rounded-full' alt="profile picture" />
              </div>
              <div>
                <p className='ps-3 text-dark-blue font-medium'>{selectedUser.username}</p>
                {/* {loading ? (
                  <p>Loading status...</p>
                ) : (
                  <p className={isOnline ? "text-green-500" : "text-red-500"}>
                    {isOnline ? "Online" : "Offline"}
                  </p>
                )} */}
                <span className='ps-3 text-sm'>{selectedUser.online ? ("online") : (`last active at ${formatTimestamp(selectedUser.lastActive)}`)}</span>
              </div>
            </div>

            <div className='relative'>

              <button onClick={toggleMenu} className='flex items-center space-x-2 text-lg'>
                <span><i className="ri-more-2-fill text-xl font-bold text-dark-blue"></i></span>
              </button>

              {isMenuOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white text-dark-blue rounded-lg shadow-lg z-10'>
                  <ul className='py-2'>
                    <li>
                      <button
                        className='w-full text-left block px-4 py-2 hover:bg-blue-200'
                        onClick={() => blockUser(selectedUserId)}  // Call the blockUser function with the selected user's ID
                      >
                        Block
                      </button>


                    </li>
                    <li>
                      <button
                        className='w-full text-left block px-4 py-2 hover:bg-blue-200'
                        onClick={() => unblockUser(selectedUserId)}  // Call the unblockUser function
                      >
                        Unblock
                      </button>

                    </li>

                  </ul>
                </div>
              )}

            </div>

          </div>


          {/* selected user profile */}

          <div className="relative z-10">
            <div className={`absolute  w-2/5 ${profilestatus ? ("top-[-50px]") : ("top-[-540px]")} left-3 rounded-md overflow-hidden shadow-lg shadow-gray-500 transition-all flex`}>

              <div className='bg-dark-blue px-2 pt-2 flex-[8]'>
                <button className='py-1 ps-4 pe-5 rounded-md hover:bg-blue-500 text-white' onClick={ProfileView}><i class="ri-close-line"></i> Close</button>
              </div>

              <div className='bg-blue-300 p-4 flex-auto'>
                <div className='justify-center flex'>
                  <img src={selectedUser.profilePictureUrl || "https://picsum.photos/200/300"} className='w-24 h-24 rounded-full' alt="profile picture" />
                </div>

                <div className='justify-center flex mt-4'>
                  <p className='text-dark-blue font-bold text-xl '>{selectedUser.username}</p>
                </div>

                <div className='mt-8 w-[240px]'>
                  <p className='text-[15px] text-blue-900'>About</p>
                  <p className='text-dark-blue font-medium text-[14px]'>{selectedUser.bio}</p>
                </div>

                <div className='mt-4'>
                  <p className='text-[15px] text-blue-900'>Email</p>
                  <p className='text-dark-blue font-medium  text-[14px]'>{selectedUser.mail}</p>
                </div>

                <hr className='mt-3' />

                <div className='mt-2 flex'>
                  <button
                    className='w-full text-left block px-4 py-2 hover:bg-blue-200'
                    onClick={() => blockUser(selectedUserId)}  // Call the blockUser function with the selected user's ID
                  >
                    Block
                  </button>
                  <button
                    className='w-full text-left block px-4 py-2 hover:bg-blue-200'
                    onClick={() => unblockUser(selectedUserId)}  // Call the unblockUser function
                  >
                    Unblock
                  </button>
                </div>
              </div>



            </div>
          </div>


        </div>

      ) : (
        <div className='bg-blue-200 border-b-2 border-dark-blue pt-3 pb-2 h-[70px] px-4 flex items-center'>
          <h2>No user</h2>
        </div>
      )}

      {/* <div>
            <img src={selectedUser.photoURL || "https://picsum.photos/200/300" }  className='w-12 h-12 rounded-full' alt="profile picture" />
        </div>

        <div>
            <p className='ps-3 text-dark-blue font-medium'>{selectedUser.displayName}</p>
        </div> */}
    </>
  )
}


export default ChatInterfaceHeader;