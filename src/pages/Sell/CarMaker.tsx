import {ScrollView, StyleSheet} from 'react-native';
import React, {useContext, useState} from 'react';
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
const KEYS_TO_FILTERS = ['name'];

const data = [
  {
    name: 'angelben',
  },
  {
    name: 'benjamin',
  },
];
const CarMaker = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const {maker, setMaker} = useContext(ProductUploadContext);
  const {goBack} = useNavigation();
  const {categories} = useContent();
  console.log(categories);
  const searchUpdated = (term: string) => {
    setSearchTerm(term);
  };
  const filteredEmails = categories.filter(
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
                setMaker(details.name);
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
    </Container>
  );
};

export default CarMaker;

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
