import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDdkFqtvo8m41gKG-t8Q6ig1UNiy1_RM88",
  authDomain: "moodbanao.firebaseapp.com",
  databaseURL: "https://moodbanao-default-rtdb.firebaseio.com",
  projectId: "moodbanao",
  storageBucket: "moodbanao.appspot.com",
  messagingSenderId: "847722161738",
  appId: "1:847722161738:web:e3d6680a660f5a758628b3",
  measurementId: "G-CVGVM9X7M6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
