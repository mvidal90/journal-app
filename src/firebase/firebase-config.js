import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA1bry939hMvGCB4icsBZz4mmDSU3kAsJE",
    authDomain: "react-apps---curso.firebaseapp.com",
    projectId: "react-apps---curso",
    storageBucket: "react-apps---curso.appspot.com",
    messagingSenderId: "36747933905",
    appId: "1:36747933905:web:122ca2988b6518f971edf0",
    measurementId: "G-9M0P1RK4EL"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export{
    db,
    googleAuthProvider,
    firebase
}
