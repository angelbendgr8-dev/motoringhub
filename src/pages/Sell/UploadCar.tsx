import {ScrollView} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Header from '../../Components/Header';
import Container from '../../Components/Container';
import Box from '../../Components/Box';

import Input from '../../Components/Input';
import {useTheme} from '@shopify/restyle';
import Button from '../../Components/Button';
import Text from '../../Components/Text';
import Icon from 'react-native-vector-icons/Entypo';
import {useGetCarBrandsQuery} from '../../state/services/ContentService';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import LocationFormModal from '../../Components/LocationFormModal';
import {useForm, Controller} from 'react-hook-form';

import PhoneInput from 'react-native-phone-number-input';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {LocationContext} from '../../state/LocationContext';
import moment from 'moment';
import Clickable from '../../Components/Clickable';
import {useAddProductMutation} from '../../state/services/RequestService';
import {useToast} from 'react-native-toast-notifications';
import {useAuth} from '../../state/hooks/userAuth';
import {ProductUploadContext} from '../../state/CarInfoContext';

const UploadCar = () => {
  const theme = useTheme();
  const {content, background} = theme.colors;
  const {data, refetch} = useGetCarBrandsQuery();
  const [brands, setBrands] = useState([]);
  const [motorLocation, setMotorLocation] = useState(false);
  const [formattedValue, setFormattedValue] = useState('');
  const {location, area, address, state, setLocation, type, date} =
    useContext(LocationContext);
  const {
    caryear,
    model,
    setModel,
    maker,
    setMaker,
    setCaryear,
    mileage,
    setMileage,
    fuelType,
    setFuelType,
    gearType,
    setGearType,
    bodyType,
    setBodyType,
    sellingCondition,
    setSellingCondition,
    price,
    setPrice,
    images,
    setImages,
  } = useContext(ProductUploadContext);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('234');
  const phoneInput = useRef<PhoneInput>(null);
  const {navigate} = useNavigation();
  const [addProduct, {isLoading}] = useAddProductMutation();
  const toast = useToast();
  const {user} = useAuth();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone_number: user?.mobile_number,
    },
  });

  useEffect(() => {
    if (data) {
      // console.log(data);
      setBrands(data.data);
    }
    // refetch();
  }, [data]);

  const editLocation = () => {
    if (type === 'Dropoff') {
      setMotorLocation(true);
    } else {
      navigate('RequestLocation');
    }
  };
  const cleanup = () => {
    setBodyType('');
    setFuelType('');
    setGearType('');
    setPrice(0);
    setMaker('');
    setModel('');
    setCaryear('');
    setMileage(0);
    setSellingCondition('');
    setImages([]);
    setLocation(false);
    navigate('Dashboard');
  };
  const onSubmit = async (formdata: any) => {
    const phoneValid = phoneInput.current?.isValidNumber(formattedValue);
    if (phoneValid) {
      formdata.phone_number = formattedValue;
      let formData = new FormData();
      _.map(images, item => {
        // console.log(item);
        formData.append('images[]', item);
      });
      // console.log(date);
      const newData = {
        ...formdata,
        address,
        date: date ? moment(date).format('d-MM-Y') : moment().format('d-MM-y'),
        state,
        model,
        maker,
        type,
        area,
        caryear,
        bodyType,
        fuelType,
        gearType,
        mileage,
        price,
        sellingCondition,
      };

      formData.append('user_id', user.id);
      Object.keys(newData).forEach(key => formData.append(key, newData[key]));

      const response = await addProduct(formData);
      const {data: resData, error} = response;
      if (resData?.success) {
        toast.show(resData?.message, {
          type: 'success',
          placement: 'top',
          duration: 4000,
          animationType: 'zoom-in',
        });
        cleanup();
      } else {
        console.log(response.error.data);
        toast.show(error?.data?.message, {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          animationType: 'zoom-in',
        });
      }
    } else {
      toast.show('invalid phone format', {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    }
  };

  return (
    <Container>
      <Header leftIcon={true} text={'Book Inspection Appointment'} />
      <Box marginTop="m" flex={1} justifyContent="space-between">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box paddingTop="my3" paddingHorizontal={'mx3'}>
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
                <Box marginBottom="my3">
                  <Input
                    value={value}
                    onChange={input => onChange(input)}
                    label="Your name"
                    customStyles={{}}
                  />
                </Box>
              )}
              name={'name'}
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
                <Input
                  type={'emailAddress'}
                  value={value}
                  onChange={input => onChange(input)}
                  label="Enter Email"
                />
              )}
              name={'email'}
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
                  marginTop={'my3'}
                  alignItems={'center'}
                  //   paddingHorizontal={'mx2'}
                  borderColor="content"
                  borderWidth={1}
                  height={heightPercentageToDP('6.5%')}
                  //   style={customStyles}
                >
                  {phone.length > 0 && (
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
                    defaultValue={phone}
                    defaultCode="NG"
                    layout="first"
                    // placeholder=" "
                    onChangeCountry={country => setCode(country.callingCode[0])}
                    onChangeText={text => {
                      setPhone(text);
                    }}
                    onChangeFormattedText={text => {
                      setFormattedValue(text);
                      onChange(formattedValue);
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
              name="phone_number"
            />
            <Box
              marginVertical="my4"
              // elevation={14}
              // borderTopColor={'grey'}
              // borderTopWidth={1}
              // shadowColor="grey"

              shadowOffset={{height: 10, width: 10}}>
              <Text variant="medium" marginVertical="m" fontSize={16}>
                Delivery Mode
              </Text>
              {!location ? (
                <Box>
                  <Button
                    paddingVertical="mx3"
                    hasIcon={true}
                    buttonIcon={() => (
                      <Icon name="location" color={content} size={20} />
                    )}
                    paddingHorizontal="s"
                    marginBottom="my3"
                    borderRadius={5}
                    onPress={() => navigate('RequestLocation')}
                    type="secondary"
                    textType="none"
                    textFont={12}
                    label="Fix from my Location"
                  />

                  <Button
                    paddingVertical="mx3"
                    paddingHorizontal="s"
                    borderRadius={5}
                    onPress={() => setMotorLocation(true)}
                    type="secondary"
                    textType="none"
                    textFont={12}
                    label="Fix at motorhub service center"
                  />
                </Box>
              ) : (
                <Box
                  borderWidth={0.5}
                  borderColor={'primary'}
                  backgroundColor="lighterprimary"
                  padding="mx4"
                  borderRadius={5}>
                  <Box flexDirection="row" justifyContent="space-between">
                    <Text variant={'medium'} color={'title'} fontSize={14}>
                      {state}
                    </Text>
                    <Box
                      backgroundColor="primary"
                      borderRadius={3}
                      paddingHorizontal="mx2">
                      <Text variant={'medium'} color="background" fontSize={14}>
                        {type}
                      </Text>
                    </Box>
                  </Box>
                  <Box width={'50%'}>
                    <Text variant={'medium'} color={'content'} fontSize={14}>
                      {address},{area}
                    </Text>
                  </Box>
                  {type === 'Pickup' && (
                    <Box width={'50%'}>
                      <Text variant={'regular'} color={'content'} fontSize={14}>
                        {moment(date).format('DD, MM YYYY hh:mmA')}
                      </Text>
                    </Box>
                  )}
                  <Box flexDirection="row" marginTop="my2">
                    <Clickable
                      borderWidth={0.4}
                      borderRadius={3}
                      flexDirection="row"
                      marginRight={'mx3'}
                      alignItems="center"
                      onPress={editLocation}
                      paddingHorizontal="mx3">
                      <Icon name="edit" color={content} size={12} />
                      <Text variant="regular">Edit</Text>
                    </Clickable>
                    <Clickable
                      borderWidth={0.4}
                      borderRadius={3}
                      onPress={() => setLocation(false)}
                      flexDirection="row"
                      alignItems="center"
                      paddingHorizontal="mx3">
                      <Icon name="trash" color={content} size={12} />
                      <Text variant="regular">Remove</Text>
                    </Clickable>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </ScrollView>
      </Box>
      {motorLocation && (
        <LocationFormModal
          isVisible={motorLocation}
          closeAction={() => setMotorLocation(false)}
        />
      )}
      {location && (
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
            borderRadius={5}
            isloading={isLoading}
            childColor={'white'}
            onPress={handleSubmit(onSubmit)}
            type="primary"
            label="Book Service"
          />
        </Box>
      )}
    </Container>
  );
};

export default UploadCar;
