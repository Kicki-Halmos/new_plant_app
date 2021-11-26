import { useState } from 'react';
import firebase from '../firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
const PlantForm = ({ formHandler, initialValues }) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [name, setName] = useState(initialValues.name);
  const [waterValue, setWaterValue] = useState(initialValues.interval);
  const [water, setWater] = useState(initialValues.water);
  const [fertilizer, setFertilizer] = useState(initialValues.fertilizer);
  const [shower, setShower] = useState(initialValues.shower);

  const waterHandler = (event) => {
    event.preventDefault();
    const selectedIndex = event.target.options.selectedIndex;
    const text = event.target.options[selectedIndex].text;
    setWaterValue(event.target.value);
    setWater(text);
  };

  return (
    <div className='flex flex-col text-text text-left px-8 py-2 sm:p-8 sm:w-2/4 sm:text-lg'>
      <label className="sm:mb-2" htmlFor='name'>Name</label>
      <input
        className='rounded mb-4 px-2 py-1 sm:py-2 focus:outline-none focus:border focus:border-pink-800'
        type='text'
        id='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label className="sm:mb-2" htmlFor='water'>Water</label>
      <select
        value={waterValue}
        onChange={waterHandler}
        className='rounded mb-4 px-2 py-1 sm:py-2 bg-white focus:outline-none focus:border focus:border-pink-800'
        name='water'
        id='water'
      >
        <option value='1'>Every Day</option>
        <option value='2'>Every Second Day</option>
        <option value='3'>Every Third Day</option>
        <option value='4'>Every Fourth Day</option>
        <option value='7'>Once A Week</option>
        <option value='10'>Every Tenth Day</option>
        <option value='14'>Once Every Other Week</option>
        <option value='30'>Once A Month</option>
      </select>
      <label className="sm:mb-2" htmlFor='fertilizer'>Fertilizer?</label>
      <select
        value={fertilizer}
        onChange={(e) => {
          setFertilizer(e.target.value);
        }}
        className='rounded mb-4 px-2 py-1 sm:py-2 bg-white focus:outline-none focus:border focus:border-pink-800'
        name='fertilizer'
        id='fertilizer'
      >
        <option value='no'>No</option>
        <option value='yes'>Yes</option>
      </select>
      <label className="sm:mb-2" htmlFor='shower'>Shower?</label>
      <select
        value={shower}
        onChange={(e) => {
          setShower(e.target.value);
        }}
        className='rounded mb-4 px-2 py-1 sm:py-2 bg-white focus:outline-none focus:border focus:border-pink-800'
        name='shower'
        id='shower'
      >
        <option value='no'>No</option>
        <option value='yes'>Yes</option>
      </select>
      <input
        className='rounded bg-white p-2 border border-text'
        type='button'
        value='SAVE'
        onClick={() =>
          formHandler({
            name,
            water,
            fertilizer,
            shower,
            interval: waterValue,
            userId: user.uid,
          })
        }
      />
    </div>
  );
};

export default PlantForm;
