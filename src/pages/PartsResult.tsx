import {ActivityIndicator, Image} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Container from '../Components/Container';
import Header from '../Components/Header';
import Clickable from '../Components/Clickable';

import Upload from 'react-native-vector-icons/Feather';
import Box from '../Components/Box';
import {useTheme} from '@shopify/restyle';
import Text from '../Components/Text';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {assetUrl, currencyFormat} from '../helpers/constants';
import moment from 'moment';
import {useSearchPartsMutation} from '../state/services/ProductService';

const PartsItem: React.FC<any> = ({item}) => {
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
        <Box flexDirection="row">
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

const PartsResult = ({route}: any) => {
  const theme = useTheme();
  const {primary} = theme.colors;
  const {searchTerm} = route.params;
  const [hasMorePages, setHasMorePages] = useState(true);
  const [searchParts, {data, isLoading}] = useSearchPartsMutation();
  const currentPage = useRef(1);
  const [parts, setParts] = useState<Array<any>>([]);

  const fetchMoreContents = async () => {
    if (!hasMorePages || isLoading) {
      // console.log('here2');
      return;
    }
    // console.log('here1');
    currentPage.current += 1;
    searchParts({page: currentPage.current, s: searchTerm});
  };
  useEffect(() => {
    searchParts({page: currentPage.current, s: searchTerm});
  }, [searchParts, searchTerm]);
  const updateParts = useCallback(partInfo => {
    setParts([...parts, ...partInfo]);
  }, []);
  useEffect(() => {
    if (data) {
      const videoData = data.data;
      updateParts(videoData.data);
      if (data.data.last_page === currentPage.current) {
        setHasMorePages(false);
      } else {
        setHasMorePages(true);
      }
    }
  }, [data, updateParts]);

  // useEffect(() => {
  //   if (type === 'cars') {
  //     const temp = cars.filter(item => item.model.includes(searchTerm));
  //     console.log(data);
  //     setData(temp);
  //   } else {
  //     const temp = parts.filter(item => item.name.includes(searchTerm));
  //     console.log(data);
  //     setData(temp);
  //   }
  // }, [cars, parts]);

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

      <FlatList
        data={parts}
        renderItem={({item}) => <PartsItem item={item} />}
        keyExtractor={item => item.id}
        onEndReached={fetchMoreContents}
        ListFooterComponent={() => (
          <>{isLoading && <ActivityIndicator size={20} color={primary} />}</>
        )}
      />
    </Container>
  );
};

export default PartsResult;
