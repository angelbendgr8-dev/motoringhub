import {ActivityIndicator, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../Components/Container';
import Text from '../Components/Text';
import Box from '../Components/Box';
import Hr from '../Components/Hr';
import HeadNav from '../Components/HeadNav';
import CategoryList from './Category/CategoryList';
import Banner from '../Components/Banner';
import {useTheme} from '@shopify/restyle';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import ShowParts from './Market/ShowParts';
import {useGetProductsQuery} from '../state/services/ProductService';
import {useDispatch} from 'react-redux';
import {setCars} from '../state/reducers/productReducer';
import {useProduct} from '../state/hooks/product';
import {FlatList} from 'react-native-gesture-handler';
import Card from '../Components/Card';
import _ from 'lodash';
import Clickable from '../Components/Clickable';
import {useUpdateEffect} from 'usehooks-ts';
import {useNavigation} from '@react-navigation/native';

// const data = [{label: 'test', value: 'test'}];
const ListHeader = () => {
  const {navigate} = useNavigation();
  return (
    <Box>
      <ScrollView
        style={{marginVertical: heightPercentageToDP('4%')}}
        showsHorizontalScrollIndicator={false}
        horizontal={true}>
        <Banner
          header={'Make your car new again.'}
          content={'Car maintenance and services'}
          ctaPressed={() => navigate('Services')}
        />
        <Banner
          header={'Sell/Buy a Car'}
          content={'on our automobile marketplace'}
        />
      </ScrollView>
      <CategoryList />
      <Hr />
    </Box>
  );
};
const Dashboard = () => {
  const theme = useTheme();
  const {primary} = theme.colors;
  const {data, isLoading: carsLoading} = useGetProductsQuery();
  const dispatch = useDispatch();
  const {cars} = useProduct();
  const {navigate} = useNavigation();
  useEffect(() => {
    if (data) {
      // console.log(data);
      dispatch(setCars({cars: data.data}));
    }
  }, [data, dispatch]);

  useUpdateEffect(() => {}, [cars]);

  return (
    <Container>
      <Box paddingHorizontal="mx3">
        <HeadNav />
        <Box />

        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={cars.filter((car, index) => index <= 3)}
          keyExtractor={(item, index) => item + index}
          ListEmptyComponent={() => (
            <Box flex={1}>
              {carsLoading ? (
                <ActivityIndicator color={primary} />
              ) : (
                <Text variant="medium">Empty</Text>
              )}
            </Box>
          )}
          renderItem={({item}) => <Card item={item} />}
          ListHeaderComponent={() => (
            <>
              <ListHeader />
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between">
                <Box flexDirection="row">
                  <Text variant="bold" textTransform="capitalize" fontSize={16}>
                    {'Cars'}
                  </Text>
                  {/* {icon()} */}
                </Box>
                <Clickable onPress={() => navigate('Cars')}>
                  <Text variant="regular" color="primary" fontSize={14}>
                    See all
                  </Text>
                </Clickable>
              </Box>
            </>
          )}
          ListFooterComponent={() => <ShowParts />}
          style={{marginBottom: heightPercentageToDP('5%')}}
        />
        {/* <MarketCategory
            title={'Hot Deals'}
            data={cars}
            icon={() => (
              <Icon name="hotjar" size={10} color={primary} style={{top: 5}} />
            )}
          /> */}
        {/* <Hr /> */}
        {/* <MarketCategory
            title={'New Deals'}
            data={parts}
            icon={() => (
              <New name="new" size={14} color={primary} style={{top: 5}} />
            )}
          /> */}
      </Box>
    </Container>
  );
};

export default Dashboard;
