import React, { useState, useEffect } from 'react';
import { database, auth } from '../firebase';

const UserPresence = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(setUser);
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      const userRef = database.ref(`users/${user.uid}`);
      userRef.set({ online: true });
      userRef.onDisconnect().set({ online: false });

      const usersRef = database.ref('users');
      const unsubscribeUsers = usersRef.on('value', snapshot => {
        const data = snapshot.val();
        setUsers(Object.keys(data || {}).map(key => ({ id: key, ...data[key] })));
      });

      return () => {
        unsubscribeUsers();
        userRef.set({ online: false });
      };
    }
  }, [user]);

  return (
    <div>
      <h2>Online Users</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.id} - {u.online ? 'Online' : 'Offline'}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPresence;
