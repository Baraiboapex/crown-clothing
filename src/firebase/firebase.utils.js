import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBbnm6MRGk2byjg5Q5rvhO5UcgZEm9UVpc",
    authDomain: "crown-db-4d8be.firebaseapp.com",
    databaseURL: "https://crown-db-4d8be.firebaseio.com",
    projectId: "crown-db-4d8be",
    storageBucket: "crown-db-4d8be.appspot.com",
    messagingSenderId: "286265084362",
    appId: "1:286265084362:web:ea28d9cb86b62ea84aa733",
    measurementId: "G-9DQWDEQ84P"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      }catch(error){
        console.log('error createing user', error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;