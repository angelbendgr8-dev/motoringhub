import {ScrollView, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';
import Container from '../../Components/Container';
import {createBox, useTheme} from '@shopify/restyle';
import Input from '../../Components/Input';
import Text from '../../Components/Text';

import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import PhoneInput from 'react-native-phone-number-input';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Button from '../../Components/Button';
import {useNavigation} from '@react-navigation/native';
import HeadNav from '../../Components/HeadNav';
import Clickable from '../../Components/Clickable';

import {useForm, Controller} from 'react-hook-form';

import {useToast} from 'react-native-toast-notifications';
import {useSignupMutation} from '../../state/services/userAuth';
import {performAsyncCalls} from '../../helpers/constants';
import {setCredentials} from '../../state/reducers/userAuth';
import {useDispatch} from 'react-redux';

const Box = createBox();
const Register = () => {
  const [secure, setSecure] = React.useState(true);

  const {navigate} = useNavigation();
  const [phone, setPhone] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [code, setCode] = useState('234');
  const [country, setCountry] = useState('NG');
  const phoneInput = useRef<PhoneInput>(null);
  const toast = useToast();
  const [signup, {isLoading}] = useSignupMutation();
  const dispatch = useDispatch();

  const theme = useTheme();
  const {primary, content, background} = theme.colors;
  const {my2, mx3, s} = theme.spacing;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      mobile_number: '',
      email: '',
      password: '',
    },
  });

  const submit = async (credentials: any) => {
    const phoneValid = phoneInput.current?.isValidNumber(formattedValue);
    const formData = {...credentials, code, country};
    console.log(formData);
    if (phoneValid) {
      try {
        const response = await performAsyncCalls(formData, signup);
        if (!response?.success) {
          const {data} = response;
          toast.show(data.email ? data?.email : data?.password, {
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
            setCredentials({
              user: response?.data?.user,
              token: response?.data?.token,
            }),
          );
          navigate('Dashboard');
        }
      } catch (error: any) {
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
      <HeadNav leftIcons={false} hasSkip={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingHorizontal={'mx3'} flex={1} paddingTop={'my3'}>
          <Box marginVertical={'my4'}>
            <Text variant={'medium'}>Welcome,</Text>
            <Text variant="medium">Register Now</Text>
          </Box>
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
              <Box marginVertical="my2">
                <Input
                  value={value}
                  onChange={input => onChange(input)}
                  label="Name"
                  type="none"
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
              <Box marginVertical="my2">
                <Input
                  value={value}
                  onChange={input => onChange(input)}
                  label="Email"
                  type="emailAddress"
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
              <Box
                backgroundColor={'background'}
                flexDirection={'row'}
                borderRadius={10}
                justifyContent={'space-between'}
                marginVertical={'my2'}
                alignItems={'center'}
                //   paddingHorizontal={'mx2'}
                borderColor={errors.phone_number ? 'primary' : 'content'}
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
                  onChangeCountry={country => {
                    setCode(country.callingCode[0]);
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
              <Box marginVertical="my2">
                <Input
                  value={value}
                  onChange={input => onChange(input)}
                  label="password"
                  type="password"
                  secure={secure}
                  rightBtn={() => (
                    <Clickable onPress={() => setSecure(!secure)}>
                      <Icon
                        color={content}
                        size={16}
                        name={secure ? 'eye' : 'eye-with-line'}
                      />
                    </Clickable>
                  )}
                />
              </Box>
            )}
            name="password"
          />

          <Button
            paddingVertical="mx3"
            marginTop="my4"
            paddingHorizontal="s"
            borderRadius={5}
            isloading={isLoading}
            onPress={handleSubmit(submit)}
            type="primary"
            childColor={'white'}
            textType="uppercase"
            textFont={14}
            label="Sign Up"
          />
          <Box>
            <Button
              paddingVertical="mx3"
              marginVertical="my4"
              hasIcon={true}
              buttonIcon={() => (
                <Icon2 name="gmail" color={primary} size={20} />
              )}
              paddingHorizontal="s"
              marginBottom="my3"
              borderRadius={5}
              onPress={() => {}}
              type="outline"
              textType="none"
              textFont={12}
              label="Continue with Google"
            />
          </Box>
          <Box
            flexDirection={'row'}
            alignItems="center"
            justifyContent="center">
            <Text variant="medium" fontSize={15}>
              Already have an account?
            </Text>
            <Clickable onPress={() => navigate('Login')} marginRight="mx2">
              <Text textDecorationLine="underline" variant="bold" fontSize={15}>
                {'  Sign In'}
              </Text>
            </Clickable>
          </Box>
        </Box>
      </ScrollView>
    </Container>
  );
};

export default Register;

const styles = StyleSheet.create({});
