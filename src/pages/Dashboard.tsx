import {ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../Components/Container';
import Text from '../Components/Text';
import Box from '../Components/Box';
import Hr from '../Components/Hr';
import HeadNav from '../Components/HeadNav';
import CategoryList from './Category/CategoryList';
import Banner from '../Components/Banner';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {useTheme} from '@shopify/restyle';
import Card from '../Components/HCard';

const data = [{label: 'test', value: 'test'}];

const Dashboard = () => {
  const theme = useTheme();
  const {primary} = theme.colors;
  return (
    <Container>
      <Box paddingHorizontal="mx3">
        <ScrollView>
          <HeadNav />
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <Banner />
            <Banner />
          </ScrollView>
          <CategoryList />
          <Hr />
          <Box flexDirection="row">
            <Text variant="bold" fontSize={16}>
              Hot Deals
            </Text>
            <Icon name="hotjar" size={10} color={primary} style={{top: 5}} />
          </Box>

          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ScrollView>
      </Box>
    </Container>
  );
};

export default Dashboard;
