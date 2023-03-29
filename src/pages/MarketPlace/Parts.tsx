import {ActivityIndicator, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTheme} from '@shopify/restyle';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import Box from '../../Components/Box';
import HCard from '../../Components/HCard';
import {useGetAllPartsMutation} from '../../state/services/ProductService';

const Parts = () => {
  const [hasMorePages, setHasMorePages] = useState(true);
  const [getAllParts, {data, isLoading}] = useGetAllPartsMutation();
  const currentPage = useRef(1);
  const theme = useTheme();
  const {primary} = theme.colors;
  const [parts, setParts] = useState<Array<any>>([]);

  const fetchMoreContents = async () => {
    if (!hasMorePages || isLoading) {
      // console.log('here2');
      return;
    }
    // console.log('here1');
    currentPage.current += 1;
    getAllParts({page: currentPage.current});
  };
  useEffect(() => {
    getAllParts({page: currentPage.current});
  }, [getAllParts]);
  useEffect(() => {
    if (data) {
      const videoData = data.data;
      setParts([...parts, ...videoData.data]);
      if (data.data.last_page === currentPage.current) {
        setHasMorePages(false);
      } else {
        setHasMorePages(true);
      }
    }
  }, [data]);
  return (
    <Container>
      <Box alignItems="center" justifyContent={'center'}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={parts}
          keyExtractor={(item, index) => item + index}
          numColumns={2}
          contentContainerStyle={{alignItems: 'center'}}
          initialNumToRender={6}
          renderItem={({item}) => <HCard item={item} />}
          onEndReached={fetchMoreContents}
          ListFooterComponent={() => (
            <>{isLoading && <ActivityIndicator size={20} color={primary} />}</>
          )}
        />
      </Box>
    </Container>
  );
};

export default Parts;
