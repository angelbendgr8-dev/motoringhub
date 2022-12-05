import {Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../Components/Container';
import Header from '../Components/Header';
import Clickable from '../Components/Clickable';
import Input from '../Components/Input';

import Upload from 'react-native-vector-icons/Feather';
import Box from '../Components/Box';

import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@shopify/restyle';
import Modal from 'react-native-modal';
import Text from '../Components/Text';
import {useProduct} from '../state/hooks/product';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {assetUrl, currencyFormat} from '../helpers/constants';
import Card from '../Components/Card';
import HCard from '../Components/HCard';
import moment from 'moment';

type filterProps = {
  filter: string;
  visible: boolean;
  select: Function;
  close: Function;
};

const FilterSelection: React.FC<filterProps> = ({
  filter,
  visible,
  select,
  close,
}) => {
  return (
    <Box>
      <Modal onBackButtonPress={close} isVisible={visible}>
        <Box backgroundColor="grey" paddingVertical="m">
          <Box borderBottomColor={'border'} borderBottomWidth={1}>
            <Text variant="medium" textAlign="center">
              Selet Filter
            </Text>
          </Box>
          <Box paddingHorizontal="m">
            <Clickable
              onPress={() => {
                select('cars');
                close();
              }}
              backgroundColor="grey"
              flexDirection="row"
              paddingLeft={'mx4'}
              borderBottomColor={'border'}
              borderBottomWidth={1}
              paddingVertical="my2"
              // alignItems="center"
            >
              <Box
                width={15}
                height={15}
                borderColor={filter === 'cars' ? 'primary' : 'border'}
                marginRight={'mx4'}
                justifyContent="center"
                alignItems="center"
                borderWidth={1}
                borderRadius={60}>
                <Box
                  height={'90%'}
                  width={'90%'}
                  // margin={'mx2'}
                  borderRadius={60}
                  backgroundColor={filter === 'cars' ? 'primary' : 'grey'}
                />
              </Box>
              <Box width="80%">
                <Text variant={'medium'} color="content" fontSize={16}>
                  Cars
                </Text>
              </Box>
            </Clickable>
            <Clickable
              onPress={() => {
                select('parts');
                close();
              }}
              backgroundColor="grey"
              flexDirection="row"
              paddingLeft={'mx4'}
              borderBottomColor={'border'}
              borderBottomWidth={1}
              paddingVertical="my2"
              // alignItems="center"
            >
              <Box
                width={15}
                height={15}
                borderColor={filter === 'parts' ? 'primary' : 'border'}
                marginRight={'mx4'}
                justifyContent="center"
                alignItems="center"
                borderWidth={1}
                borderRadius={60}>
                <Box
                  height={'90%'}
                  width={'90%'}
                  // margin={'mx2'}
                  borderRadius={60}
                  backgroundColor={filter === 'parts' ? 'primary' : 'grey'}
                />
              </Box>
              <Box width="80%">
                <Text variant={'medium'} color="content" fontSize={16}>
                  Parts
                </Text>
              </Box>
            </Clickable>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

const CarItem = ({item}) => {
  return (
    <Clickable
      flexDirection="row"
      alignItems="center"
      paddingVertical="mx2"
      marginHorizontal="mx3"
      marginVertical="mx1">
      <Image
        source={{uri: `${assetUrl()}/${item.images[0]}`}}
        style={{
          width: widthPercentageToDP('40%'),
          height: heightPercentageToDP('15%'),
          borderRadius: 10,
          marginRight: mx3,
        }}
      />
      <Text variant="regular" color="content">
        {item.name}
      </Text>
    </Clickable>
  );
};

const PartsItem: React.FC<Params> = ({item}) => {
  const theme = useTheme();
  const {content} = theme.colors;
  const {navigate} = useNavigation();
  const {mx3} = theme.spacing;
  const gotoDetails = () => {
    navigate('PartDetails', {item});
  };
  return (
    <Clickable
      onPress={gotoDetails}
      alignItems="center"
      justifyContent="center"
      marginLeft="mx4"
      marginVertical="my1">
      <Image
        source={{uri: `${assetUrl()}/${item.images[0]}`}}
        style={{
          width: widthPercentageToDP('90.5%'),
          height: heightPercentageToDP('25%'),
          borderRadius: 10,
          marginRight: mx3,
        }}
      />
      <Box alignSelf="flex-start">
        <Box flexDirection='row'>
          <Text variant="bold" textTransform="capitalize" fontSize={15}>
            {item.name}
          </Text>
          <Box flexDirection="row" alignItems="center">
            <Upload name="upload-cloud" color={content} size={14} />
            <Text marginLeft="s" variant="bold" fontSize={12} color="content">
              {moment
                .duration(moment(item.updated_at).diff(moment()))
                .humanize()}
            </Text>
          </Box>
        </Box>
        <Text variant="regular" fontSize={14} color="primary">
          {currencyFormat(item.price)}
        </Text>
      </Box>
    </Clickable>
  );
};

const Result = () => {
  const theme = useTheme();
  const {white, title} = theme.colors;
  const {params} = useRoute();
  const {type, searchTerm} = params;
  console.log(type);
  const {cars, parts} = useProduct();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (type === 'cars') {
      const temp = cars.filter(item => item.model.includes(searchTerm));
      console.log(data);
      setData(temp);
    } else {
      const temp = parts.filter(item => item.name.includes(searchTerm));
      console.log(data);
      setData(temp);
    }
  }, [cars, parts]);

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
      {type === 'parts' ? (
        <FlatList
          data={data}
          renderItem={({item}) => <PartsItem item={item} />}
          keyExtractor={item => item.id}
        />
      ) : (
        <FlatList
          data={data}
          renderItem={({item}) => <Card item={item} />}
          keyExtractor={item => item.id}
          style={{marginLeft: widthPercentageToDP('3%')}}
        />
      )}
    </Container>
  );
};

export default Result;
