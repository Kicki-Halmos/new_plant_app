import { useState, useEffect } from 'react';
import {
    getDocs,
    where,
    collection,
    query,
  } from 'firebase/firestore';
  import firebase from '../firebase/app.js'
  import Notification from '../components/Notification';
  import { useAuthState } from 'react-firebase-hooks/auth';

const today = () => {
    const db = firebase.firestore();
    const auth = firebase.auth();
    const [user, userLoading, userError] = useAuthState(auth);
    const [notifications, setNotifications] = useState([]);

    useEffect(()=>{
        const displayNotificiations = async () => {
            const q = query(
              collection(db, 'notifications'),
              where('userId', '==', user.uid)
            );
            const querySnapshot = await getDocs(q);
            const notifications = [];
            querySnapshot.forEach((doc) => {
              notifications.push(doc.data());
            });
            setNotifications(notifications);
            console.log(notifications);
          };
          if(user){
            displayNotificiations();
          }
         
    },[user])
 
    return (
        <>
        {notifications !== [] && notifications[0] && (
            <Notification list={notifications} />
          )}
          </>
    )

}



export default today;