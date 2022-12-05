import {StyleSheet} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import Container from '../Components/Container';
import Box from '../Components/Box';

import {useTheme} from '@shopify/restyle';
import Button from '../Components/Button';
import Text from '../Components/Text';
import _ from 'lodash';

import Icon2 from 'react-native-vector-icons/AntDesign';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import moment from 'moment';
import Clickable from '../Components/Clickable';
import {LocationContext} from '../state/LocationContext';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import AnimatedLottieView from 'lottie-react-native';
import Header from '../Components/Header';
import {useAuth} from '../state/hooks/userAuth';
import Input from '../Components/Input';
import PhoneInput from 'react-native-phone-number-input';
import {useDispatch} from 'react-redux';
import {addLocation, setDefaultLocation} from '../state/reducers/userAuth';
import {useToast} from 'react-native-toast-notifications';
import {FlatList} from 'react-native-gesture-handler';
import LocationFormModal from '../Components/LocationFormModal';

const AddLocation = ({done}) => {
  const {user} = useAuth();
  const [phone, setPhone] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [country, setCountry] = useState('NG');
  const phoneInput = useRef<PhoneInput>(null);
  const [code, setCode] = useState(user?.code);
  const theme = useTheme();
  const {content, background} = theme.colors;
  const dispatch = useDispatch();
  const toast = useToast();
  const {goBack} = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: user ? user.name : '',
      address: '',
      state: '',
      city: '',
      mobile_number: user ? user.mobile_number : '',
    },
  });

  // console.log(date);
  const onSubmit = formdata => {
    console.log(formdata);
    dispatch(addLocation({location: formdata}));
    toast.show('New Location added Successfully', {
      type: 'success',
      placement: 'top',
      duration: 4000,
      offset: 30,
      animationType: 'zoom-in',
    });
    done(false);
  };
  return (
    <Container>
      <Header leftIcon={true} text={'Enter your Location'} />
      <Box marginTop="m" flex={1} justifyContent="space-between">
        <Box>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({
              field: {
                onChange,
                // onBlur,
                value,
              },
            }) => (
              <Box marginBottom="m" paddingHorizontal={'mx3'}>
                <Input
                  value={value}
                  onChange={input => {
                    // setState(input);
                    onChange(input);
                  }}
                  label="Last Name"
                />
              </Box>
            )}
            name="name"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({
              field: {
                onChange,
                // onBlur,
                value,
              },
            }) => (
              <Box marginBottom="m" paddingHorizontal={'mx3'}>
                <Input
                  value={value}
                  onChange={input => {
                    // setState(input);
                    onChange(input);
                  }}
                  label="State"
                />
              </Box>
            )}
            name="state"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({
              field: {
                onChange,
                // onBlur,
                value,
              },
            }) => (
              <Box marginBottom="m" paddingHorizontal={'mx3'}>
                <Input
                  value={value}
                  onChange={input => {
                    // setArea(input);
                    onChange(input);
                  }}
                  label="City"
                />
              </Box>
            )}
            name="city"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({
              field: {
                onChange,
                // onBlur,
                value,
              },
            }) => (
              <Box marginBottom="m" paddingHorizontal={'mx3'}>
                <Input
                  value={value}
                  onChange={input => {
                    // setAddress(input);
                    onChange(input);
                  }}
                  label="HouseAddress"
                />
              </Box>
            )}
            name="address"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({
              field: {
                onChange,
                // onBlur,

                value,
              },
            }) => (
              <Box
                backgroundColor={'background'}
                flexDirection={'row'}
                borderRadius={10}
                justifyContent={'space-between'}
                marginVertical={'my2'}
                marginHorizontal={'mx3'}
                alignItems={'center'}
                //   paddingHorizontal={'mx2'}
                borderColor={errors.mobile_number ? 'primary' : 'content'}
                borderWidth={0.5}
                height={heightPercentageToDP('6.5%')}
                //   style={customStyles}
              >
                {value.length > 0 && (
                  <Box
                    position="absolute"
                    top={-10}
                    left={25}
                    zIndex={5}
                    paddingHorizontal={'mx3'}
                    backgroundColor="background">
                    <Text variant="regular">Enter phone number</Text>
                  </Box>
                )}
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={value}
                  defaultCode="NG"
                  layout="first"
                  // placeholder=" "
                  onChangeCountry={country => {
                    console.log(country.callingCode[0]);
                    setCountry(country.cca2);
                  }}
                  onChangeText={text => {
                    setPhone(text);
                    onChange(text);
                  }}
                  onChangeFormattedText={text => {
                    setFormattedValue(text);
                  }}
                  codeTextStyle={{color: content}}
                  withShadow
                  containerStyle={[
                    {height: '100%', width: '100%', borderRadius: 10},
                    {backgroundColor: background, borderColor: content},
                  ]}
                  textContainerStyle={{
                    borderRadius: 45,
                    backgroundColor: 'transparent',
                  }}
                  textInputStyle={{
                    height: 40,
                    marginTop: 1,
                    color: content,
                    fontSize: 16,
                    fontWeight: '400',
                  }}
                />
              </Box>
            )}
            name="mobile_number"
          />
        </Box>
        <Box
          marginVertical="my4"
          borderTopColor={'grey'}
          borderTopWidth={1}
          elevation={14}
          shadowColor="grey"
          paddingHorizontal="mx3"
          shadowOffset={{height: 10, width: 10}}>
          <Button
            paddingVertical="mx3"
            paddingHorizontal="s"
            borderRadius={5}
            borderWidth={1}
            borderColor="primary"
            onPress={handleSubmit(onSubmit)}
            type="primary"
            textType="none"
            textFont={12}
            label="Continue"
          />
        </Box>
      </Box>
    </Container>
  );
};

