import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Use this to initialize the firebase App
const firebaseConfig = {
  apiKey: "AIzaSyAE_qwjeKs0f8YI1GzOrN7CDbcJ_Q7WW8k",
  authDomain: "ezmarket-6fd5d.firebaseapp.com",
  projectId: "ezmarket-6fd5d",
  storageBucket: "ezmarket-6fd5d.appspot.com",
  messagingSenderId: "716884239360",
  appId: "1:716884239360:web:57b97b8df69a198264e4e5"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };