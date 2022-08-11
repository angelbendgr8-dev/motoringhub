import {ScrollView, ScrollViewBase} from 'react-native';
import React, {useRef, useState} from 'react';
import Header from '../../Components/Header';
import Container from '../../Components/Container';
import ProfilePhoto from '../../Components/ProfilePhoto';
import Input from '../../Components/Input';
import Box from '../../Components/Box';
import Text from '../../Components/Text';
import PhoneInput from 'react-native-phone-number-input';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useTheme} from '@shopify/restyle';
import Button from '../../Components/Button';

import {useForm, Controller} from 'react-hook-form';
import {useAuth} from '../../state/hooks/userAuth';

import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Clickable from '../../Components/Clickable';

import Icon2 from 'react-native-vector-icons/AntDesign';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch} from 'react-redux';
import {updateCredentials} from '../../state/reducers/userAuth';
import {useNavigation} from '@react-navigation/native';
import {useUpdateProfileInfoMutation} from '../../state/services/SettingsService';
import {performAsyncCalls} from '../../helpers/constants';
import _ from 'lodash';

const EditProfile = () => {
  const [code, setCode] = useState('234');
  const theme = useTheme();
  const {content, background} = theme.colors;
  const {goBack} = useNavigation();
  const phoneInput = useRef<PhoneInput>(null);
  const {user} = useAuth();
  const toast = useToast();
  const [phone, setPhone] = useState(user?.mobile_number);
  const [country, setCountry] = useState(user?.country);
  const [formattedValue, setFormattedValue] = useState(
    `+${user?.code}${user?.mobile_number}`,
  );
  const dispatch = useDispatch();
  const [openCalender, setOpenCalender] = useState(false);
  const [updateProfileInfo, {isLoading}] = useUpdateProfileInfoMutation();
  const [pickedDate, setPickedDate] = useState<Date>(
    user?.date_of_birth
      ? new Date(user?.date_of_birth)
      : new Date(moment().format('yyyy-MM-DD')),
  );
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: user?.email,
      name: user?.name,
      date_of_birth: pickedDate,
      mobile_number: user?.mobile_number,
    },
  });

  const onSubmit = async (credentials: any) => {
    const phoneValid = phoneInput.current?.isValidNumber(formattedValue);
    const formData = {...credentials, code, country};
    console.log(formData);
    if (phoneValid) {
      try {
        const response = await performAsyncCalls(formData, updateProfileInfo);
        console.log(response);
        const {data} = response;
        if (!response?.success) {
          toast.show(response?.message, {
            type: 'danger',
            placement: 'top',
            duration: 4000,
            animationType: 'zoom-in',
          });
        } else {
          toast.show(response?.message, {
            type: 'success',
            placement: 'top',
            duration: 4000,
            animationType: 'zoom-in',
          });
          dispatch(
            updateCredentials({
              user: data?.user,
            }),
          );
          goBack();
        }
      } catch (error: any) {
        console.log(error);
        toast.show('Service Error, Please try again!!', {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          animationType: 'zoom-in',
        });
      }
    } else {
      toast.show('Invalid Mobile number', {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        offset: 30,
        animationType: 'zoom-in',
      });
    }
  };
  return (
    <Container>
      <Header leftIcon={true} text={'Edit Profile'} />
      <Box marginBottom="my2">
        <ProfilePhoto />
      </Box>
      <Box paddingHorizontal="mx3" backgroundColor="grey" flex={1}>
        <Text variant="medium" marginVertical="my2" color="content">
          Personal Information
        </Text>
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
                borderColor={'primary'}
                onChange={input => onChange(input)}
                // disabled={false}
                label="Email"
                customStyles={{}}
              />
            </Box>
          )}
          name="email"
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
            <Box marginBottom="my3">
              <Input
                value={value}
                borderColor={'primary'}
                onChange={input => onChange(input)}
                label="Your name"
                disabled={true}
                customStyles={{}}
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
            <Box
              backgroundColor={'background'}
              flexDirection={'row'}
              borderRadius={10}
              justifyContent={'space-between'}
              marginBottom={'my3'}
              alignItems={'center'}
              //   paddingHorizontal={'mx2'}
              borderColor="content"
              borderWidth={1}
              height={heightPercentageToDP('6.5%')}
              //   style={customStyles}
            >
              {_.size(phone) > 0 && (
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
                defaultCode={user ? user?.country : 'NG'}
                layout="first"
                // placeholder=" "
                onChangeCountry={coun => {
                  setCode(coun.callingCode[0]);
                  setCountry(coun.cca2);
                }}
                onChangeText={text => {
                  setPhone(text);
                  onChange(text);
                }}
                onChangeFormattedText={text => {
                  setFormattedValue(text);
                  //   onChange(formattedValue);
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
        <Clickable
          onPress={() => setOpenCalender(true)}
          borderWidth={1}
          borderRadius={10}
          height={heightPercentageToDP('6.5%')}
          marginBottom="my3"
          paddingHorizontal="mx3"
          alignItems={'center'}
          justifyContent={'space-between'}
          borderColor={'content'}
          // marginHorizontal="mx4"
          flexDirection="row">
          <Text variant="medium" color="content" fontSize={12}>
            {moment(pickedDate).format('yyyy-MM-DD')}
          </Text>
          {/* <Clickable>
            <Icon2
              name={!openCalender ? 'calendar' : 'close'}
              color={!openCalender ? content : 'red'}
              size={16}
            />
          </Clickable> */}
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
                title={'Date of birth'}
                minuteInterval={15}
                // minimumDate={new Date(moment().add(20, 'minutes'))}
                mode={'date'}
                onCancel={() => {
                  setOpenCalender(false);
                }}
                onConfirm={sdate => {
                  console.log(sdate);
                  setOpenCalender(false);
                  setPickedDate(sdate);
                  // setDate(sdate);
                  onChange(moment(sdate).format('yyyy-MM-DD'));
                }}
                textColor={content}
                fadeToColor="#110d18"
                style={{backgroundColor: '#110d18'}}
              />
            </Box>
          )}
          name="date_of_birth"
        />
        <Box marginBottom="my3">
          <Input
            value={user?.country}
            borderColor={'primary'}
            onChange={input => {}}
            label="Your name"
            disabled={true}
            customStyles={{}}
          />
        </Box>
      </Box>
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
          label="Update"
        />
      </Box>
    </Container>
  );
};

export default EditProfile;
