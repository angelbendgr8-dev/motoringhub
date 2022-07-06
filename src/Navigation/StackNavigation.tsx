// In App.js in a new project

import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import {BottomTab} from './BottomTab';
import {MainStack} from '../utils/ParamList';
import {DrawerTab} from './Drawer';
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
      initialRouteName={'Dashboard'}>
      <Stack.Screen name="Dashboard" component={BottomTab} />
      <Stack.Screen name="Drawer" component={DrawerTab} />
    </Stack.Navigator>
  );
}

export default StackNavigation;
