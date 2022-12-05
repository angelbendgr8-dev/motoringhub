import { FlatList} from 'react-native';
import React from 'react';
import HCard from '../Components/HCard';
import Header from '../Components/Header';
import Container from '../Components/Container';
import {useProduct} from '../state/hooks/product';
import Box from '../Components/Box';

const Parts = () => {
  const {parts} = useProduct();
  return (
    <Container>
      <Header leftIcon={true} text={'Parts'} />
      <Box alignItems="center">
        <FlatList
          data={parts}
          keyExtractor={(item, index) => item + index}
          horizontal={true}
          initialNumToRender={6}
          renderItem={({item}) => <HCard item={item} />}
        />
      </Box>
    </Container>
  );
};

export default Parts;
