import React, { useEffect, useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Login() {

  const [error1, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.pwd.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/chats');

    } catch (error) {
      if (error.code === 'auth/invalid-login-credentials') {
        setError('Wrong Username or Password');
        // console.log(error1);
        // alert(error1)
      } else {
        setError('Error : ' + error.message);
        // alert(error1)
      }
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
        await setDoc(userDocRef, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        });
      }
      navigate('/chats');
    } catch (error) {
      setError('Error signing in with Google: ' + error.message);
      // alert(error1)
    }
  };

  return (
    <div className='bg-light-blue h-screen'>
      <h2 className='text-center pt-36 pb-12 text-4xl font-bold'>Login</h2>

      <form onSubmit={handleSubmit}>

        <input type="email" name="email" id="email" className='m-auto flex ps-3 my-4 w-96 h-14 rounded-lg text-md outline-none' placeholder='Email' required autoComplete='off'/>
        <input type="password" name="pwd" id="pwd" className='m-auto flex ps-3 w-96 h-14 rounded-lg text-md outline-none' placeholder='Password' required />

        <button type='submit' className='bg-dark-blue m-auto flex mt-14 w-96 justify-center py-3 text-lg font-bold text-white rounded-3xl hover:bg-blue-700 ease-in-out duration-500'>
          Login
        </button>
        <button type='button' onClick={handleGoogleSignIn} className='bg-dark-blue m-auto flex mt-4 w-96 justify-center py-3 text-lg font-bold text-white rounded-3xl hover:bg-red-700 ease-in-out duration-500 tracking-wider'>
          Continue With Google
        </button>

      </form>

      <p className='text-center mt-4'>Don't Have an Account? <Link to="/register" className='text-blue-500'>Register</Link></p>

      {error1 && <p className='text-red-500'>{error1}</p>}
    </div>
  );
}
