import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


// Initialize Firebase with your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdkFqtvo8m41gKG-t8Q6ig1UNiy1_RM88",
    authDomain: "moodbanao.firebaseapp.com",
    databaseURL: "https://moodbanao-default-rtdb.firebaseio.com",
    projectId: "moodbanao",
    storageBucket: "moodbanao.appspot.com",
    messagingSenderId: "847722161738",
    appId: "1:847722161738:web:98a42472c525ad198628b3",
    measurementId: "G-LLCNZY7NNW"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export {firebase};