import PlantForm from '../components/PlantForm';
import firebase from '../firebase/app';
import { useRouter } from 'next/router';

const Add = () => {
  const db = firebase.firestore();
  const router = useRouter();
  const addPlantHandler = async (plant) => {
    console.log(plant);
    if (plant.name === '') {
      alert('You must provide a name');
      return;
    } else {
      await db.collection('plants').doc().set(plant);
      router.push('/');
    }
  };
  return (
    <div className='sm:flex sm:justify-center'>
      <PlantForm
        formHandler={(plant) => addPlantHandler(plant)}
        initialValues={{
          name: '',
          water: 'Every Day',
          fertilizer: 'no',
          shower: 'no',
          interval: '1',
        }}
      />
    </div>
  );
};

export default Add;