const Location = ({item}) => {
  const dispatch = useDispatch();
  const {dlocation} = useAuth();
  const theme = useTheme();
  const {primary} = theme.colors;
  console.log(dlocation);
  const toast = useToast();

  const updateSelected = () => {
    dispatch(setDefaultLocation({location: item}));
    toast.show('Default Location Updated', {
      type: 'success',
      placement: 'top',
      duration: 4000,
      offset: 30,
      animationType: 'zoom-in',
    });
  };
  return (
    <Box marginBottom="my2">
      <Box
        backgroundColor="grey"
        padding="mx3"
        borderBottomColor="content"
        borderBottomWidth={0.3}>
        <Text variant="regular">{item.name}</Text>
        <Text variant="regular">{item.address}</Text>
        <Text variant="regular">{item.city}</Text>
        <Text variant="regular">{item.mobile_number}</Text>
        <Box marginVertical="my2">
          {!dlocation ||
            (dlocation.id === item.id && (
              <Box flexDirection="row" alignItems="center">
                <Icon2 name="star" color={primary} size={16} />
                <Text variant="regular">Your default location</Text>
              </Box>
            ))}
        </Box>
      </Box>
      <Clickable onPress={updateSelected} backgroundColor="grey">
        <Text
          variant="medium"
          color={'primary'}
          marginVertical="mx3"
          textAlign="center"
          marginHorizontal="mx2">
          Select Location
        </Text>
      </Clickable>
    </Box>
  );
};

const LocationFooter = () => {};

const DeliveryLocation = () => {
  const {goBack} = useNavigation();
  const theme = useTheme();
  const {content, primary} = theme.colors;
  const [addLocation, setAddLocation] = useState(false);
  const {locations} = useAuth();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      date: '',
      state: '',
      area: '',
      address: '',
    },
  });

  // console.log(date);
  const onSubmit = formdata => {
    // console.log(formdata);
    updateLocation();
  };
  // const updateLocation = () => {
  //   setLocation(true);
  //   setType('Pickup');
  //   goBack();
  // };
  console.log(locations);
  return (
    <Container>
      {addLocation ? (
        <AddLocation done={setAddLocation} />
      ) : (
        <>
          <Header leftIcon={true} text={'Address Book'} />
          {_.size(locations) > 0 ? (
            <Box>
              <Text
                variant="medium"
                marginVertical="mx3"
                marginHorizontal="mx2">
                Address
              </Text>

              <FlatList
                renderItem={({item, index}) => (
                  <Location item={item} key={index} />
                )}
                data={locations}
                ListFooterComponent={() => (
                  <Clickable
                    flexDirection="row"
                    justifyContent="center"
                    onPress={() => setAddLocation(true)}
                    marginTop="mx2"
                    alignItems="center"
                    backgroundColor="grey">
                    <Icon2 name="pluscircle" color={primary} size={17} />
                    <Text
                      variant="regular"
                      color={'primary'}
                      marginVertical="mx3"
                      textAlign="center"
                      marginHorizontal="mx2">
                      Add New address
                    </Text>
                  </Clickable>
                )}
              />
            </Box>
          ) : (
            <Box
              marginTop="m"
              flex={1}
              justifyContent="center"
              alignItems="center">
              <Text variant={'medium'}>You have no Locations</Text>
              <AnimatedLottieView
                source={require('../assets/empty.json')}
                autoPlay
                loop
                style={{height: heightPercentageToDP('20%')}}
              />
              <Button
                paddingVertical="mx3"
                paddingHorizontal="m"
                borderRadius={5}
                isloading={false}
                childColor={'white'}
                onPress={() => setAddLocation(!addLocation)}
                type="primary"
                label="Add Location"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default DeliveryLocation;

const styles = StyleSheet.create({
  calenderContainer: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 20,
    // marginLeft: heightPercentageToDP('2%'),
    // marginRight: heightPercentageToDP('2%'),
    width: '100%',
    borderColor: '#302E2E',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // alignSelf: 'center',
  },
});
