import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../Components/Container';
import Text from '../Components/Text';
import Box from '../Components/Box';
import Hr from '../Components/Hr';
import HeadNav from '../Components/HeadNav';
import CategoryList from './Category/CategoryList';
import Banner from '../Components/Banner';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import New from 'react-native-vector-icons/Entypo';
import {useTheme} from '@shopify/restyle';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import MarketCategory from './Market/MarketCategory';
import {
  useGetProductsQuery,
  useGetSparePartsQuery,
} from '../state/services/ProductService';
import {useDispatch} from 'react-redux';
import {setCars, setParts} from '../state/reducers/productReducer';

// const data = [{label: 'test', value: 'test'}];

const Dashboard = () => {
  const theme = useTheme();
  const {primary} = theme.colors;
  const {data, isLoading: carsLoading} = useGetProductsQuery();
  const {data: partsData, isLoading: partsLoading} = useGetSparePartsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setCars(data.data));
    }
  }, [data, dispatch]);
  useEffect(() => {
    if (partsData) {
      dispatch(setParts(partsData.data));
    }
  }, [partsData, dispatch]);

  return (
    <Container>
      <Box paddingHorizontal="mx3">
        <HeadNav />
        <Box />
        <ScrollView showsVerticalScrollIndicator={false}>
          <ScrollView
            style={{marginVertical: heightPercentageToDP('4%')}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}>
            <Banner />
            <Banner />
          </ScrollView>
          <CategoryList />
          <Hr />
          <MarketCategory
            title={'Hot Deals'}
            icon={() => (
              <Icon name="hotjar" size={10} color={primary} style={{top: 5}} />
            )}
          />
          <Hr />
          <MarketCategory
            title={'New Deals'}
            icon={() => (
              <New name="new" size={14} color={primary} style={{top: 5}} />
            )}
          />
        </ScrollView>
      </Box>
    </Container>
  );
};

export default Dashboard;
