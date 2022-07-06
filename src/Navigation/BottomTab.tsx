import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabBar from './BottomTabBar';
import Dashboard from '../pages/Dashboard';
import Account from '../pages/Account';
import {BottomTabList} from '../utils/ParamList';
import Category from '../pages/Category';
import Deals from '../pages/Deals';

const Tab = createBottomTabNavigator<BottomTabList>();

export function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
      }}
      tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Services" component={Category} />
      <Tab.Screen name="Deals" component={Deals} />
      <Tab.Screen name="Profile" component={Account} />
    </Tab.Navigator>
  );
}
