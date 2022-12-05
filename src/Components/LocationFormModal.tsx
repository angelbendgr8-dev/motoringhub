import {FlatList, ScrollView, StatusBar} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import Box from './Box';
import Text from './Text';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@shopify/restyle';
import Clickable from './Clickable';
import Input from './Input';
import {useGetLocationsQuery} from '../state/services/ContentService';
import _ from 'lodash';
import {LocationContext} from '../state/LocationContext';

type ItemProps = {
  item: Location;
  selectItem: (temp: Location) => void;
};

const Item: React.FC<ItemProps> = ({item, selectItem}) => {
  return (
    <Clickable
      onPress={() => selectItem(item)}
      paddingVertical="my2"
      borderBottomWidth={0.3}
      borderBottomColor={'content'}>
      <Text textAlign="center" variant="medium" fontSize={14}>
        {item.address}
      </Text>
    </Clickable>
  );
};
interface Location {
  id: number;
  address: string;
  state: string;
  area: string;
}

type Props = {
  isVisible: boolean;
  closeAction: () => void;
};
const LocationFormModal: React.FC<Props> = ({isVisible, closeAction}) => {
  const theme = useTheme();
  const {content, primary} = theme.colors;
  const {data, refetch} = useGetLocationsQuery();
  const {
    setArea,
    setAddress,
    setState,
    setType,
    setLocation: setIsLocation,
  } = useContext(LocationContext);
  const [location, setLocation] = useState<Array<Location>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState<Array<Location>>([]);
  const filter = useCallback(() => {
    let newData;
    if (searchTerm.length > 0) {
      newData = _.filter(location, loc => {
        return (
          loc.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          loc.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
          loc.area.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFiltered(newData);
    } else {
      setFiltered([]);
    }
    // console.log(newData);
  }, [searchTerm, location]);

  useEffect(() => {
    if (data) {
      //   console.log(data);
      setLocation(data.data);
    }
    // refetch();
  }, [location, data]);

  useEffect(() => {
    filter();
  }, [searchTerm, filter]);

  const setSelectedLocation = (selected: Location) => {
    setAddress(selected.address);
    setArea(selected.area);
    setState(selected.state);
    setType('Dropoff');
    setIsLocation(true);
    closeAction();
  };

  return (
    <Box>
      <StatusBar backgroundColor={primary} />
      <Modal isVisible={isVisible} style={{padding: 0, margin: 0}}>
        <Box flex={1} backgroundColor="background">
          <Box
            elevation={14}
            borderBottomColor={'grey'}
            borderBottomWidth={1}
            shadowColor="grey"
            backgroundColor="primary"
            paddingHorizontal="mx3"
            shadowOffset={{height: 10, width: 10}}
            paddingVertical="my2"
            flexDirection="row"
            alignItems="center">
            <Clickable onPress={closeAction}>
              <Icon name="arrow-back" color={content} size={18} />
            </Clickable>
            <Text
              variant="medium"
              fontSize={14}
              color={'white'}
              marginLeft="mx2">
              Motoringhub centers
            </Text>
          </Box>
          <Box paddingHorizontal="mx3" marginTop="my2">
            <Input
              value={searchTerm}
              onChange={value => setSearchTerm(value)}
              label="type to filter location"
              rightBtn={() => <Icon name="filter" size={18} color={content} />}
            />
          </Box>
          <Box>
            {!_.isEmpty(filtered) ? (
              <FlatList
                data={filtered}
                renderItem={({item, index}) => (
                  <Item
                    selectItem={selected => setSelectedLocation(selected)}
                    item={item}
                    key={index}
                  />
                )}
              />
            ) : (
              <FlatList
                data={location}
                renderItem={({item, index}) => (
                  <Item
                    selectItem={selected => setSelectedLocation(selected)}
                    item={item}
                    key={index}
                  />
                )}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default LocationFormModal;
