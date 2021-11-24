import { configureStore } from '@reduxjs/toolkit';
import plantSlice from './plant-slice';

const store = configureStore({
    reducer:{
        plant: plantSlice.reducer
    }
})

export default store;