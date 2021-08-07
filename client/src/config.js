import firebase  from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyDUL48mJS44ACn4zC4QM9AajGQvSnpGP28",
    authDomain: "serverbarber-1b646.firebaseapp.com",
    projectId: "serverbarber-1b646",
    storageBucket: "serverbarber-1b646.appspot.com",
    messagingSenderId: "424084813363",
    appId: "1:424084813363:web:946677570a088af649d546"
  };
  // Initialize Firebase
const app=  firebase.initializeApp(firebaseConfig);
export default app;