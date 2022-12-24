import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBw7S__8gsXbY_oRC4FYXokOA0q0yy-lJ4",
  authDomain: "hercules-chat-446d5.firebaseapp.com",
  projectId: "hercules-chat-446d5",
  storageBucket: "hercules-chat-446d5.appspot.com",
  messagingSenderId: "155533425713",
  appId: "1:155533425713:web:3e28767cf46162b7682910",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
