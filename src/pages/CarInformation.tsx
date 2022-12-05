import {View, Image, Animated, ScrollView, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';
import Container from '../Components/Container';
import HeadNav from '../Components/HeadNav';
import {useRoute} from '@react-navigation/native';
import _ from 'lodash';
import Box from '../Components/Box';
import {
  assetUrl,
  currencyFormat,
  performAsyncCalls,
} from '../helpers/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useTheme} from '@shopify/restyle';

import Carousel from 'react-native-reanimated-carousel';
import Text from '../Components/Text';
import FeatureIcon from 'react-native-vector-icons/AntDesign';
import Button from '../Components/Button';
import LocationFormModal from '../Components/LocationFormModal';
import {useAuth} from '../state/hooks/userAuth';
import {useInspectCarMutation} from '../state/services/ProductService';
import { Loader } from '../Components/Loader';
import { InspectSuccess } from '../Components/InspectSuccess';
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
type DespProps = {
  title: string;
  value: string;
  index: number;
};

type FeatureProps = {
  icon: string;
  name: string;
};

const DescriptionItem: React.FC<DespProps> = ({title, value, index}) => {
  return (
    <Box
      flexDirection="row"
      backgroundColor={index % 2 === 1 ? 'grey' : 'background'}
      alignItems="center"
      paddingVertical="my2"
      paddingHorizontal="mx2"
      justifyContent="space-between">
      <Text variant="regular" fontSize={14}>
        {title}
      </Text>
      <Text variant="medium" fontSize={14} color="title">
        {value}
      </Text>
    </Box>
  );
};
const FeaturesItem: React.FC<FeatureProps> = ({icon, name}) => {
  return (
    <Box
      alignItems="center"
      paddingVertical="my2"
      paddingHorizontal="my3"
      justifyContent="space-between">
      <FeatureIcon name={icon} size={22} />
      <Text variant="regular" fontStyle="italic" fontSize={14} color="title">
        {name}
      </Text>
    </Box>
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
  const {user} = useAuth();
  const theme = useTheme();
  const [inspectCar, {isLoading}] = useInspectCarMutation();
  const [inspectionLocation, setInspectionLocation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {mx2} = theme.spacing;

  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const bookInspection = async () => {
    const formData = {
      user_id: user.id,
      car_id: item.id,
    };
    console.log(formData);
    const response = await performAsyncCalls(formData, inspectCar);
    setSubmitted(true);
  };
  return (
    <Container>
      <HeadNav />
      {inspectionLocation && (
        <LocationFormModal
          isVisible={inspectionLocation}
          closeAction={() => setInspectionLocation(false)}
        />
      )}
      {isLoading && <Loader visible={isLoading} />}
      {submitted && <InspectSuccess visible={submitted} />}

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
        <Box paddingVertical="my2">
          <Box flexDirection="row" paddingHorizontal="mx2">
            <Text variant={'bold'} fontSize={17} color="title">
              Description
            </Text>
          </Box>
          <DescriptionItem
            title="Engine Type"
            value="4-cylinder(I4)"
            index={0}
          />
          <DescriptionItem title="Interior color" value="Ash" index={1} />
          <DescriptionItem title="Exterior color" value="Grey" index={0} />
          <DescriptionItem
            title="VIN"
            value="aktslktowieoladhflaljf"
            index={1}
          />
          <DescriptionItem title="Car ID" value="P9dtXZliC_" index={0} />
          <DescriptionItem title="Transmision" value="Automatic" index={1} />
        </Box>
        <Box paddingVertical="my2">
          <Box flexDirection="row" paddingHorizontal="mx2">
            <Text variant={'bold'} fontSize={17} color="title">
              Key Features
            </Text>
          </Box>
          <Box
            flexDirection="row"
            // paddingHorizontal="mx2"
            flexWrap="wrap"
            alignItems="flex-start"
            maxWidth={widthPercentageToDP('95%')}
            justifyContent="center">
            <FeaturesItem icon={'setting'} name={'Launch Gear'} />
            <FeaturesItem icon={'enviroment'} name={'Central Locking'} />
            <FeaturesItem icon={'disconnect'} name={'Sunroof'} />
            <FeaturesItem icon={'shake'} name={'Keyless Entry'} />
            <FeaturesItem icon={'codepen-circle'} name={'Air Bag'} />
            <FeaturesItem icon={'setting'} name={'Remote Entry'} />
          </Box>
        </Box>
      </ScrollView>
      <Box
        paddingVertical="my2"
        elevation={14}
        borderTopColor={'grey'}
        borderTopWidth={1}
        shadowColor="grey"
        paddingHorizontal="mx3"
        shadowOffset={{height: 10, width: 10}}>
        <Button
          paddingVertical="mx3"
          paddingHorizontal="s"
          onPress={bookInspection}
          borderRadius={5}
          isloading={false}
          childColor={'white'}
          type="primary"
          label="Book Inspection"
        />
      </Box>
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
