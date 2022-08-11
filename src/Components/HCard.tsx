import {} from 'react-native';
import React from 'react';
import Clickable from './Clickable';
import Icon from 'react-native-vector-icons/EvilIcons';
import Upload from 'react-native-vector-icons/Feather';
import Box from './Box';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Text from './Text';
import {useTheme} from '@shopify/restyle';

const Card = () => {
  const theme = useTheme();
  const {content} = theme.colors;
  return (
    <Clickable flexDirection="row" marginVertical="my1" alignItems="center">
      <Box
        backgroundColor="border"
        width={widthPercentageToDP('40%')}
        height={heightPercentageToDP('15%')}
        borderRadius={10}
        marginRight={'mx2'}
      />
      <Box>
        <Text variant="bold" fontSize={15}>
          Blue Denim Jacket
        </Text>
        <Text variant="medium" fontSize={12}>
          <Icon name="location" color={content} size={14} />
          Abule Egba
        </Text>

        <Text variant="bold" fontSize={12} color="content">
          <Upload name="upload-cloud" color={content} size={14} />
          Jun,24 2020
        </Text>
        <Text variant="regular" color="primary">
          ₦ 200,000
        </Text>
      </Box>
    </Clickable>
  );
};

export default Card;
