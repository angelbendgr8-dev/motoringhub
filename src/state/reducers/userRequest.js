import {createSlice} from '@reduxjs/toolkit';
// import type {User} from '../services/userAuthServices';
// import {RootState} from '../store';

const slice = createSlice({
  name: 'userrequest',
  initialState: {
    requests: [],
  },
  reducers: {
    addRequest: (state, {payload: {request}}) => {
      state.request = {...state.requests, request};
    },
  },
});

export const {addRequest} = slice.actions;

export default slice.reducer;

export const selectRequest = state => state.userRequest.request;
