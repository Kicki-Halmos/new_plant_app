import firebase from '../firebase/app';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PlantForm from '../components/PlantForm';
import { fetchPlantItem, updatePlantItem } from '../store/plant-actions';

const Detail = () => {
  const [update, setUpdate] = useState(false);
  const router = useRouter();
  const id = router.query.plantId;
  const db = firebase.firestore();
  const dispatch = useDispatch();
  const singleItem = useSelector((state) => state.plant.singlePlant);

  useEffect(() => {
    dispatch(fetchPlantItem(id));
  }, [id]);

  const updatePlantHandler = async (
  plant
  ) => {  
      await dispatch(
      updatePlantItem(id, plant)
    );
    setUpdate(false);
  };

  return (
    <div>
      {singleItem && !update && (
        <div className='grid grid-cols-2 px-12 text-text'>
          <p>Name:</p>
          <p>{singleItem.name}</p>
          <p>Water:</p>
          <p>{singleItem.water}</p>
          <p>Fertilizer?</p>
          <p className="capitalize">{singleItem.fertilizer}</p>
          <p>Shower?</p>
          <p className="capitalize">{singleItem.shower}</p>
          <button
            onClick={() => setUpdate(true)}
            className='col-span-2 mt-2 rounded bg-white p-2 border border-text'
          >
            Update
          </button>
        </div>
      )}
      {singleItem && update && (
        // todo: fix a back button
        <PlantForm
          formHandler={(name, water, fertilizer, shower, interval, userId) =>
            updatePlantHandler(
              name,
              water,
              fertilizer,
              shower,
              interval,
              userId
            )
          }
          initialValues={{
            name: singleItem.name,
            water: singleItem.water,
            fertilizer: singleItem.fertilizer,
            shower: singleItem.shower,
            interval: singleItem.interval,
          }}
        />
      )}
    </div>
  );
};

export default Detail;
