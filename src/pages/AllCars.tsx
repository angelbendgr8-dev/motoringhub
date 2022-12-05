import {View, Text, FlatList} from 'react-native';
import React from 'react';
import Container from '../Components/Container';
import Header from '../Components/Header';
import {useProduct} from '../state/hooks/product';
import Card from '../Components/Card';

const Cars = () => {
  const {cars} = useProduct();
  return (
    <Container>
      <Header leftIcon={true} text={'Cars'} />
      <FlatList
        data={cars}
        keyExtractor={(item, index) => item + index}
        initialNumToRender={5}
        renderItem={({item}) => <Card item={item} />}
      />
    </Container>
  );
};

export default Cars;
