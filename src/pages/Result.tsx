import {ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Container from '../Components/Container';
import Header from '../Components/Header';
import {useTheme} from '@shopify/restyle';
import {FlatList} from 'react-native-gesture-handler';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Card from '../Components/Card';
import {useSearchProductsMutation} from '../state/services/ProductService';

const Result = ({route}: any) => {
  const theme = useTheme();
  const {primary} = theme.colors;
  const {searchTerm} = route.params;
  const [hasMorePages, setHasMorePages] = useState(true);
  const [searchProduct, {data, isLoading}] = useSearchProductsMutation();
  const currentPage = useRef(1);
  const [cars, setCars] = useState<Array<any>>([]);

  const fetchMoreContents = async () => {
    if (!hasMorePages || isLoading) {
      // console.log('here2');
      return;
    }
    // console.log('here1');
    currentPage.current += 1;
    searchProduct({page: currentPage.current, s: searchTerm});
  };
  useEffect(() => {
    searchProduct({page: currentPage.current, s: searchTerm});
  }, [searchProduct, searchTerm]);
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

  // useEffect(() => {
  //   if (type === 'cars') {
  //     const temp = cars.filter(item => item.model.includes(searchTerm));
  //     console.log(data);
  //     setData(temp);
  //   } else {
  //     const temp = parts.filter(item => item.name.includes(searchTerm));
  //     console.log(data);
  //     setData(temp);
  //   }
  // }, [cars, parts]);

  useEffect(() => {}, [data]);

  return (
    <Container>
      {/* {showFilter && (
        <FilterSelection
          filter={filter}
          select={opt => setFilter(opt)}
          close={() => setShowFilter(false)}
          visible={showFilter}
        />
      )} */}
      <Header leftIcon={true} text="Result" />

      <FlatList
        data={cars}
        renderItem={({item}) => <Card item={item} />}
        keyExtractor={item => item.id}
        style={{marginLeft: widthPercentageToDP('3%')}}
        onEndReached={fetchMoreContents}
        ListFooterComponent={() => (
          <>{isLoading && <ActivityIndicator size={20} color={primary} />}</>
        )}
      />
    </Container>
  );
};

export default Result;
