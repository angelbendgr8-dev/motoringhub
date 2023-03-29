import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MarketTabBar} from './MarketTabBar';
import Cars from './Cars';
import Parts from './Parts';
import Box from '../../Components/Box';
import Header from '../../Components/Header';
import {useNavigation} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

export function MarketTabs({}) {
  const {navigate} = useNavigation();
  return (
    <Box flex={1}>
      <Header
        leftIcon={true}
        text={'Market Place'}
        rightButtonClicked={() => navigate('Search')}
        rightIcon={true}
      />
      <Tab.Navigator
        tabBar={props => <MarketTabBar {...props} />}
        style={{flex: 1}}>
        <Tab.Screen name="Cars" component={Cars} />
        <Tab.Screen name="Spare Parts" component={Parts} />
      </Tab.Navigator>
    </Box>
  );
}
