import {createSlice} from '@reduxjs/toolkit';
// import type {User} from '../services/userAuthServices';
// import {RootState} from '../store';

const slice = createSlice({
  name: 'contentReducer',
  initialState: {
    categories: [],
    services: [],
    locations: [],
    models: [],
    allmodels: [],
  },
  reducers: {
    setCategories: (state, {payload: {categories}}) => {
      // console.log(categories);
      state.categories = categories;
    },
    setModels: (state, {payload: {models}}) => {
      // console.log(categories);
      state.models = models;
    },
    setAllModels: (state, {payload: {models}}) => {
      // console.log(categories);
      state.allmodels = models;
    },
  },
});

export const {setCategories, setModels, setAllModels} = slice.actions;

export default slice.reducer;

export const selectCategories = state => state.contentReducer.categories;
export const selectModels = state => state.contentReducer.models;
export const selectAllModels = state => state.contentReducer.allmodels;
