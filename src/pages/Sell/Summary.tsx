import {} from 'react-native';
import React from 'react';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import Clickable from '../../Components/Clickable';
import Box from '../../Components/Box';
import Text from '../../Components/Text';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign'

const Summary = () => {
  return (
    <Container>
      <Header leftIcon={true} text={'Product Information'} />
      <Box
        borderWidth={0.5}
        borderColor={'primary'}
        backgroundColor="lighterprimary"
        padding="mx4"
        borderRadius={5}>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant={'medium'} color={'title'} fontSize={14}>
            {'honda celvic 2021'}
          </Text>
          <Box
            backgroundColor="primary"
            borderRadius={3}
            paddingHorizontal="mx2">
            <Text variant={'medium'} color="background" fontSize={14}>
              {'automatic'}
            </Text>
          </Box>
        </Box>
        <Box width={'50%'}>
          <Text variant={'medium'} color={'content'} fontSize={14}>
            {'Automatic car'}
          </Text>
        </Box>
        <Box width={'50%'}>
          <Text variant={'medium'} color={'content'} fontSize={14}>
            {'Automatic car'}
          </Text>
        </Box>

        <Box width={'50%'}>
          <Text variant={'regular'} color={'content'} fontSize={14}>
            {moment().format('DD, MM YYYY hh:mmA')}
          </Text>
        </Box>

        <Box flexDirection="row" marginTop="my2">
          <Clickable
            borderWidth={0.4}
            borderRadius={3}
            flexDirection="row"
            marginRight={'mx3'}
            alignItems="center"
            onPress={() => {}}
            paddingHorizontal="mx3">
            <Icon name="edit" color={'content'} size={12} />
            <Text variant="regular">Edit</Text>
          </Clickable>
          <Clickable
            borderWidth={0.4}
            borderRadius={3}
            onPress={() => {}}
            flexDirection="row"
            alignItems="center"
            paddingHorizontal="mx3">
            <Icon name="trash" color={'content'} size={12} />
            <Text variant="regular">Remove</Text>
          </Clickable>
        </Box>
      </Box>
    </Container>
  );
};

export default Summary;
