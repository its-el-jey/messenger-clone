import firebase from "firebase";

const firebaseApp = firebase.initializeApp ({
  apiKey: "AIzaSyCmtzqQwEFQIhFGSo8ULOM-fQ8njApG6M8",
  authDomain: "messenger-clone-def8a.firebaseapp.com",
  projectId: "messenger-clone-def8a",
  storageBucket: "messenger-clone-def8a.appspot.com",
  messagingSenderId: "203017735024",
  appId: "1:203017735024:web:729c2f7e23728370b2ddb5",
  measurementId: "G-EPB7731528"
});

const db = firebaseApp.firestore();

export default db;