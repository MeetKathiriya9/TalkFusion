import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { fetchSignInMethodsForEmail, signInWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';

const DeleteUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Add password state for user re-authentication
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDeleteUser = async () => {
    try {
        console.log("radhe radhe",email);
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
console.log(signInMethods,"hare krishna");
    //   if (signInMethods.length > 0) {
        // Re-authenticate the user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (user) {
          // Delete user from Firestore
          await deleteDoc(doc(db, 'users', user.uid));

          // Delete user from Firebase Authentication
          await deleteUser(user);

          setSuccess('User deleted successfully!');
        } else {
          setError('User not found.');
        }
    //   } else {
    //     setError('No user found with this email.');
    //   }
    } catch (error) {
      setError('Error deleting user: ' + error.message);
    }
  };

  return (
    <div className='pt-20'>
      <h1>Delete User</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleDeleteUser}>Delete User</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default DeleteUser;
