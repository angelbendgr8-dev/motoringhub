import React, {useState} from 'react';
import Header from '../../Components/Header';

import Container from '../../Components/Container';
import Input from '../../Components/Input';
import Box from '../../Components/Box';
import Text from '../../Components/Text';
import {useTheme} from '@shopify/restyle';
import Button from '../../Components/Button';

import Icon from 'react-native-vector-icons/Entypo';
import {useForm, Controller} from 'react-hook-form';

import {useToast} from 'react-native-toast-notifications';
import {useDispatch} from 'react-redux';
import {updateCredentials} from '../../state/reducers/userAuth';
import {useNavigation} from '@react-navigation/native';
import {useChangePasswordMutation} from '../../state/services/SettingsService';
import {performAsyncCalls} from '../../helpers/constants';
import Clickable from '../../Components/Clickable';

const ChangePassword = () => {
  const theme = useTheme();
  const {content, background} = theme.colors;
  const {goBack} = useNavigation();
  const [secure, setSecure] = useState(true);

  const toast = useToast();

  const dispatch = useDispatch();

  const [changePassword, {isLoading}] = useChangePasswordMutation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      old: '',
      new: '',
      confirm: '',
    },
  });

  const onSubmit = async (credentials: any) => {
    if (credentials.new !== credentials.confirm) {
      toast.show("New Password doesn't match", {
        type: 'warning',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else {
      try {
        const response = await performAsyncCalls(credentials, changePassword);
        // console.log(response);
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
    }
  };

  return (
    <Container>
      <Header leftIcon={true} text={'Edit Profile'} />

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
                borderColor={'primary'}
                onChange={input => onChange(input)}
                // disabled={false}
                label="Old Password"
                customStyles={{}}
              />
            </Box>
          )}
          name="old"
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
                borderColor={'primary'}
                onChange={input => onChange(input)}
                label="New Password"
                customStyles={{}}
              />
            </Box>
          )}
          name="new"
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
                borderColor={'primary'}
                onChange={input => onChange(input)}
                label="Confirm Password"
                disabled={true}
                customStyles={{}}
              />
            </Box>
          )}
          name="confirm"
        />
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

export default ChangePassword;
