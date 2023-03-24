import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import {createBox, useTheme} from '@shopify/restyle';
import Input from '../../Components/Input';
import Text from '../../Components/Text';

import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import {useForm, Controller} from 'react-hook-form';

import {useToast} from 'react-native-toast-notifications';

import Button from '../../Components/Button';
import {useNavigation} from '@react-navigation/native';
import Links from '../../Components/Links';
import HeadNav from '../../Components/HeadNav';
import Clickable from '../../Components/Clickable';
import {useLoginMutation} from '../../state/services/userAuth';
import {performAsyncCalls} from '../../helpers/constants';
import {useDispatch} from 'react-redux';
import {setCredentials} from '../../state/reducers/userAuth';

const Box = createBox();
const Login = () => {
  const [secure, setSecure] = React.useState(true);
  const toast = useToast();

  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch();

  const {navigate} = useNavigation();
  const theme = useTheme();
  const {primary, content} = theme.colors;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submit = async credentials => {
    const response = await performAsyncCalls(credentials, login);
    try {
      if (!response?.success) {
        // console.log(response);
        toast.show(response?.message, {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          offset: 30,
          animationType: 'zoom-in',
        });
      } else {
        console.log(response);
        toast.show(response?.message, {
          type: 'success',
          placement: 'top',
          duration: 4000,
          offset: 30,
          animationType: 'zoom-in',
        });
        dispatch(
          setCredentials({
            user: response?.data.user,
            token: response?.data.token,
          }),
        );
        navigate('Dashboard');
      }
    } catch (error) {
      toast.show('Service Error, Please try again!!', {
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
      <HeadNav text={'Sign In'} leftIcons={false} hasSkip={true} />
      <Box paddingHorizontal={'mx3'} flex={1} paddingTop={'my7'}>
        <Box marginVertical={'my4'}>
          <Text variant={'medium'}>Hey,</Text>
          <Text variant="medium">Login Now</Text>
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
            <Box marginVertical="my2">
              <Input
                label="password"
                value={value}
                onChange={input => onChange(input)}
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
        <Clickable
          alignSelf={'flex-end'}
          // backgroundColor="primary"
          onPress={() => navigate('ForgotPassword')}>
          <Text
            variant="medium"
            marginBottom="my3"
            color="primary"
            textAlign="right"
            fontSize={15}>
            Forgot Password?
          </Text>
        </Clickable>
        <Button
          paddingVertical="mx3"
          marginTop="my4"
          paddingHorizontal="s"
          borderRadius={5}
          isloading={isLoading}
          onPress={handleSubmit(submit)}
          type="primary"
          childColor="white"
          textType="uppercase"
          textFont={14}
          label="Sign in"
        />
        <Box>
          <Button
            paddingVertical="mx3"
            marginVertical="my4"
            hasIcon={true}
            buttonIcon={() => <Icon2 name="gmail" color={primary} size={20} />}
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
        <Box flexDirection={'row'} alignItems="center" justifyContent="center">
          <Text variant="medium" fontSize={15}>
            Don't have an account?
          </Text>
          <Clickable onPress={() => navigate('Register')} marginRight="mx2">
            <Text textDecorationLine="underline" variant="bold" fontSize={15}>
              {'  Sign Up'}
            </Text>
          </Clickable>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({});
