import {View, Image, Animated, ScrollView, StyleSheet} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import Container from '../Components/Container';
import HeadNav from '../Components/HeadNav';
import {useNavigation, useRoute} from '@react-navigation/native';
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
import {PayWithFlutterwave} from 'flutterwave-react-native';
import moment from 'moment';
import Clickable from '../Components/Clickable';
import {useAuth} from '../state/hooks/userAuth';
import LocationFormModal from '../Components/LocationFormModal';
import {LocationContext} from '../state/LocationContext';
import {useOrderProductMutation} from '../state/services/ProductService';
import {useToast} from 'react-native-toast-notifications';
import {Loader} from '../Components/Loader';

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
      onSnapToItem={index => {}}
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
const ProductInformation = () => {
  const {params} = useRoute();
  const {item} = params;
  const theme = useTheme();
  const {navigate} = useNavigation();
  const {token, user} = useAuth();
  console.log(item);
  const toast = useToast();
  const [delivery, setDelivery] = useState('door');
  const [pickUpLocation, setPickUpLocation] = useState(false);
  const {location, area, address, state, type, date} =
    useContext(LocationContext);
  const {dlocation} = useAuth();
  const [orderProduct, {isLoading}] = useOrderProductMutation();

  const {mx2} = theme.spacing;
  const handleOnRedirect = async data => {
    let formData;
    if (delivery === 'door') {
      formData = {...dlocation};
      formData.type = 'door';
      formData.product_id = item.id;
      formData.user_id = user.id;
    } else {
      formData = {
        address,
        state,
        type: 'pickup',
        city: area,
        mobile_number: user ? user.mobile_number : '',
        product_id: item.id,
        user_id: user.id,
      };
    }
    console.log(formData);

    if (data.status === 'cancelled') {
      toast.show('Sorry, payment was cancelled', {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else if (data.status === 'successful') {
      const response = await performAsyncCalls(formData, orderProduct);
      if (!response?.success) {
        console.log(response);
        toast.show("couln't complete transaction", {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          animationType: 'zoom-in',
        });
      } else {
        // console.log(res.data);
        // dispatch(updateCredentials({user: response.data}));
        navigate('OrderSuccess');
      }
    } else {
      toast.show('Unable to complete Payment', {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
      // setShow(false);
    }
  };

  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  return (
    <Container>
      <HeadNav />
      {pickUpLocation && (
        <LocationFormModal
          isVisible={pickUpLocation}
          closeAction={() => setPickUpLocation(false)}
        />
      )}
      {isLoading && <Loader visible={isLoading} />}
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
            <Box>
              <Text variant="bold" fontSize={14} marginLeft={'mx2'}>
                {item.name}
              </Text>
            </Box>
            <Box>
              <Text variant={'bold'} fontSize={14} color="primary">
                {currencyFormat(item.price)}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          paddingHorizontal="mx2"
          paddingVertical="my2"
          borderBottomColor="border"
          borderBottomWidth={2}>
          <Box flexDirection="row">
            <Text variant={'bold'} fontSize={14} color="title">
              {item.description}
            </Text>
          </Box>
        </Box>
        <Box>
          <Text variant={'regular'} marginBottom={'my2'}>
            Delivery Options
          </Text>
          <Clickable
            onPress={() => {
              console.log('delevery');
              setDelivery('door');
              if (!user) {
                navigate('Login');
              } else {
                navigate('DeliveryLocation');
              }
            }}
            backgroundColor="grey"
            flexDirection="row"
            paddingLeft={'mx4'}
            borderBottomColor={'border'}
            borderBottomWidth={1}
            paddingVertical="my2"
            // alignItems="center"
          >
            <Box
              width={15}
              height={15}
              borderColor={delivery === 'door' ? 'primary' : 'border'}
              marginRight={'mx4'}
              justifyContent="center"
              alignItems="center"
              borderWidth={1}
              borderRadius={60}>
              <Box
                height={'90%'}
                width={'90%'}
                // margin={'mx2'}
                borderRadius={60}
                backgroundColor={delivery === 'door' ? 'primary' : 'grey'}
              />
            </Box>
            <Box width="80%">
              <Text variant={'medium'} color="content" fontSize={16}>
                Door Delivery
              </Text>
              <Text variant={'regular'} fontSize={13}>
                Delivery #500
              </Text>
              <Text variant={'regular'} fontSize={13}>
                Delivery by 29 sep when your order within the next 3hrs 54mins
              </Text>
            </Box>
          </Clickable>
          <Clickable
            backgroundColor="grey"
            onPress={() => {
              setDelivery('pickup');
              setPickUpLocation(true);
            }}
            flexDirection="row"
            paddingLeft={'mx4'}
            paddingVertical="my2"
            // alignItems="center"
          >
            <Box
              width={15}
              height={15}
              borderColor={delivery === 'pickup' ? 'primary' : 'border'}
              marginRight={'mx4'}
              justifyContent="center"
              alignItems="center"
              borderWidth={1}
              borderRadius={60}>
              <Box
                height={'90%'}
                width={'90%'}
                // margin={'mx2'}
                borderRadius={60}
                backgroundColor={delivery === 'pickup' ? 'primary' : 'grey'}
              />
            </Box>
            <Box>
              <Text variant={'regular'} fontSize={16}>
                Pick Up
              </Text>
              <Text variant={'regular'} fontSize={13}>
                Delivery #500
              </Text>
              <Text variant={'regular'} fontSize={13}>
                Delivery by 29 sep when your order within the next 3hrs 54mins
              </Text>
            </Box>
          </Clickable>
        </Box>
        <Box
          paddingVertical="my2"
          elevation={14}
          borderTopColor={'grey'}
          borderTopWidth={1}
          shadowColor="grey"
          paddingHorizontal="mx3"
          shadowOffset={{height: 10, width: 10}}>
          <PayWithFlutterwave
            onRedirect={handleOnRedirect}
            options={{
              tx_ref: moment().unix().toString(),
              authorization: 'FLWPUBK_TEST-4640d65d53c36c72360ece24fe1c137e-X',
              customer: {
                email: 'customer-email@example.com',
              },
              amount: 2000,
              currency: 'NGN',
              payment_options: 'card',
            }}
            customButton={props => (
              <Button
                paddingVertical="mx3"
                paddingHorizontal="s"
                borderRadius={5}
                isloading={false}
                childColor={'white'}
                onPress={props.onPress}
                disabled={props.disabled}
                type="primary"
                label="Make Payment"
              />
            )}
          />
        </Box>
      </ScrollView>
    </Container>
  );
};

export default ProductInformation;

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
