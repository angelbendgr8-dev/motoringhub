import {ScrollView, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../../Components/Header';
import SearchInput, {createFilter} from 'react-native-search-filter';
import Container from '../../Components/Container';
import Clickable from '../../Components/Clickable';
import Box from '../../Components/Box';
import Text from '../../Components/Text';
import Button from '../../Components/Button';
import {ProductUploadContext} from '../../state/CarInfoContext';
import {useNavigation} from '@react-navigation/native';
import {useContent} from '../../state/hooks/content';
import {
  useGetCarBrandsQuery,
  useGetModelsQuery,
} from '../../state/services/ContentService';
const KEYS_TO_FILTERS = ['name'];

const CarModel = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const {model, setModel, maker} = useContext(ProductUploadContext);
  const {goBack} = useNavigation();
  const {categories} = useContent();
  const [cmodels, setCmodels] = useState([]);

  const {data} = useGetModelsQuery(maker);

  useEffect(() => {
    if (data) {
      setCmodels(data.data);
    }
  }, [data]);

  const searchUpdated = (term: string) => {
    setSearchTerm(term);
  };
  const filteredEmails = cmodels.filter(
    createFilter(searchTerm, KEYS_TO_FILTERS),
  );
  return (
    <Container>
      <Header leftIcon={true} text={'Select Car Maker'} />
      <SearchInput
        onChangeText={term => {
          searchUpdated(term);
        }}
        style={styles.searchInput}
        placeholder="Type a message to search"
      />
      <ScrollView>
        {filteredEmails.map((details, index) => {
          return (
            <Clickable
              onPress={() => {
                setModel(details.full_name);
                goBack();
              }}
              key={index}
              style={styles.emailItem}>
              <Box>
                <Text variant="regular" textAlign="left">
                  {details.name}
                </Text>
              </Box>
            </Clickable>
          );
        })}
      </ScrollView>
      <Box
        paddingVertical="my2"
        backgroundColor="grey"
        paddingHorizontal="mx3"
        elevation={14}
        borderTopColor={'border'}
        borderTopWidth={1}
        shadowColor="border"
        shadowOffset={{height: 10, width: 10}}>
        <Button
          paddingVertical="mx3"
          paddingHorizontal="s"
          borderRadius={5}
          onPress={() => navigate('RequestService', {service})}
          type="primary"
          label="Book Service"
        />
      </Box>
    </Container>
  );
};

export default CarModel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  emailItem: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10,
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)',
  },
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1,
  },
});
