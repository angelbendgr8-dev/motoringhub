import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import Text from '../../Components/Text';
import Clickable from '../../Components/Clickable';
import {car} from '../../assets';

type Props = {
  active: boolean;
  title: string;
  image: object;
  onPress: () => void;
};
export const Category: React.FC<Props> = ({active, title, image, onPress}) => {
  useEffect(() => {}, [title]);

  return (
    <Clickable
      onPress={onPress}
      alignItems="center"
      justifyContent="center"
      marginHorizontal='mx3'
      style={active ? styles.underline : styles.noUnderline}>
      <Image source={image} style={{height: 45, width: 45}} />
      <Text variant={'medium'} fontSize={12} color="title">
        {title}
      </Text>
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
  underline: {
    backgroundColor: '#707070',
    padding: 5,
    opacity: 0.87,
    marginHorizontal: 10,
    borderRadius: 35,
  },
  noUnderline: {
    marginHorizontal: 10,
    justifyContent: 'center',
    padding: 5,
  },
});
