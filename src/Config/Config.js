import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDfAQiDGnKL2wTly1A8TOGYIYv4asu8FD0",
    authDomain: "ecommerce-app-reactjs.firebaseapp.com",
    projectId: "ecommerce-app-reactjs",
    storageBucket: "ecommerce-app-reactjs.appspot.com",
    messagingSenderId: "195075253395",
    appId: "1:195075253395:web:5513a60333582942e31966",
    measurementId: "G-NLNVSM8QZ1"
  };
firebase.initializeApp(firebaseConfig);

const auth=firebase.auth()
const fs=firebase.firestore()
const storage=firebase.storage()

export {auth,fs,storage}