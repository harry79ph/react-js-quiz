import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAItH6vy_SHf4bL1FyzeQ83KOgm15imzL4",
  authDomain: "js-quiz-750ad.firebaseapp.com",
  databaseURL: "https://js-quiz-750ad-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "js-quiz-750ad",
  storageBucket: "js-quiz-750ad.appspot.com",
  messagingSenderId: "453035093656",
  appId: "1:453035093656:web:5ffab7b34f9d7f4d4baaed",
  measurementId: "G-JCNCMGRKS9"
};

firebase.initializeApp(firebaseConfig);

export default firebase;