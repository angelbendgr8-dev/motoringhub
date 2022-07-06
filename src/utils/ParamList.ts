// import { NavigatorScreenParams } from '@react-navigation/native';

export type MainStack = {
  Dashboard: undefined;
  Drawer: undefined;
};

export type BottomTabList = {
  Home: undefined;
  Services: undefined;
  Deals: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStack {}
  }
}
