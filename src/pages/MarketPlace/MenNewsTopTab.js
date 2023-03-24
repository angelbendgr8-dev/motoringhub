import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MenNewsTabBar} from './MenNewsTabBar';
import Latest from './Latest';
import Tickets from './Tickets';
import MatchReport from './MatchReport';

const Tab = createMaterialTopTabNavigator();

export function MenNewsTopTab({}) {
  return (
    <Tab.Navigator
      tabBar={props => <MenNewsTabBar {...props} />}
      style={{flex: 1}}>
      <Tab.Screen name="Latest" component={Latest} />
      <Tab.Screen name="Ticket News" component={Tickets} />
      <Tab.Screen name="Match Report" component={MatchReport} />
    </Tab.Navigator>
  );
}
