import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import Text from '../../Components/Text';
import Clickable from '../../Components/Clickable';
import {car} from '../../assets';
import Box from '../../Components/Box';
import {assetUrl} from '../../helpers/constants';
import {useNavigation} from '@react-navigation/native';

type Props = {
  title: string;
  image: object;
  onPress: () => void;
};
export const Category: React.FC<Props> = ({title, image}) => {
  useEffect(() => {}, [title]);
  const {navigate} = useNavigation();
  return (
    <Clickable
      onPress={() => navigate('Result', {searchTerm: title})}
      alignItems="center"
      justifyContent="space-around"
      // width="100%"
      margin="mx2"
      padding="mx3"
      borderRadius={15}
      backgroundColor="grey"
      elevation={5}>
      <Image
        source={{uri: `${assetUrl()}/${image}`}}
        style={{height: 40, width: 40}}
      />
      {/* <Text variant={'medium'} textAlign='center' fontSize={12} color="title">
          {title}
        </Text> */}
    </Clickable>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 13,
    lineHeight: 18,
    color: 'white',
    opacity: 0.87,
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  activeText: {
    fontSize: 14,
    lineHeight: 18,
    color: 'white',
    opacity: 0.87,
    alignSelf: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  nonActiveText: {
    color: '#707070',
  },
});
