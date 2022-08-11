import {ImageBackground} from 'react-native';
import React from 'react';
import Box from './Box';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Text from './Text';
import Button from './Button';
import {help} from '../assets';
import Clickable from './Clickable';

const Banner = () => {
  return (
    <ImageBackground
      style={{
        justifyContent: 'center',
        // paddingLeft: widthPercentageToDP('2%'),
        height: heightPercentageToDP('25%'),
        width: widthPercentageToDP('85%'),
        marginRight: 10,
      }}
      imageStyle={{borderRadius: 15}}
      resizeMode="contain"
      source={help}>
      <Box
        borderRadius={15}
        style={{backgroundColor: 'rgba(0,0,0,0.3)'}}
        justifyContent="center"
        paddingLeft="mx2"
        width="100%"
        flex={1}>
        <Text variant="medium" color="background">
          Welcome to MotoringHub
        </Text>
        <Text
          variant="regular"
          color="background"
          marginVertical="my1"
          fontSize={12}>
          Get You Vehincle purchased today
        </Text>
        <Clickable
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          onPress={() => {}}
          borderRadius={3}
          width={widthPercentageToDP('30%')}
          backgroundColor="primary">
          <Text
            variant="regular"
            color="white"
            paddingVertical="my1"
            marginRight="mx3"
            fontSize={12}>
            Get Started
          </Text>
          {/* <Icon name="right" color={'white'} /> */}
        </Clickable>
      </Box>
    </ImageBackground>
  );
};

export default Banner;
