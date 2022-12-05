import {createSlice} from '@reduxjs/toolkit';
// import type {User} from '../services/userAuthServices';
// import {RootState} from '../store';
import _ from 'lodash';

const slice = createSlice({
  name: 'userauth',
  initialState: {
    user: null,
    token: null,
    guest: false,
    profilePics: null,
    push_token: null,
    search: [],
    like: [],
    cart: [],
    purchases: [],
    services: [],
    locations: [],
    defaultLocation: [],
  },
  reducers: {
    setCredentials: (state, {payload: {user, token}}) => {
      state.user = user;
      state.token = token;
    },
    setDefaultLocation: (state, {payload: {location}}) => {
      state.defaultLocation = location;
    },
    setToken: (state, {payload: {value}}) => {
      state.token = value;
    },
    updateCredentials: (state, {payload: {user}}) => {
      // console.log(user);
      state.user = user;
    },
    updatePics: (state, {payload: {pics}}) => {
      // console.log(user);
      state.profilePics = pics;
    },
    setPushToken: (state, {payload: {token}}) => {
      // console.log(user);
      state.push_token = token;
    },
    addLocation: (state, {payload: {location}}) => {
      if (_.size(state.locations) === 0) {
        location.id = _.size(state.locations);
        state.locations = [location];
      } else {
        location.id = _.size(state.locations);
        state.locations = [...state.locations, location];
      }
    },
    // updateEmail: (
    //   state,
    //   {payload: {user}}
    // ) => {
    //   // console.log(user);
    //   state.user = user;
    // },
    signOut: state => {},
  },
});

export const {
  setCredentials,
  updateCredentials,
  signOut,
  setToken,
  updatePics,
  setPushToken,
  addLocation,
  setDefaultLocation,
} = slice.actions;

export default slice.reducer;

export const selectCurrentUser = state => state.userAuth.user;
export const selectToken = state => state.userAuth.token;
export const selectPics = state => state.userAuth.profilePics;
export const selectPushToken = state => state.userAuth.push_token;
export const selectLocation = state => state.userAuth.locations;
export const selectDefaultLocation = state => state.userAuth.defaultLocation;
