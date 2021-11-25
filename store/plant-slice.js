import { createSlice } from '@reduxjs/toolkit';

const plantSlice = createSlice({
  name: 'plant',
  initialState: {
    plantList: [],
    singlePlant: {},
  },
  reducers: {
    getPlantList(state, action) {
      state.plantList = action.payload.plantList;
    },

    addPlantItem(state, action) {
      state.plantList.push(action.payload.plantItem);
    },

    /*updatePlantItem(state, action) {
      const updatedList = state.plantList.map((item) => {
        item.id === action.payload.item.id ? action.payload.item : item;
      });
    },*/

    getSinglePlant(state, action) {
      state.singlePlant = action.payload.plantItem;
    },

    deletePlantItem(state, action) {
      state.plantList = state.plantList.filter(
        (item) => item.id !== action.payload.id
      );
    },

    clearPlantList(state, action) {
      state.plantList = [];
    },

    clearSinglePlant(state, actions) {
      state.singlePlant = {};
    },
  },
});

export const plantActions = plantSlice.actions;

export default plantSlice;
