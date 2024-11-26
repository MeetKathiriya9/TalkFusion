import React, { useState } from 'react';
import { auth, db, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { setDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error1, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save the username to Firestore with a default photoURL
      await setDoc(doc(db, 'users', user.uid), {
        bio: "Hey, there i'm using TalkFusion",
        blocked: [], 
        chatList: [],
        lastActive: serverTimestamp(), 
        mail: email,
        online: false,
        profilePictureUrl: "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=",
        token: "",
        typing: "", 
        userId: user.uid,
        userPref: {}, 
        username: username 
        // displayName: username,
        // email,
        // photoURL: "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
      });

      alert('User registered successfully!');
      navigate('/chats');

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('The email address is already in use by another account.');
        console.log(error1);
        // alert(error1)
      } else {
        setError(error.message);
        // alert(error1)
      }
      // console.error('Error registering user:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // If user does not exist, add them to Firestore
        await setDoc(userDocRef, {
          bio: "Hey, there i'm using TalkFusion",
          blocked: [],
          chatList: [],
          lastActive: serverTimestamp(),
          mail: user.email,
          online: false,
          profilePictureUrl: user.profilePictureUrl,
          token: "",
          typing: "",
          userId: user.uid,
          userPref: {},
          username: user.username,
          // email: user.email,
          // displayName: user.displayName,
          // photoURL: user.photoURL
        });
      }

      navigate('/chats');
    } catch (error1) {
      setError('Error signing in with Google: ' + error1.message);
      // alert(error1)
    }
  };

  return (
    <div className='bg-light-blue h-screen'>
      <h2 className='text-center pt-36 pb-12 text-4xl font-bold'>Register</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='m-auto flex ps-3 my-4 w-96 h-14 rounded-lg text-md outline-none'
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='m-auto flex ps-3 my-4 w-96 h-14 rounded-lg text-md outline-none'
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='m-auto flex ps-3 w-96 h-14 rounded-lg text-md outline-none'
      />

      <button
        onClick={handleRegister}
        className='bg-dark-blue m-auto flex mt-14 w-96 justify-center py-3 text-lg font-bold text-white rounded-3xl hover:bg-blue-700 ease-in-out duration-500'
      >
        Register
      </button>
      <button
        type='button'
        onClick={handleGoogleSignIn}
        className='bg-dark-blue m-auto flex mt-4 w-96 justify-center py-3 text-lg font-bold text-white rounded-3xl hover:bg-red-700 ease-in-out duration-500 tracking-wider'
      >
        Continue with Google
      </button>

      <p className='text-center mt-4'>Already Have an Account? <Link to="/" className='text-blue-500'>Login</Link></p>


      {error1 && <p className='text-red-400'>{error1}</p>}
    </div>
  );
};

