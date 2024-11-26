// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// // https://firebase.google.com/docs/web/setup#available-libraries

// //extra
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDhCBKvv7oq6BB6nGRHfZtMw1neVtMHP7E",
//   authDomain: "talkfusion-356a7.firebaseapp.com",
//   projectId: "talkfusion-356a7",
//   storageBucket: "talkfusion-356a7.appspot.com",
//   messagingSenderId: "1079474661964",
//   appId: "1:1079474661964:web:3520e4a0c8bdb6480b62e9",
//   measurementId: "G-EN3V2DLQ3J"
// };


// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// //extra
// const auth = getAuth(app);
// const db = getFirestore(app);


// export default app;


// //extra
// export { auth, db };

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";








// //
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDhCBKvv7oq6BB6nGRHfZtMw1neVtMHP7E",
//   authDomain: "talkfusion-356a7.firebaseapp.com",
//   projectId: "talkfusion-356a7",
//   storageBucket: "talkfusion-356a7.appspot.com",
//   messagingSenderId: "1079474661964",
//   appId: "1:1079474661964:web:3520e4a0c8bdb6480b62e9",
//   measurementId: "G-EN3V2DLQ3J"
// };

// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// // // Initialize Auth and Firestore
// // const auth = getAuth(app);
// // const db = getFirestore(app);

// // Google Auth Provider
// // const googleProvider = new GoogleAuthProvider();


// //
// firebase.initializeApp(firebaseConfig);
// const Adb = firebase.firestore();

// export { Adb };

// // Export modules
// export default app;
// export { auth, db, googleProvider };


































// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDhCBKvv7oq6BB6nGRHfZtMw1neVtMHP7E",
//   authDomain: "talkfusion-356a7.firebaseapp.com",
//   projectId: "talkfusion-356a7",
//   storageBucket: "talkfusion-356a7.appspot.com",
//   messagingSenderId: "1079474661964",
//   appId: "1:1079474661964:web:3520e4a0c8bdb6480b62e9",
//   measurementId: "G-EN3V2DLQ3J"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // Initialize Auth and Firestore
// const auth = getAuth(app);
// const db = getFirestore(app);


// const googleProvider = new GoogleAuthProvider();


// // Export modules
// export { app, analytics, auth, db, googleProvider };



// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /users/{userId} {
//       allow read, write: if request.auth != null && request.auth.uid == userId;
//     }
//     match /messages/{messageId} {
//       allow read, write: if request.auth != null;
//     }
//      match /{document=**} {
//       allow read, write: if false;
//     }
//   }
// }


// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /users/{userId} {
//       allow read, write: if request.auth != null && request.auth.uid == userId;
//     }
//     match /messages/{messageId} {
//       allow read: if request.auth != null;
//       allow write: if request.auth != null && request.auth.uid != null;
//     }
//     match /{document=**} {
//       allow read, write: if false;
//     }
//   }
// }

// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     // Rule for individual user documents
//     match /users/{userId} {
//       allow read: if request.auth != null; // Allow read access to all authenticated users
//       allow write: if request.auth != null && request.auth.uid == userId; // Allow write access only to the user
//     }

//     // Rule for messages collection
//     match /messages/{messageId} {
//       allow read: if request.auth != null;
//       allow write: if request.auth != null && request.auth.uid != null;
//     }

//     // Rule for other documents
//     match /{document=**} {
//       allow read, write: if false;
//     }
//   }
// }
// service cloud.firestore {
//   match /databases/{database}/documents {
//     // Allow read access to all documents
//     match /translations/{document=**} {
//       allow read: if true;
//     }
//   }
// }




// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";
// import "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyDhCBKvv7oq6BB6nGRHfZtMw1neVtMHP7E",
//   authDomain: "talkfusion-356a7.firebaseapp.com",
//   projectId: "talkfusion-356a7",
//   storageBucket: "talkfusion-356a7.appspot.com",
//   messagingSenderId: "1079474661964",
//   appId: "1:1079474661964:web:3520e4a0c8bdb6480b62e9",
//   measurementId: "G-EN3V2DLQ3J"
// };

// firebase.initializeApp(firebaseConfig);

// const firestore = firebase.firestore();
// const auth = firebase.auth();
// const database = firebase.database();

// export { firestore, auth, database };


// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyDhCBKvv7oq6BB6nGRHfZtMw1neVtMHP7E",
//   authDomain: "talkfusion-356a7.firebaseapp.com",
//   projectId: "talkfusion-356a7",
//   storageBucket: "talkfusion-356a7.appspot.com",
//   messagingSenderId: "1079474661964",
//   appId: "1:1079474661964:web:3520e4a0c8bdb6480b62e9",
//   measurementId: "G-EN3V2DLQ3J"
// };

// const app = initializeApp(firebaseConfig);

// const firestore = getFirestore(app);
// const auth = getAuth(app);
// const database = getDatabase(app);

// export { firestore, auth, database };


// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getDatabase } from "firebase/database";
// import 'firebase/firestore';
// import firebase from 'firebase/app';

// const firebaseConfig = {
//   apiKey: "AIzaSyDhCBKvv7oq6BB6nGRHfZtMw1neVtMHP7E",
//   authDomain: "talkfusion-356a7.firebaseapp.com",
//   projectId: "talkfusion-356a7",
//   storageBucket: "talkfusion-356a7.appspot.com",
//   messagingSenderId: "1079474661964",
//   appId: "1:1079474661964:web:3520e4a0c8bdb6480b62e9",
//   measurementId: "G-EN3V2DLQ3J"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const firestore = firebase.firestore();

// // Initialize services
// const auth = getAuth(app);
// const db = getFirestore(app);
// const database = getDatabase(app);
// const googleProvider = new GoogleAuthProvider();

// export { auth, db,firestore,firebase, database, googleProvider };

// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDhCBKvv7oq6BB6nGRHfZtMw1neVtMHP7E",
  authDomain: "talkfusion-356a7.firebaseapp.com",
  projectId: "talkfusion-356a7",
  storageBucket: "talkfusion-356a7.appspot.com",
  messagingSenderId: "1079474661964",
  appId: "1:1079474661964:web:3520e4a0c8bdb6480b62e9",
  measurementId: "G-EN3V2DLQ3J"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const database = getDatabase(app);

const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider,database };
