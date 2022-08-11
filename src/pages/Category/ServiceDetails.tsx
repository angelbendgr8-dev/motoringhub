import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../Components/Container';
import Box from '../../Components/Box';
import Header from '../../Components/Header';
import Text from '../../Components/Text';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from '../../Components/Button';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useNavigation, useRoute} from '@react-navigation/native';
import _ from 'lodash';
import {assetUrl} from '../../helpers/constants';

const ListItem = ({process}: {process: string}) => {
  return (
    <Box flexDirection="row" alignItems="center">
      <Icon name="star" size={8} />

      <Text variant="medium" marginLeft="s" fontSize={14}>
        {process}
      </Text>
    </Box>
  );
};

const ServiceDetails = () => {
  const {navigate} = useNavigation();
  const {params} = useRoute();
  const {service} = params;
  const [process, setProcess] = useState([]);

  useEffect(() => {
    if (service.process) {
      setProcess(service.process.split(','));
    }
  }, []);

  return (
    <Container>
      <Header leftIcon={true} text={'Service Details'} />
      <Image
        source={{uri: `${assetUrl()}/${service.picture}`}}
        style={styles.image}
      />
      <Box flex={1} justifyContent="space-around">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box backgroundColor="grey" padding="mx3" marginBottom="mx2">
            <Text variant="bold" color="title" fontSize={14}>
              {service.name}
            </Text>

            <Text variant="regular" marginVertical="s" fontSize={15}>
              {service.description}
            </Text>
          </Box>
          {!_.isEmpty(service.process) && (
            <Box backgroundColor="grey" padding="mx3" marginBottom="mx2">
              <Text variant="bold" color="title" fontSize={14}>
                Our Process:
              </Text>
              <Box marginBottom="my2">
                {_.map(process, (item, index) => (
                  <ListItem key={index} process={item} />
                ))}
              </Box>
            </Box>
          )}

          {!_.isEmpty(service.assurance) && (
            <Box backgroundColor="grey" padding="mx3" marginBottom="mx2">
              <Text variant="bold" color="title" fontSize={14}>
                Our Assurance
              </Text>
              <Text variant="regular" marginVertical="s" fontSize={14}>
                {service.assurance}
              </Text>
            </Box>
          )}
        </ScrollView>
        <Box
          paddingVertical="my2"
          backgroundColor="grey"
          paddingHorizontal="mx3"
          elevation={14}
          borderTopColor={'grey'}
          borderTopWidth={1}
          shadowColor="grey"
          shadowOffset={{height: 10, width: 10}}>
          <Button
            paddingVertical="mx3"
            paddingHorizontal="s"
            borderRadius={5}
            onPress={() => navigate('RequestService', {service})}
            type="primary"
            label="Book Service"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  image: {
    width: widthPercentageToDP('100%'),
    height: heightPercentageToDP('25%'),
  },
});
