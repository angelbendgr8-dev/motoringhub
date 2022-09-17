import {View, Image, Animated, ScrollView, StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import Container from '../Components/Container';
import HeadNav from '../Components/HeadNav';
import {useRoute} from '@react-navigation/native';
import _ from 'lodash';
import Box from '../Components/Box';
import {assetUrl, currencyFormat} from '../helpers/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useTheme} from '@shopify/restyle';

import Carousel from 'react-native-reanimated-carousel';
import Text from '../Components/Text';

const Max_Header_Height = 200;
const Min_Header_Height = 0;
const Scroll_Distance = Max_Header_Height - Min_Header_Height;
const width = widthPercentageToDP('100%');

const DynamicHeader = ({animatedValue, images}) => {
  const animatedHeaderHeight = animatedValue.interpolate({
    inputRange: [0, Scroll_Distance],
    // inputRange: [0, Max_Header_Height- Min_Header_Height],

    outputRange: [Max_Header_Height, Min_Header_Height],
    extrapolate: 'clamp',
  });
  return (
    <Carousel
      loop
      width={width}
      height={width / 1.5}
      autoPlay={true}
      data={images}
      scrollAnimationDuration={3000}
      onSnapToItem={index => console.log('current index:', index)}
      renderItem={({item}) => <ImageCard image={item} />}
    />
  );
};

const ImageCard = ({image}) => {
  const theme = useTheme();

  const {mx3} = theme.spacing;
  return (
    <Box>
      <Image
        style={{
          width: widthPercentageToDP('100%'),
          height: heightPercentageToDP('45%'),
          // borderRadius: 5,
          marginRight: mx3,
        }}
        source={{uri: `${assetUrl()}/${image}`}}
      />
    </Box>
  );
};
const CarInformation = () => {
  const {params} = useRoute();
  const {item} = params;
  const theme = useTheme();

  const {mx2} = theme.spacing;

  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  return (
    <Container>
      <HeadNav />
      <DynamicHeader animatedValue={scrollOffsetY} images={item.images} />
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
          {useNativeDriver: false},
        )}>
        <Box
          paddingHorizontal="mx2"
          borderBottomColor="border"
          borderBottomWidth={2}>
          <Box
            paddingVertical="mx2"
            flexDirection="row"
            justifyContent="space-between">
            <Box flexDirection="row">
              <Icon name="speedometer-sharp" size={15} />
              <Text variant="medium" fontSize={14} marginLeft={'mx2'}>
                {item.maker}
              </Text>
            </Box>
            <Box flexDirection="row">
              <Icon name="location" size={15} />
              <Text variant="medium" fontSize={14} marginLeft={'mx2'}>
                {item.address.substr(0, 10)}, {item.area}, {item.state}
              </Text>
            </Box>
            <Box flexDirection="row">
              <Icon name="car" size={15} />
              <Text variant="medium" fontSize={14} marginLeft={'mx2'}>
                {item.sellingCondition}
              </Text>
            </Box>
          </Box>
          <Box marginVertical="my2">
            <Text variant={'medium'} fontSize={18} color="title">
              {item.caryear} {item.model}
            </Text>
          </Box>
        </Box>
        <Box
          paddingHorizontal="mx2"
          paddingVertical="my2"
          borderBottomColor="border"
          borderBottomWidth={2}>
          <Box flexDirection="row">
            <Text variant={'bold'} fontSize={14} color="primary">
              {currencyFormat(item.price)}
            </Text>
            <Text variant={'bold'} fontSize={14} color="title">
              {'  '}(20% off)
            </Text>
          </Box>
          <Text
            variant={'medium'}
            textDecorationLine="line-through"
            fontSize={15}
            color="content">
            {currencyFormat(item.price)}
          </Text>
        </Box>
        <Box paddingHorizontal="mx2" paddingVertical="my2">
          <Box flexDirection="row">
            <Text variant={'bold'} fontSize={17} color="title">
              Description
            </Text>
          </Box>
        </Box>
      </ScrollView>
    </Container>
  );
};

export default CarInformation;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    paddingTop: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
