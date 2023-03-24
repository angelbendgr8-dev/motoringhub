import React from 'react';
import {Animated, View, TouchableOpacity} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {TextCustom} from '../../Text';

export function MarketTabBar({state, descriptors, navigation, position}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 5,
        // width: widthPercentageToDP('90%'),
        // flex: 1,
        // marginHorizontal: widthPercentageToDP('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#A5A5A5',
        borderBottomWidth: 1,
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

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={index}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              paddingVertical: 10,
              borderBottomColor: '#B30000',
              borderBottomWidth: isFocused ? 3 : 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextCustom
              h4
              bold
              style={{color: isFocused ? 'black' : '#A5A5A5'}}>
              {label}
            </TextCustom>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
