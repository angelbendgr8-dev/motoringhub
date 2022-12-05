import {StyleSheet} from 'react-native';
import React, {useContext, useState} from 'react';
import Header from '../../Components/Header';
import Container from '../../Components/Container';
import Box from '../../Components/Box';

import Input from '../../Components/Input';
import {useTheme} from '@shopify/restyle';
import Button from '../../Components/Button';
import Text from '../../Components/Text';
import _ from 'lodash';

import Icon2 from 'react-native-vector-icons/AntDesign';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Clickable from '../../Components/Clickable';
import {LocationContext} from '../../state/LocationContext';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';

const RequestLocation = () => {
  const [openCalender, setOpenCalender] = useState(false);
  const [pickedDate, setPickedDate] = useState<Date>(
    new Date(moment().format('yyyy-MM-DD')),
  );
  const theme = useTheme();
  const {goBack} = useNavigation();
  const {content, primary} = theme.colors;
  const {setDate, setAddress, setState, setArea, setType, setLocation} =
    useContext(LocationContext);
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
  const updateLocation = () => {
    setLocation(true);
    setType('Pickup');
    goBack();
  };
  return (
    <Container>
      <Header leftIcon={true} text={'Enter your Location'} />
      <Box marginTop="m" flex={1} justifyContent="space-between">
        <Box>
          <Clickable
            onPress={() => setOpenCalender(true)}
            borderWidth={1}
            borderRadius={10}
            height={heightPercentageToDP('6.5%')}
            marginBottom="m"
            paddingHorizontal="mx3"
            alignItems={'center'}
            justifyContent={'space-between'}
            borderColor={'content'}
            marginHorizontal="mx4"
            flexDirection="row">
            <Text variant="medium" color="content" fontSize={12}>
              {moment(pickedDate).format('yyyy-MM-DD  hh:mmA')}
            </Text>
            <Clickable>
              <Icon2
                name={!openCalender ? 'calendar' : 'close'}
                color={!openCalender ? content : 'red'}
                size={16}
              />
            </Clickable>
          </Clickable>
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
              <Box alignItems="center">
                <DatePicker
                  open={openCalender}
                  date={pickedDate}
                  modal
                  title={'Video Time'}
                  minuteInterval={15}
                  // minimumDate={new Date(moment().add(20, 'minutes'))}
                  mode={'datetime'}
                  onCancel={() => {
                    setOpenCalender(false);
                  }}
                  onConfirm={sdate => {
                    console.log(sdate);
                    setOpenCalender(false);
                    setPickedDate(sdate);
                    setDate(sdate);
                    onChange(sdate);
                  }}
                  textColor={content}
                  fadeToColor="#110d18"
                  style={{backgroundColor: '#110d18'}}
                />
              </Box>
            )}
            name="date"
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
                    setState(input);
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
                    setArea(input);
                    onChange(input);
                  }}
                  label="City"
                />
              </Box>
            )}
            name="area"
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
                    setAddress(input);
                    onChange(input);
                  }}
                  label="HouseAddress"
                />
              </Box>
            )}
            name="address"
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

export default RequestLocation;

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
