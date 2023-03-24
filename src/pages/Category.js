import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../Components/Container';
import Header from '../Components/Header';
import Box from '../Components/Box';
import Services from './Category/Services';
import {useGetServicesQuery} from '../state/services/ContentService';
import _ from 'lodash';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {Loader} from '../Components/Loader';
import AnimatedLottieView from 'lottie-react-native';

const Category = () => {
  const {data, error, refetch, isLoading} = useGetServicesQuery({
    pollingInterval: 500,
  });
  const [services, setServices] = useState([]);
  const {navigate} = useNavigation();
  useEffect(() => {
    if (data) {
      // console.log(data);
      setServices(data.data);
    }
  }, [data]);

  return (
    <Container>
      <Header leftIcon={true} text={'Services'} />
      {isLoading && (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Box >
            <AnimatedLottieView
              source={require('../assets/login.json')}
              autoPlay
              loop
              style={styles.lottie}
            />
          </Box>
        </Box>
      )}
      <Box paddingHorizontal="mx3" marginTop="m">
        {!_.isEmpty(services) ? (
          <ScrollView
            style={{marginBottom: heightPercentageToDP('8%')}}
            showsVerticalScrollIndicator={false}>
            <View>
              {[...services].map((service, index) => (
                <Services
                  key={index}
                  onPress={() => navigate('ServiceDetails', {service})}
                  service={service}
                />
              ))}
            </View>
          </ScrollView>
        ) : (
          <Box></Box>
        )}
      </Box>
    </Container>
  );
};

export default Category;

const styles = StyleSheet.create({
  lottie: {
    width: 150,
    height: 150,
  },
});
