import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MarketTabBar} from './MarketTabBar';
import Cars from './Cars';
import Parts from './Parts';
import Box from '../../Components/Box';
import Header from '../../Components/Header';

const Tab = createMaterialTopTabNavigator();

export function MarketTabs({}) {
  return (
    <Box>
      <Header leftIcon={true} text={'Cars'} />
      <Tab.Navigator
        tabBar={props => <MarketTabBar {...props} />}
        style={{flex: 1}}>
        <Tab.Screen name="Cars" component={Cars} />
        <Tab.Screen name="Spare Parts" component={Parts} />
      </Tab.Navigator>
    </Box>
  );
}
