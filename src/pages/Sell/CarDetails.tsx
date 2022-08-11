import {ScrollView} from 'react-native';
import React, {useContext, useState} from 'react';
import Header from '../../Components/Header';
import Container from '../../Components/Container';
import Box from '../../Components/Box';

import Input from '../../Components/Input';
import {useTheme} from '@shopify/restyle';
import Text from '../../Components/Text';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {useToast} from 'react-native-toast-notifications';

import {useForm, Controller} from 'react-hook-form';
import BottomSheet from '../../Components/BottomSheet';
import {ListItem} from './About';
import Select from '../../Components/Select';
import {ProductUploadContext} from '../../state/CarInfoContext';
import {generateYears} from '../../helpers/constants';
import Button from '../../Components/Button';
import Lottie from 'lottie-react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const gears = [
  {label: 'manual', value: 'manual'},
  {label: 'automatic', value: 'automatic'},
  {label: 'duplex', value: 'duplex'},
];

const body = [
  {label: 'Pickup', value: 'Pickup'},
  {label: 'Suv', value: 'Suv'},
  {label: 'Saloon', value: 'Saloon'},
];
const fuel = [
  {label: 'petrol', value: 'petrol'},
  {label: 'diesel', value: 'diesel'},
  {label: 'hybrid', value: 'hybrid'},
];
const condition = [
  {label: 'local', value: 'local'},
  {label: 'foreign', value: 'foreign'},
];

const CarDetails = () => {
  const theme = useTheme();
  const {content, background} = theme.colors;
  const {navigate, goBack} = useNavigation();
  const [selectMakerModal, setSelectMakerModal] = useState(false);
  const {
    caryear,
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
  } = useContext(ProductUploadContext);
  // const
  // console.log(generateYears(1900));
  const toast = useToast();

  const submit = () => {
    if (
      !caryear ||
      !mileage ||
      !fuelType ||
      !gearType ||
      !bodyType ||
      !sellingCondition
    ) {
      toast.show('Please fill all fields', {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else {
      goBack();
    }
  };

  return (
    <Container backgroundColor="background">
      <Header leftIcon={true} text={'Car body Information'} />
      <Box marginTop="m" flex={1} justifyContent="space-between">
        <Box paddingTop="my3" paddingHorizontal={'mx3'}>
          <Lottie
            source={require('../../assets/carloading.json')}
            autoPlay
            loop
            style={{height: heightPercentageToDP('10%')}}
          />
          <Box marginVertical="my3">
            <ListItem
              onPress={() => {
                setSelectMakerModal(true);
              }}
              title={caryear ? caryear : 'Car Year'}
              icon="down"
            />
          </Box>
          <Box marginBottom="my3">
            <Input
              value={mileage}
              onChange={input => setMileage(input)}
              label="Car Mileage"
              customStyles={{}}
            />
          </Box>
          <Box marginBottom="my3">
            <Select
              defaultValue={bodyType ? bodyType : 'Select body type'}
              onSelect={temp => setBodyType(temp)}
              label={"what's your car body"}
              data={body}
            />
          </Box>

          <Box marginBottom="my3">
            <Select
              onSelect={temp => setGearType(temp)}
              label={"what's your gear type"}
              data={gears}
            />
          </Box>

          <Box marginBottom="my3">
            <Select
              onSelect={temp => setFuelType(temp)}
              label={"what's your fuel type"}
              data={fuel}
            />
          </Box>

          <Box marginBottom="my3">
            <Select
              onSelect={temp => setSellingCondition(temp)}
              label={"what's your car condition"}
              data={condition}
            />
          </Box>
        </Box>
      </Box>
      <Box
        paddingVertical="my2"
        backgroundColor="grey"
        paddingHorizontal="mx3"
        elevation={14}
        borderTopColor={'border'}
        borderTopWidth={1}
        shadowColor="border"
        shadowOffset={{height: 10, width: 10}}>
        <Button
          paddingVertical="mx3"
          paddingHorizontal="s"
          borderRadius={5}
          disabled={
            !caryear ||
            !mileage ||
            !fuelType ||
            !gearType ||
            !bodyType ||
            !sellingCondition
              ? true
              : false
          }
          onPress={submit}
          type="primary"
          label="Continue"
        />
      </Box>
      {selectMakerModal && (
        <BottomSheet
          data={generateYears(1900)}
          visible={selectMakerModal}
          select={year => setCaryear(year)}
          closeAction={() => {
            setSelectMakerModal(false);
          }}
        />
      )}
    </Container>
  );
};

export default CarDetails;
