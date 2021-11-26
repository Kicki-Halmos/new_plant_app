import Link from 'next/link';
import firebase from '../firebase/app';
import { useDispatch } from 'react-redux';
import { deletePlant } from '../store/plant-actions';
const PlantItem = (props) => {
  const db = firebase.firestore();
  const dispatch = useDispatch();

  const deleteItem = () => {
    //db.collection('plants').doc(props.id).delete();
    dispatch(deletePlant(props.id));
  };
  return (
    <div className='flex px-24 py-1 justify-between sm:w-1/4'>
      <Link href={`/${props.id}`}>
        {props.name}
        </Link>
      <button type='button' onClick={deleteItem} className='text-red-600'>
        Delete
      </button>
    </div>
  );
};

export default PlantItem;
