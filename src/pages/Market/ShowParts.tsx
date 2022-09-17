import {} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../../Components/Container';
import Box from '../../Components/Box';
import Text from '../../Components/Text';

import {useTheme} from '@shopify/restyle';
import Clickable from '../../Components/Clickable';
import {useGetSparePartsQuery} from '../../state/services/ProductService';
import _ from 'lodash';
import {useDispatch} from 'react-redux';
import {setParts} from '../../state/reducers/productReducer';
import {useProduct} from '../../state/hooks/product';
import HCard from '../../Components/HCard';
import Hr from '../../Components/Hr';

const ShowParts: React.FC<{}> = () => {
  const theme = useTheme();

  const {data, isLoading} = useGetSparePartsQuery();
  const dispatch = useDispatch();
  const {parts} = useProduct();

  useEffect(() => {
    if (data) {
      dispatch(setParts({parts: data.data}));
    }
  }, [data, dispatch]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const {primary} = theme.colors;

  return (
    <Container>
      <Hr />
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Box flexDirection="row">
          <Text variant="bold" fontSize={16}>
            {'Parts'}
          </Text>
          {/* {icon()} */}
        </Box>
        <Clickable>
          <Text variant="regular" color="primary" fontSize={14}>
            See all
          </Text>
        </Clickable>
      </Box>

      {!_.isEmpty(parts) ? (
        <Box flexDirection="row" justifyContent="space-between" flexWrap="wrap">
          {_.map(parts, (item, index) => (
            <HCard key={index} item={item} />
          ))}
        </Box>
      ) : (
        <Text variant="medium">Loading</Text>
      )}
    </Container>
  );
};

export default ShowParts;
