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
  item: any;
};
const HCard: React.FC<Params> = ({item}) => {
  const theme = useTheme();
  const {content} = theme.colors;
  const {navigate} = useNavigation();
  const {mx3} = theme.spacing;
  console.log(`${assetUrl()}/${item.images[0]}`);
  const gotoDetails = () => {
    navigate('PartDetails', {item});
  };
  return (
    <Clickable
      onPress={gotoDetails}
      alignItems="center"
      justifyContent="center"
      marginVertical="my1">
      <Image
        source={{uri: `${assetUrl()}/${item?.images[0]}`}}
        style={{
          width: widthPercentageToDP('43.5%'),
          height: heightPercentageToDP('25%'),
          borderRadius: 10,
          marginRight: mx3,
          resizeMode: 'center',
        }}
      />
      <Box alignSelf="flex-start">
        <Text variant="bold" textTransform="capitalize" fontSize={15}>
          {item.name}
        </Text>
        <Text variant="regular" fontSize={14} color="primary">
          {currencyFormat(item.price)}
        </Text>
        <Box flexDirection="row" alignItems="center">
          <Upload name="upload-cloud" color={content} size={14} />
          <Text marginLeft="s" variant="bold" fontSize={12} color="content">
            {moment.duration(moment(item.updated_at).diff(moment())).humanize()}
          </Text>
        </Box>
      </Box>
    </Clickable>
  );
};

export default HCard;
