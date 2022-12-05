import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../Components/Container';
import Header from '../Components/Header';
import Clickable from '../Components/Clickable';
import Input from '../Components/Input';
import Box from '../Components/Box';

import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@shopify/restyle';
import Modal from 'react-native-modal';
import Text from '../Components/Text';
import {useProduct} from '../state/hooks/product';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

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

const FilteredItem = ({item, pressed}) => {
  return (
    <Clickable
      flexDirection="row"
      alignItems="center"
      onPress={() => pressed(item.name)}
      paddingVertical="mx2"
      marginHorizontal="mx3"
      marginVertical="mx1">
      <Box
        width={40}
        height={40}
        backgroundColor={'outlineSecondary'}
        marginRight="my3"
        borderRadius={60}
      />
      <Text variant="regular" color="content">
        {item.name}
      </Text>
    </Clickable>
  );
};
const FilteredCars = ({item, pressed}) => {
  return (
    <Clickable
      flexDirection="row"
      alignItems="center"
      onPress={() => pressed(item.model)}
      paddingVertical="mx2"
      marginHorizontal="mx3"
      marginVertical="mx1">
      <Box
        width={40}
        height={40}
        backgroundColor={'outlineSecondary'}
        marginRight="my3"
        borderRadius={60}
      />
      <Text variant="regular" color="content">
        {item.model}
      </Text>
    </Clickable>
  );
};

const Search = () => {
  const theme = useTheme();
  const {white, title} = theme.colors;
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState('cars');
  const {cars, parts} = useProduct();
  const [filtered, setFiltered] = useState([]);
  const {navigate} = useNavigation();

  useEffect(() => {}, [filter, filtered]);

  const search = input => {
    if (filter === 'cars') {
      const temp = cars.filter(item => item.model.includes(input));
      setFiltered(temp);
    } else {
      const temp = parts.filter(item => item.name.includes(input));
      setFiltered(temp);
    }
  };

  const pressed = term => {
    navigate('Result', {searchTerm: term, type: filter});
  };

  return (
    <Container>
      {showFilter && (
        <FilterSelection
          filter={filter}
          select={opt => setFilter(opt)}
          close={() => setShowFilter(false)}
          visible={showFilter}
        />
      )}
      <Box
        flexDirection="row"
        backgroundColor="primary"
        alignItems="center"
        paddingRight="mx4">
        <Clickable onPress={() => {}} marginHorizontal="mx3">
          <Icon color={white} size={24} name="close" />
        </Clickable>
        <Box marginVertical="my2" flex={1}>
          <Input
            label={`Search ${filter}`}
            value={{}}
            onChange={input => {
              search(input);
            }}
            type="none"
            isLabel={false}
            rightBtn={() => (
              <Clickable onPress={() => setShowFilter(true)}>
                <Icon color={title} size={20} name="options" />
              </Clickable>
            )}
            leftIcon={() => (
              <Clickable onPress={() => {}}>
                <Icon color={title} size={20} name="search" />
              </Clickable>
            )}
          />
        </Box>
      </Box>
      {filter === 'parts' ? (
        <FlatList
          data={filtered}
          renderItem={({item}) => (
            <FilteredItem item={item} pressed={pressed} />
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <FlatList
          data={filtered}
          renderItem={({item}) => (
            <FilteredCars item={item} pressed={pressed} />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </Container>
  );
};

export default Search;
