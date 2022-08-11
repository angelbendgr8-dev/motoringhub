import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../Components/Container';
import Header from '../Components/Header';
import Box from '../Components/Box';
import Services from './Category/Services';
import {useGetServicesQuery} from '../state/services/ContentService';
import _ from 'lodash';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const Category = () => {
  const {data, error, refetch} = useGetServicesQuery({pollingInterval: 500});
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
      <Box paddingHorizontal="mx3" marginTop="m">
        <ScrollView
          style={{marginBottom: heightPercentageToDP('8%')}}
          showsVerticalScrollIndicator={false}>
          {!_.isEmpty(services) && (
            <View>
              {[...services].map((service, index) => (
                <Services
                  key={index}
                  onPress={() => navigate('ServiceDetails', {service})}
                  service={service}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </Box>
    </Container>
  );
};

export default Category;
