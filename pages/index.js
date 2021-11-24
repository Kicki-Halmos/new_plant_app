import Link from 'next/link';
import firebase from '../firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Auth from '../components/Auth';
import React from 'react';
import PlantItem from '../components/PlantItem';
import Notification from '../components/Notification';
import { fetchPlantList } from '../store/plant-actions';
import { setMessaging } from '../firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';
import {
  doc,
  setDoc,
  getDocs,
  where,
  collection,
  query,
} from 'firebase/firestore';

export default function Home(props) {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const dispatch = useDispatch();
  const plantList = useSelector((state) => state.plant.plantList);
  const [user, userLoading, userError] = useAuthState(auth);
  const [notifications, setNotifications] = useState([]);

  //const isMounted = useRef(false);

  const logoutHandler = () => {
    auth.signOut();
  };

  useEffect(() => {
    //isMounted.current = true;
    const getMessages = async () => {
      const token = await setMessaging();
      setDoc(doc(db, 'users', user.uid), { token: token }, { merge: true });
      const messaging = getMessaging();
      onMessage(messaging, (payload) => {
        alert(
          payload.notification.title +
            ' these plants needs to be watered: ' +
            payload.notification.body
        );
      });
    };
    const getData = () => {
      firebase.auth().onAuthStateChanged((user) => {
        dispatch(fetchPlantList(user.uid));
      });
    };
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
    if (user) {
      getMessages();
      getData();
      displayNotificiations();
    }
    return () => {
      //isMounted.current = false;
    };
  }, [user]);

  return (
    <>
      {!user && <Auth />}
      {user && (
        <div className='min-h-5/6 flex flex-col justify-between bg-bg'>
          {notifications !== [] && notifications[0] && (
            <Notification list={notifications} />
          )}
          <div className=''>
            <div className='flex justify-center text-2xl mb-4'>
              <p className='mr-2'>Add a plant</p>
              <Link href='/add'> + </Link>
            </div>
            {!plantList && plantList === [] && <p>Loading...</p>}
            {plantList !== [] && (
              <ul className="mb-4">
                {plantList.map((plant) => {
                  return (
                    <PlantItem key={plant.id} name={plant.name} id={plant.id} />
                  );
                })}
              </ul>
            )}
          </div>
          <button
            onClick={logoutHandler}
            className='rounded bg-white p-2 border border-text px-10'
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
