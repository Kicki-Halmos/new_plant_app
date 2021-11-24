import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth';
import { getMessaging, getToken } from "firebase/messaging";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = firebase.initializeApp(clientCredentials);

export const setMessaging = () =>{
  const messaging = getMessaging(app);
  const token = getToken(messaging, { vapidKey: 'BJ53VUs2udCQxh9or7TWu9SnC_b4Ira-o7X7qo3qIkLb654Ia7DBfs93ToiYkHA-71iDcZOMxZYMsuCih-8jHS4'}).then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      console.log(currentToken)
      return currentToken;
      // ...
    } else {
      // Show permission request UI
      const status = Notification.requestPermission();
      console.log(status);

      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });
return token;
}




//export app;
export default firebase;
