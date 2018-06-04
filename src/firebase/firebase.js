// firebase config
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCgOfN0XVCQnD9iyYrTyibQwLwb5mixOWo",
    authDomain: "react-firebase-d774c.firebaseapp.com",
    databaseURL: "https://react-firebase-d774c.firebaseio.com",
    projectId: "react-firebase-d774c",
    storageBucket: "react-firebase-d774c.appspot.com",
    messagingSenderId: "734500125634"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  
  const db = firebase.database();
  const auth = firebase.auth();
  
  export {
    auth,
    db
  };