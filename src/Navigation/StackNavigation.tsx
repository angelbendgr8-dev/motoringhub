// In App.js in a new project

import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import {BottomTab} from './BottomTab';
import {MainStack} from '../utils/ParamList';
import {DrawerTab} from './Drawer';
import ServiceDetails from '../pages/Category/ServiceDetails';
import RequestService from '../pages/Category/RequestService';
import Login from '../pages/Authentication/Login';
import ForgotPassword from '../pages/Authentication/ForgotPassword';
import Register from '../pages/Authentication/Register';
import RequestLocation from '../pages/Category/RequestLocation';
import EditProfile from '../pages/Account/EditProfile';
import ChangePassword from '../pages/Account/ChangePassword';
import About from '../pages/Sell/About';
import CarMaker from '../pages/Sell/CarMaker';
import CarModel from '../pages/Sell/CarModel';
import CarDetails from '../pages/Sell/CarDetails';
import Summary from '../pages/Sell/Summary';
import UploadCar from '../pages/Sell/UploadCar';
const Stack = createNativeStackNavigator<MainStack>();

function StackNavigation() {
  React.useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 3000);
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Login'}>
      <Stack.Screen name="Dashboard" component={BottomTab} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      <Stack.Screen name="RequestService" component={RequestService} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Drawer" component={DrawerTab} />
      <Stack.Screen name="RequestLocation" component={RequestLocation} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="AboutCar" component={About} />
      <Stack.Screen name="CarMaker" component={CarMaker} />
      <Stack.Screen name="CarModel" component={CarModel} />
      <Stack.Screen name="CarDetails" component={CarDetails} />
      <Stack.Screen name="Summary" component={Summary} />
      <Stack.Screen name="UploadCar" component={UploadCar} />
    </Stack.Navigator>
  );
}

export default StackNavigation;
