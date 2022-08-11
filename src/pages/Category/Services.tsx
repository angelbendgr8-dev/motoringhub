import {View, ImageBackground} from 'react-native';
import React from 'react';
import {help} from '../../assets';
import Box from '../../Components/Box';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Text from '../../Components/Text';
import Clickable from '../../Components/Clickable';
import {useNavigation} from '@react-navigation/native';
import {assetUrl} from '../../helpers/constants';
import Icon from 'react-native-vector-icons/AntDesign';

export interface Service {
  name: string;
  description: string;
  picture: string;
  assurance: string;
  process: string;
  others: string;
}
type Props = {
  service: Service;
  onPress: () => void;
};
const Services: React.FC<Props> = ({service, onPress}) => {
  // const {navigate} = useNavigation();
  // const goToDetails = () => {
  //   navigate('ServiceDetails');
  // };
  return (
    <Clickable onPress={onPress} marginBottom="m">
      <ImageBackground
        source={{uri: `${assetUrl()}/${service.picture}`}}
        imageStyle={{borderRadius: 15}}
        style={{
          height: heightPercentageToDP('20%'),
          width: widthPercentageToDP('93%'),
          justifyContent: 'center',
        }}>
        <Box
          borderRadius={15}
          style={{backgroundColor: 'rgba(0,0,0,0.3)'}}
          justifyContent={'flex-end'}
          width="100%"
          flex={1}>
          <Text
            marginLeft="m"
            marginBottom="my3"
            variant="medium"
            fontSize={16}
            color="background">
            {service.name} <Icon name="right" color="white" size={13} />
          </Text>
        </Box>
      </ImageBackground>
    </Clickable>
  );
};

export default Services;
