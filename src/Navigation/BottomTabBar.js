import {useTheme} from '@shopify/restyle';
import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Text from '../Components/Text';
// import {News, Scores, Settings, Sports, Videos} from '../assets/global';
import Icon from 'react-native-vector-icons/Ionicons';
import User from 'react-native-vector-icons/FontAwesome';
import Swap from 'react-native-vector-icons/MaterialCommunityIcons';
import {fservices, services} from '../assets';

export default function BottomTabBar({state, descriptors, navigation}) {
  const theme = useTheme();
  const {primary, title, background} = theme.colors;
  return (
    <View
      style={{
        //   flex:1,
        flexDirection: 'row',
        alignItems: 'space-around',
        backgroundColor: background,
        justifyContent: 'space-evenly',

        paddingVertical: 5,
        elevation: 1,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            key={index}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {label === 'Home' ? (
              <Icon
                name={isFocused ? 'md-home' : 'md-home-outline'}
                size={isFocused ? 24 : 20}
                color={isFocused ? primary : title}
                // style={{
                //   position:'absolute',
                //   bottom:0,
                //   borderRadius:120,
                //   backgroundColor: secondary,
                //   paddingHorizontal:15,
                //   paddingVertical:12,
                // }}
              />
            ) : label === 'Services' ? (
              <Image
                source={isFocused ? fservices : services}
                style={{
                  height: isFocused ? 24 : 20,
                  width: isFocused ? 24 : 20,
                  tintColor: isFocused ? primary : 'black',
                }}
              />
            ) : label === 'Deals' ? (
              <Swap
                name={isFocused ? 'cart' : 'cart-outline'}
                size={isFocused ? 24 : 20}
                color={isFocused ? primary : title}
              />
            ) : (
              <User
                name={isFocused ? 'user' : 'user-o'}
                size={isFocused ? 24 : 20}
                color={isFocused ? primary : title}
              />
            )}
            <Text
              variant={'regular'}
              fontSize={12}
              color={isFocused ? 'primary' : 'title'}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 40,
  },
});
