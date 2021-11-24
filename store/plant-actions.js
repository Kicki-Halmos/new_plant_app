import { plantActions } from './plant-slice';
import firebase from '../firebase/app';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const db = firebase.firestore();

export const fetchPlantList = (id) => async (dispatch) => {
  const fetchData = async () => {
    const list = [];
    const q = query(collection(db, 'plants'), where('userId', '==', id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let plant = {
        id: doc.id,
        name: doc.data().name,
        water: doc.data().water,
        fertilizer: doc.data().fertilizer,
        shower: doc.data().shower,
      };
      list.push(plant);
    });
    return list;
  };

  try {
    const plantList = await fetchData();
    dispatch(plantActions.getPlantList({ plantList }));
  } catch (error) {
    console.log(error);
  }
};

export const updatePlantItem = (id, plant) => async (dispatch) => {
  const fetchData = async () => {
    await setDoc(doc(db, 'plants', id), plant);
    const q = query(doc(db, 'plants', id));
    const snapShot = await getDoc(q);
    const item = snapShot.data();
    console.log(item);
    return item;
  };
  try {
    const plantItem = await fetchData();
    dispatch(plantActions.getSinglePlant({ plantItem }));
  } catch (error) {
    console.log(error);
  }
};

export const fetchPlantItem = (id) => async (dispatch) => {
  const fetchData = async () => {
    const q = query(doc(db, 'plants', id));
    const snapShot = await getDoc(q);
    const item = snapShot.data();
    return item;
  };
  try {
    const plantItem = await fetchData();
    dispatch(plantActions.getSinglePlant({ plantItem }));
  } catch (error) {
    console.log(error);
  }
};

export const deletePlant = (id) => async (dispatch) => {
  console.log(id);
  const fetchData = async () => {
    await deleteDoc(doc(db, 'plants', id));
  }

  try {
    await fetchData();
    dispatch(plantActions.deletePlantItem({id}))
  } catch (error) {
    console.log(error);
  }
}
