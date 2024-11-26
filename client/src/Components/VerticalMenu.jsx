import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function VerticalMenu() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

    });
  }, []);
  console.log("current user", user);



  const [profilestatus, setProfileStatus] = useState(false);

  const ProfileView = () => {
    setProfileStatus(!profilestatus);
    //   alert("click")
    console.log(profilestatus);

  }

  return (
    <div className=' bg-dark-blue h-screen w-14 top-12 fixed flex justify-center'>

      {/* chats */}
      <div className='absolute top-8'>
        <Link to='/chats'>
          <i className="ri-chat-1-line text-white text-2xl p-2 rounded-md hover:bg-blue-700"></i>
        </Link>
      </div>

      {/* notification */}
      <div className='absolute top-20'>
        <Link to='/notification'>
          <i className="ri-notification-2-line text-white text-2xl p-2 rounded-md hover:bg-blue-700"></i>
        </Link>

      </div>

      {/* friends */}
      <div className='absolute top-32'>
        <Link to='/addfriend'>
          <i className="ri-group-line text-white text-2xl p-2 rounded-md hover:bg-blue-700"></i>
        </Link>
      </div>

      {/* archive */}
      <div className='absolute bottom-36'>
        <i className="ri-archive-line text-white text-2xl p-2 rounded-md hover:bg-blue-700"></i>
      </div>

      {/* settings */}
      <div className='absolute bottom-24'>
        <i className="ri-settings-2-line text-white text-2xl p-2 rounded-md hover:bg-blue-700"></i>
      </div>

      {user ? (
        <div className="absolute bottom-14 cursor-pointer" onClick={ProfileView}>
          <img src={user.profilePictureUrl || "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="} className='rounded-full w-8 h-8' alt="profilePic" />
        </div>
      ) : (
        <div className="absolute bottom-14 cursor-pointer" onClick={ProfileView}>
          <img src={"https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="} className='rounded-full w-8 h-8' alt="profilePic" />
        </div>
      )}

      {user ? (<div className="relative z-10">
        <div className={`absolute  w-2/5 top-0 left-3 rounded-md overflow-hidden shadow-lg shadow-gray-500 transition-all flex`}>

          <div className='bg-dark-blue px-2 pt-2 flex-[8]'>
            <button className='py-1 ps-4 pe-5 rounded-md hover:bg-blue-500 text-white' onClick={ProfileView}><i class="ri-close-line"></i> Close</button>
          </div>

          <div className='bg-blue-300 p-4 flex-auto'>
            <div className='justify-center flex'>
              <img src={user.profilePictureUrl || "https://picsum.photos/200/300"} className='w-24 h-24 rounded-full' alt="profile picture" />
            </div>

            <div className='justify-center flex mt-4'>
              <p className='text-dark-blue font-bold text-xl '>{user.username}</p>
            </div>

            <div className='mt-8 w-[240px]'>
              <p className='text-[15px] text-blue-900'>About</p>
              <p className='text-dark-blue font-medium text-[14px]'>{user.bio}</p>
            </div>

            <div className='mt-4'>
              <p className='text-[15px] text-blue-900'>Email</p>
              <p className='text-dark-blue font-medium  text-[14px]'>{user.mail}</p>
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
      ) : (<p>Lorem</p>)}


      {/* profile picture */}

    </div>
  )
}
