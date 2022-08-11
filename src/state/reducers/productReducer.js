import {createSlice} from '@reduxjs/toolkit';
// import type {User} from '../services/userAuthServices';
// import {RootState} from '../store';

const slice = createSlice({
  name: 'contentReducer',
  initialState: {
    cars: [],
    parts: [],
  },
  reducers: {
    setCars: (state, {payload: {cars}}) => {
      // console.log(categories);
      state.cars = cars;
    },
    setParts: (state, {payload: {parts}}) => {
      // console.log(categories);
      state.parts = parts;
    },
  },
});

export const {setCars, setParts} = slice.actions;

export default slice.reducer;

export const selectCars = state => state.productReducer.cars;
export const selectParts = state => state.productReducer.parts;
