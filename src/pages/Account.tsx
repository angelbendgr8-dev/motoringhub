import {Image, StyleSheet} from 'react-native';
import React from 'react';
import Container from '../Components/Container';
import Header from '../Components/Header';
import {avatar} from '../assets';
import Box from '../Components/Box';
import Text from '../Components/Text';
import Clickable from '../Components/Clickable';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import Customer from 'react-native-vector-icons/AntDesign';
import Wish from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@shopify/restyle';
import Button from '../Components/Button';
import {useNavigation} from '@react-navigation/native';

import {useAuth} from '../state/hooks/userAuth';
import {useDispatch} from 'react-redux';
import {signOut} from '../state/reducers/userAuth';
import {assetUrl} from '../helpers/constants';
import AnimatedLottieView from 'lottie-react-native';

type ItemProps = {
  icon: Element;
  text: string;
  desc: string;
  onPress: () => void;
};

const AccountItem: React.FC<ItemProps> = ({icon, onPress, text, desc}) => {
  return (
    <Clickable
      flexDirection="row"
      paddingVertical="my2"
      onPress={onPress}
      borderBottomWidth={1}
      borderBottomColor={'border'}
      alignItems="center"
      justifyContent="flex-start">
      <Box marginRight="mx4">{icon}</Box>
      <Box>
        <Text variant="medium" color="title" fontSize={RFValue(14)}>
          {text}
        </Text>
        <Text variant="regular" fontSize={RFValue(12)}>
          {desc}
        </Text>
      </Box>
    </Clickable>
  );
};

const Account = () => {
  const theme = useTheme();
  const {content} = theme.colors;
  const {navigate} = useNavigation();
  const {user, token} = useAuth();
  const dispatch = useDispatch();

  const renderFileUri = () => {
    if (user?.profile_pics) {
      console.log(`${assetUrl()}/${user.profile_pics}`, 'here');
      return (
        <Image
          source={{uri: `${assetUrl()}/${user.profile_pics}`}}
          style={styles.img}
        />
      );
    } else {
      return (
        <Box flex={2} justifyContent="center" alignItems="center">
          <Icon name={'user'} size={72} />
        </Box>
      );
    }
  };

  return (
    <Container>
      <Header leftIcon={true} text={'Account'} />
      {!token ? (
        <Box flex={1} alignItems={'center'} justifyContent={'center'}>
          <Box >
            <AnimatedLottieView
              source={require('../assets/login.json')}
              autoPlay
              loop
              style={styles.lottie}
            />
            <Button
              paddingVertical="mx3"
              marginVertical="my4"
              hasIcon={true}
              paddingHorizontal="m"
              marginBottom="my3"
              borderRadius={5}
              onPress={() => {}}
              textType="none"
              textFont={12}
              label="LOG IN"
            />
          </Box>
        </Box>
      ) : (
        <Box>
          <Box
            backgroundColor="border"
            flexDirection="row"
            alignItems="center"
            width={'100%'}
            borderRadius={5}
            padding="mx4">
            {renderFileUri()}
            <Box
              flex={4}
              marginLeft="m"
              alignItems="flex-start"
              justifyContent="center">
              <Text variant="bold" fontSize={RFValue(15)} color="title">
                {user?.name}
              </Text>
              <Text variant="regular" color="content">
                {user?.email}
              </Text>
              <Clickable
                backgroundColor="primary"
                marginTop="mx3"
                paddingHorizontal="mx4"
                onPress={() => navigate('EditProfile')}
                paddingVertical="my1"
                width={'50%'}
                borderRadius={5}>
                <Text variant="regular" color="background" textAlign="center">
                  Edit Profile
                </Text>
              </Clickable>
            </Box>
          </Box>
          <Box paddingHorizontal="mx3" backgroundColor="grey" paddingTop="my2">
            <AccountItem
              icon={<Icon2 name="shopping-cart" color={content} size={24} />}
              text={'Request'}
              desc="Your services request status and progress"
            />
            <AccountItem
              icon={
                <Wish name="account-heart-outline" color={content} size={24} />
              }
              text={'Your WishList'}
              desc="Your saved products"
            />
            <AccountItem
              icon={<Wish name="security" color={content} size={24} />}
              text={'Security Setting'}
              onPress={() => navigate('ChangePassword')}
              desc="Update your account password"
            />
          </Box>
          <Box
            paddingHorizontal="mx3"
            paddingBottom="my3"
            flex={1}
            marginTop="my1"
            backgroundColor="grey">
            <AccountItem
              icon={<Wish name="car-info" color={content} size={24} />}
              text={'Term and Condition'}
              desc="T/C for use of platform"
            />
            <AccountItem
              icon={
                <Customer name="customerservice" color={content} size={24} />
              }
              text={'Help/Customer Care'}
              desc="Customer Supports and FAQs"
            />
            <Button
              backgroundColor="grey"
              marginTop="my2"
              paddingVertical="mx3"
              onPress={() => dispatch(signOut())}
              borderRadius={5}
              label="Log out"
              type="secondary"
            />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Account;
const styles = StyleSheet.create({
  profile: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: widthPercentageToDP('5%'),
  },
  picture: {
    // backgroundColor: colors.white,
    height: 105,
    width: 105,
    borderRadius: 60,
    // borderColor: '#FBBA16',
    // borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 64,
    width: 64,
    borderRadius: 60,
    // backgroundColor: 'red',
  },

  lottie: {
    width: 150,
    height: 150,
  },
});
