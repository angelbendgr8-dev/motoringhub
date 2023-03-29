import React, {useCallback, useEffect, useState} from 'react';
import Container from '../Components/Container';
import Clickable from '../Components/Clickable';
import Input from '../Components/Input';
import Box from '../Components/Box';

import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@shopify/restyle';
import Modal from 'react-native-modal';
import Text from '../Components/Text';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useContent} from '../state/hooks/content';
import {useDebounce} from 'usehooks-ts';
import {ActivityIndicator} from 'react-native';
import _ from 'lodash';

type filterProps = {
  filter: string;
  visible: boolean;
  select: Function;
  close: () => void;
};

const FilterSelection: React.FC<filterProps> = ({
  filter,
  visible,
  select,
  close,
}) => {
  return (
    <Box>
      <Modal
        onBackdropPress={close}
        onBackButtonPress={close}
        isVisible={visible}>
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
const FilteredCars = ({
  item,
  pressed,
}: {
  item: string;
  pressed: (item: string) => void;
}) => {
  return (
    <Clickable
      flexDirection="row"
      alignItems="center"
      onPress={() => pressed(item)}
      paddingVertical="mx2"
      borderBottomColor="border"
      borderBottomWidth={0.5}
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
        {item}
      </Text>
    </Clickable>
  );
};

const Search = () => {
  const theme = useTheme();
  const {white, title, primary} = theme.colors;
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState('cars');
  const [cars, setCars] = useState<Array<string>>([]);
  const {categories, allmodels} = useContent();
  const [filtered, setFiltered] = useState<Array<string>>([]);
  const {navigate, goBack} = useNavigation();
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const debouncedValue = useDebounce<string>(value, 3000);

  useEffect(() => {}, [filter, filtered]);
  const search = useCallback(
    (input: string) => {
      if (filter === 'cars') {
        const temp = cars.filter((item: string) => item.includes(input));
        setFiltered(temp);
        setLoading(false);
      } else {
        navigate('PartsResult', {searchTerm: input});
        setLoading(false);
      }
    },
    [cars, navigate, filter],
  );
  useEffect(() => {
    if (_.size(value) === 0) {
      setFiltered([]);
    } else {
      search(value);
    }
  }, [debouncedValue]);

  useEffect(() => {
    const cats = categories.map((category: any) => category.name);
    const mod = allmodels.map((model: any) => model.full_name);
    console.log(allmodels, 'data');
    const searchable = [...cats, ...mod];
    setCars(searchable);
  }, [categories, allmodels]);

  const pressed = (term: string) => {
    // console.log(term);
    if (filter === 'cars') {
      navigate('Result', {searchTerm: term});
    } else {
    }
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
        <Clickable onPress={goBack} marginHorizontal="mx3">
          <Icon color={white} size={24} name="close" />
        </Clickable>
        <Box marginVertical="my2" flex={1}>
          <Input
            label={`Search ${filter}`}
            value={value}
            onChange={input => {
              setLoading(true);
              setValue(input);
            }}
            type="none"
            isLabel={false}
            rightBtn={() => (
              <Clickable onPress={() => setShowFilter(true)}>
                <Icon color={title} size={20} name="options" />
              </Clickable>
            )}
            leftIcon={() => (
              <Box>
                {loading ? (
                  <ActivityIndicator color={primary} />
                ) : (
                  <Clickable onPress={() => {}}>
                    <Icon color={title} size={20} name="search" />
                  </Clickable>
                )}
              </Box>
            )}
          />
        </Box>
      </Box>
      {!_.isEmpty(filtered) && (
        <FlatList
          data={filtered}
          renderItem={({item, index}) => (
            <FilteredCars item={item} key={index} pressed={pressed} />
          )}
        />
      )}
    </Container>
  );
};

export default Search;
