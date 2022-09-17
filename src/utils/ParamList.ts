// import { NavigatorScreenParams } from '@react-navigation/native';

import {Service} from '../pages/Category/Services';

export type MainStack = {
  Dashboard: undefined;
  Drawer: undefined;
  ServiceDetails: {
    service: Service;
  };
  RequestService: {service: Service};
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  RequestLocation: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  AboutCar: undefined;
  CarMaker: undefined;
  CarModel: undefined;
  CarDetails: undefined;
  Summary: undefined;
  UploadCar: undefined;
  ProductDetail: undefined;
  SpareDetail: undefined;
};

export type BottomTabList = {
  Home: undefined;
  Services: undefined;
  SellCar: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStack {}
  }
}
