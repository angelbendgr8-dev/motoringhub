import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import StackNavigation from './StackNavigation';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useTheme} from '@shopify/restyle';

import {getHeaderTitle} from '@react-navigation/elements';
import Text from '../Components/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Box from '../Components/Box';

// ..

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        onPress={() => props.navigation.navigate('Profile')}
      />
      <DrawerItem
        label="Help"
        onPress={() => props.navigation.navigate('Profile')}
      />
      <DrawerItem
        label="Help"
        onPress={() => props.navigation.navigate('Profile')}
      />
      <DrawerItem
        label="Help"
        onPress={() => props.navigation.navigate('Profile')}
      />
    </DrawerContentScrollView>
  );
}

header: ({navigation, route, options}) => {
  const title = getHeaderTitle(options, route.name);

  return <Text style={options.headerStyle}>{title}</Text>;
};

export function DrawerTab() {
  const theme = useTheme();
  const {grey, background, content} = theme.colors;
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: grey,
          width: widthPercentageToDP('100%'),
          padding: 0,
          margin: 0,
        },
        drawerContentContainerStyle: {
          backgroundColor: 'red',
          flex: 1,
        },
        drawerContentStyle: {
          backgroundColor: 'green',
        },
        sceneContainerStyle: {
          backgroundColor: 'blue',
          flex: 1,
        },
        drawerActiveBackgroundColor: 'transparent',
      }}
      useLegacyImplementation
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="Feed">
      <Drawer.Screen
        name="Home"
        component={StackNavigation}
        options={{
          title: '',
          drawerIcon: ({focused, size}) => (
            <Box
              flexDirection="row"
              justifyContent="flex-start"
              //   marginHorizontal='s'
              //   backgroundColor="background"

              width={'100%'}
              alignItems="center">
              <Icon name="home" size={size} color={content} />
              <Box>
                <Text
                  variant="regular"
                  fontSize={14}
                  color={'title'}
                  marginHorizontal="mx3">
                  Home
                </Text>
                <Text
                  variant="regular"
                  fontSize={12}
                  color={'content'}
                  marginHorizontal="mx3">
                  Offers, Top Deals, Top Brands
                </Text>
              </Box>
            </Box>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
