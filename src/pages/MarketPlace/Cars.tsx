import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {useTheme} from '@shopify/restyle';
import { useGetAllProductsMutation } from '../../state/services/ProductService';
import Container from '../../Components/Container';

const Cars = () => {
  const theme = useTheme();
  const {primary} = theme.colors;
  const [hasMorePages, setHasMorePages] = useState(true);
  const [getAllProduct, {data, isLoading}] = useGetAllProductsMutation();
  const currentPage = useRef(1);
  const [cars, setCars] = useState<Array<any>>([]);

  const fetchMoreContents = async () => {
    if (!hasMorePages || isLoading) {
      // console.log('here2');
      return;
    }
    // console.log('here1');
    currentPage.current += 1;
    getAllProduct({page: currentPage.current});
  };
  useEffect(() => {
    getAllProduct({page: currentPage.current});
  }, [getAllProduct]);
  const updateCars = useCallback(carInfo => {
    setCars([...cars, ...carInfo]);
  }, []);
  useEffect(() => {
    if (data) {
      const videoData = data.data;
      updateCars(videoData.data);
      if (data.data.last_page === currentPage.current) {
        setHasMorePages(false);
      } else {
        setHasMorePages(true);
      }
    }
  }, [data, updateCars]);

  return (
    <Container    >
      <Header leftIcon={true} text={'Cars'} />
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={cars}
        keyExtractor={item => item.id}
        style={{marginHorizontal: 15}}
        initialNumToRender={5}
        renderItem={({item, index}) => <Card item={item} key={index} />}
        onEndReached={fetchMoreContents}
        ListFooterComponent={() => (
          <>{isLoading && <ActivityIndicator size={20} color={primary} />}</>
        )}
      />
    </Container>
  );
};

export default Cars;
