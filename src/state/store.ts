import {configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
// import { PersistGate } from 'redux-persist/integration/react'
import {UserAuthApi} from './services/userAuth';
import {ContentApi} from './services/ContentService';
import userAuth from './reducers/userAuth';
import userRequest from './reducers/userRequest';
import contentReducer from './reducers/contentReducer';
import productReducer from './reducers/productReducer';
import {RequestApi} from './services/RequestService';
import {SettingApi} from './services/SettingsService';
import {ProductApi} from './services/ProductService';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['userAuth', 'userRequest'],
};

const reducers = combineReducers({
  userAuth,
  userRequest,
  contentReducer,
  productReducer,
  [ContentApi.reducerPath]: ContentApi.reducer,
  [ProductApi.reducerPath]: ProductApi.reducer,
  [RequestApi.reducerPath]: RequestApi.reducer,
  [UserAuthApi.reducerPath]: UserAuthApi.reducer,
  [SettingApi.reducerPath]: SettingApi.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'userauth/signOut') {
    // this applies to all keys defined in persistConfig(s)
    // store.removeItem('persist:root');

    state = {};
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      UserAuthApi.middleware,
      ContentApi.middleware,
      RequestApi.middleware,
      SettingApi.middleware,
      ProductApi.middleware,
    ]),
});
