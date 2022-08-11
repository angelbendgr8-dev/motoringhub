import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import {createBox, useTheme} from '@shopify/restyle';
import Input from '../../Components/Input';
import Text from '../../Components/Text';

import Icon from 'react-native-vector-icons/Entypo';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Button from '../../Components/Button';
import {useNavigation} from '@react-navigation/native';
import Links from '../../Components/Links';
import HeadNav from '../../Components/HeadNav';
import Clickable from '../../Components/Clickable';

const Box = createBox();
const ForgotPassword = () => {
  const [secure, setSecure] = React.useState(true);
  const [loading, setLoading] = useState(false);

  const {navigate} = useNavigation();
  const theme = useTheme();
  const {primary, content} = theme.colors;
  const {my2, mx3, s} = theme.spacing;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('Dashboard');
    }, 3000);
  };
  return (
    <Container>
      <HeadNav text={'Sign In'} leftIcons={false} hasSkip={true} />
      <Box paddingHorizontal={'mx3'} flex={1} paddingTop={'my7'}>
        <Box marginVertical={'my4'}>
          {/* <Text variant={'medium'}>Hey,</Text> */}
          <Text variant="medium">Forgot Password</Text>
        </Box>
        <Box marginVertical="my2">
          <Input label="Email" type="email" />
        </Box>

        <Button
          paddingVertical="mx3"
          marginTop="my4"
          paddingHorizontal="s"
          borderRadius={5}
          onPress={() => {}}
          type="primary"
          textType="uppercase"
          textFont={14}
          label="Sign in"
        />

        <Box flexDirection={'row'} alignItems="center" justifyContent="center">
          <Text variant="medium" fontSize={15}>
            Back To
          </Text>
          <Clickable onPress={() => navigate('Login')} marginRight="mx2">
            <Text textDecorationLine="underline" variant="bold" fontSize={15}>
              {'  Sign in'}
            </Text>
          </Clickable>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
