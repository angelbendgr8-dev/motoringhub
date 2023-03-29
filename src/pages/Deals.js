import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import Container from '../Components/Container';
import Header from '../Components/Header';
import Banner from '../Components/Banner';
import Box from '../Components/Box';
import {bookinspection, evaluation, help} from '../assets';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Text from '../Components/Text';
import Clickable from '../Components/Clickable';
import Icon from 'react-native-vector-icons/AntDesign';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from '@shopify/restyle';
import {useNavigation} from '@react-navigation/native';

const HiwItem = ({image, text, content}) => {
  return (
    <Box
      padding="mx2"
      margin="mx2"
      backgroundColor="background"
      elevation={5}
      justifyContent="center"
      alignItems="flex-start"
      borderRadius={10}
      width={widthPercentageToDP('42.5%')}
      height={heightPercentageToDP('17%')}>
      <Box flexDirection="row" justifyContent="space-between">
        <Image source={image} style={{height: 20, width: 20}} />
        <Text variant="medium" color="title" fontSize={RFValue(15)}>
          {text}
        </Text>
      </Box>
      <Text variant="regular" color="content" fontSize={RFValue(12)}>
        {content}
      </Text>
    </Box>
  );
};
const WhyItem = ({image, text}) => {
  const theme = useTheme();
  const {primary} = theme.colors;
  return (
    <Box
      flexDirection="row"
      backgroundColor="background"
      paddingVertical="my2"
      paddingHorizontal="mx2"
      borderRadius={10}
      marginVertical="mx2"
      alignItems="center"
      justifyContent="space-between">
      <Box flexDirection="row" alignItems="center">
        <Image
          source={evaluation}
          style={{height: 40, width: 40, borderRadius: 60}}
        />
        <Text
          paddingLeft="mx2"
          variant="medium"
          color="title"
          fontSize={RFValue(15)}>
          {'Quick online Evaluation'}
        </Text>
      </Box>
      <Icon name="checkcircle" color={primary} size={15} />
    </Box>
  );
};

const Deals = () => {
  const {navigate} = useNavigation();
  return (
    <Container backgroundColor="grey">
      <Header leftIcon={false} text={'About Selling Cars'} />
      <Box marginTop="my2" marginHorizontal="mx3">
        <ScrollView
          style={{marginBottom: heightPercentageToDP('7%')}}
          showsVerticalScrollIndicator={false}>
          <ImageBackground source={help} style={styles.imgContainer}>
            <Box
              height={'100%'}
              justifyContent="space-around"
              paddingLeft="mx2"
              width="100%"
              style={{backgroundColor: 'rgba(0,0,0,0.3)'}}>
              <Text variant="medium" color="white" fontSize={15}>
                Sell with our marketplace
              </Text>
              <Text variant="regular" color="white" fontSize={12}>
                Take advantage of our network and get your car sold with no
                delay through motoringhub. This is fast and extremely convenient
              </Text>
              <Clickable
                alignItems="center"
                justifyContent="center"
                flexDirection="row"
                onPress={() => navigate('AboutCar')}
                borderRadius={3}
                width={widthPercentageToDP('30%')}
                backgroundColor="primary">
                <Text
                  variant="regular"
                  color="white"
                  paddingVertical="my1"
                  marginRight="mx3"
                  fontSize={12}>
                  Get Started
                </Text>
                <Icon name="right" color={'white'} />
              </Clickable>
            </Box>
          </ImageBackground>
          <Box marginVertical="my3">
            <Text variant="medium" color="content" fontSize={16}>
              How it Works
            </Text>
            <Text
              variant="bold"
              marginVertical="my2"
              color="title"
              fontSize={14}>
              Find great value for your car and get paid in no time
            </Text>
            <Text variant="regular" color="content" fontSize={14}>
              The standard chunk of Lorem Ipsum used since the 1500s is
              reproduced below for those interested. Sections 1.10.32 and
              1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
              repr oduced in their exact original form, accompanied by English
              versions from the 1914 translation by H. Rackham.
            </Text>
          </Box>
          <Box flexDirection="row" flexWrap="wrap">
            <HiwItem
              image={bookinspection}
              text="Book Inspection"
              content="you get to book an appointment for you car to be inspected"
            />
            <HiwItem
              image={bookinspection}
              text="Book Inspection"
              content="you get to book an appointment for you car to be inspected"
            />
            <HiwItem
              image={bookinspection}
              text="Book Inspection"
              content="you get to book an appointment for you car to be inspected"
            />
            <HiwItem
              image={bookinspection}
              text="Book Inspection"
              content="you get to book an appointment for you car to be inspected"
            />
          </Box>

          <Box marginVertical="my4" elevation={5}>
            <WhyItem />
            <WhyItem />
            <WhyItem />
            <WhyItem />
          </Box>
        </ScrollView>
      </Box>
    </Container>
  );
};

export default Deals;

const styles = StyleSheet.create({
  imgContainer: {
    justifyContent: 'center',
    // paddingLeft: widthPercentageToDP('2%'),
    height: heightPercentageToDP('25%'),
    width: widthPercentageToDP('94%'),
    // marginRight: 10,
  },
});
