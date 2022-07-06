/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import {store} from './src/state/store';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import theme, {darkTheme} from './src/theme';
import StackNavigation from './src/Navigation/StackNavigation';
import AppContextProvider from './src/state/AppContext';

import {MenuProvider} from 'react-native-popup-menu';
import {DrawerTab} from './src/Navigation/Drawer';

let persistor = persistStore(store);

const App = () => {
  const {userAuth} = store.getState();
  console.log(userAuth);
  const [isDarkMode, setDarkMode] = useState(false);
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <AppContextProvider>
              <MenuProvider>
                <StackNavigation />
              </MenuProvider>
            </AppContextProvider>
          </ThemeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
