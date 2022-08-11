import React, {useMemo, useState} from 'react';
import {StyleSheet, ScrollView, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import Box from './Box';
import SearchInput, {createFilter} from 'react-native-search-filter';
import Clickable from './Clickable';
import Text from './Text';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Select from './Select';

const KEYS_TO_FILTERS = ['value'];

type Props = {
  visible: boolean;
  closeAction: () => void;
  select: (year: string) => void;
  data: Array<{}>;
};
const Sheet: React.FC<Props> = ({visible, closeAction, data, select}) => {
  // ref

  // variables
  const years = useMemo(
    () => [...data].reverse().map(year => ({value: year})),
    [data],
  );
  console.log(data);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const searchUpdated = (term: string) => {
    setSearchTerm(term);
  };
  const filteredEmails = years.filter(
    createFilter(searchTerm, KEYS_TO_FILTERS),
  );
  // renders
  return (
    <Box flex={1} borderTopLeftRadius={30} borderTopEndRadius={30}>
      <Modal
        style={{padding: 0, margin: 0, borderTopLeftRadius: 15}}
        coverScreen={false}
        onSwipeStart={() => console.log('swiped')}
        animationInTiming={400}
        animationOutTiming={400}
        onSwipeMove={per => console.log(per)}
        onBackdropPress={closeAction}
        isVisible={visible}>
        <Box backgroundColor="grey" paddingTop="my4">
          <Box
            borderColor="border"
            borderWidth={1}
            borderRadius={5}
            elevation={1}
            shadowColor="border"
            shadowOffset={{height: 10, width: 10}}
            marginHorizontal="mx4">
            <SearchInput
              onChangeText={term => {
                searchUpdated(term);
              }}
              style={styles.searchInput}
              placeholder="Type a message to search"
            />
          </Box>
          <FlatList
            style={{marginBottom: heightPercentageToDP('4%')}}
            data={filteredEmails}
            initialNumToRender={30}
            renderItem={({item, index}) => (
              <Clickable
                onPress={() => {
                  select(item.value);
                  closeAction();
                }}
                key={index}
                borderBottomColor="border"
                paddingVertical="my1"
                paddingHorizontal="mx3"
                borderBottomWidth={1}>
                <Box>
                  <Text variant="regular" textAlign="left">
                    {item.value}
                  </Text>
                </Box>
              </Clickable>
            )}
          />
        </Box>
      </Modal>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
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
    padding: 5,
    // borderColor: 'grey',
    // borderWidth: 1,
    // borderRadius: 5,
    // shadowColor: 'grey',
    // elevation:10,
    // shadowOffset: {height: 40, width: 40},
  },
});

export default Sheet;
