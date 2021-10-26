import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "crown-db-b2e14.firebaseapp.com",
    projectId: "crown-db-b2e14",
    storageBucket: "crown-db-b2e14.appspot.com",
    messagingSenderId: "320808489498",
    appId: "1:320808489498:web:67350790fe1950b78b37a3",
    measurementId: "G-D70MM3XDEG"
  };

 
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export const createUserProfileDocument = async(userAuth, additionalData) => {
      if (!userAuth) return;
      const userRef = firestore.doc(`users/${userAuth.uid}`);

      const snapshot = await userRef.get();

      if(!snapshot.exists) {
          const {displayName, email} = userAuth;
          const createdAt = new Date();

          try {
              await userRef.set({
                  displayName,
                  email,
                  createdAt,
                  ...additionalData
              })
          } catch (error) {
              console.log('error creating user', error.message);
          }
      }

      return userRef;
  }

  export default firebase;
