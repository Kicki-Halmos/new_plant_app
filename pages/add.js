import PlantForm from '../components/PlantForm';
import firebase from '../firebase/app';
import { useRouter } from 'next/router';

const Add = () => {
  const db = firebase.firestore();
  const router = useRouter();
  const addPlantHandler = async (
    name,
    water,
    fertilizer,
    shower,
    interval,
    userId
  ) => {
    console.log(name);
    await db
      .collection('plants')
      .doc()
      .set(name, water, fertilizer, shower, interval, userId);
    router.push('/');
  };
  return (
    <PlantForm
      formHandler={(plant) =>
        addPlantHandler(plant)
      }
      initialValues={{
        name: '',
        water: 'Every Day',
        fertilizer: 'no',
        shower: 'no',
        interval: '1',
      }}
    />
  );
};

export default Add;
