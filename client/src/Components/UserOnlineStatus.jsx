// src/hooks/useOnlineStatus.js

import { useEffect } from 'react';
import { db, auth } from '../firebase'; // Adjust the path according to your project structure
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const updateOnlineStatus = async (userId, status) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    online: status,
    lastActive: serverTimestamp()
  });
};

const setOffline = async (userId) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    online: false,
    lastActive: serverTimestamp()
  });
};

let inactivityTimeout;

const handleUserInactivity = (userId) => {
  clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(() => {
    setOffline(userId);
  }, 10000); // Set timeout duration (e.g., 30 seconds)
};

const useOnlineStatus = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        updateOnlineStatus(user.uid, true); // Set user as online
        handleUserInactivity(user.uid);
        
        // Reset timer on user activity
        const handleActivity = () => handleUserInactivity(user.uid);
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keypress', handleActivity);

        return () => {
          clearTimeout(inactivityTimeout);
          window.removeEventListener('mousemove', handleActivity);
          window.removeEventListener('keypress', handleActivity);
        };
      } else {
        const currentUser = auth.currentUser;
        if (currentUser) {
          updateOnlineStatus(currentUser.uid, false); // Set user as offline on logout
        }
      }
    });

    return () => {
      unsubscribe();
      clearTimeout(inactivityTimeout);
    };
  }, []);
};

export default useOnlineStatus;
