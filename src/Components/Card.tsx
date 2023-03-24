import {Image} from 'react-native';
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
import {assetUrl, currencyFormat} from '../helpers/constants';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
type Params = {
  item: {};
};
const Card: React.FC<Params> = ({item}) => {
  const {navigate} = useNavigation();
  const theme = useTheme();
  const {content} = theme.colors;
  const {mx3} = theme.spacing;
  const gotoDetails = () => {
    navigate('ProductDetail',{item});
  };
  return (
    <Clickable
      onPress={gotoDetails}
      flexDirection="row"
      marginVertical="my1"
      alignItems="center">
      <Image
        source={{uri: `${assetUrl()}/${item.images[0]}`}}
        style={{
          width: widthPercentageToDP('40%'),
          height: heightPercentageToDP('15%'),
          borderRadius: 10,
          marginRight: mx3,
          resizeMode: 'center',
        }}
      />
      <Box>
        <Text variant="bold" textTransform="capitalize" fontSize={15}>
          {item.model}
        </Text>
        <Box flexDirection="row" alignItems="center">
          <Icon name="location" color={content} size={14} />
          <Text variant="medium" fontSize={12}>
            {item.area}
          </Text>
        </Box>
        <Box flexDirection="row" alignItems="center">
          <Upload name="upload-cloud" color={content} size={14} />
          <Text marginLeft="s" variant="bold" fontSize={12} color="content">
            {moment.duration(moment(item.updated_at).diff(moment())).humanize()}
          </Text>
        </Box>
        <Text variant="regular" fontSize={14} color="primary">
          {currencyFormat(item.price)}
        </Text>
      </Box>
    </Clickable>
  );
};

export default Card;
