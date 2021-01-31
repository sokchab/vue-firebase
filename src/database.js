import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyBSdk2K3Cdrfv4GXikT-BAKzVPeSUJSRbI",
    authDomain: "vue-firebase-bcbf8.firebaseapp.com",
    projectId: "vue-firebase-bcbf8",
    storageBucket: "vue-firebase-bcbf8.appspot.com",
    messagingSenderId: "175846020730",
    appId: "1:175846020730:web:26ae6ec1e547d3be5d0dc3"
  };


  const db = firebase.initializeApp(firebaseConfig);


  export default db;