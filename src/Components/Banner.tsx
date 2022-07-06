import {} from 'react-native';
import React from 'react';
import Box from './Box';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Text from './Text';
import Button from './Button';

const Banner = () => {
  return (
    <Box
      justifyContent="center"
      backgroundColor="border"
      paddingLeft="m"
      marginBottom="mx3"
      height={heightPercentageToDP('30%')}
      width={widthPercentageToDP('90%')}
      marginRight={'mx2'}
      borderRadius={15}>
      <Text variant="medium">Welcome to MotoringHub</Text>
      <Text variant="regular" marginVertical="my1" fontSize={12}>
        Get You Vehincle purchased today
      </Text>
      <Box width={'40%'}>
        <Button
          paddingVertical="mx3"
          paddingHorizontal="s"
          borderRadius={5}
          onPress={() => {}}
          type="primary"
          label="Shop Now"
        />
      </Box>
    </Box>
  );
};

export default Banner;
