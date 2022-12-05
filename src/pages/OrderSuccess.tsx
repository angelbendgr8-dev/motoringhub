import {} from 'react-native';
import React from 'react';
import Check from 'react-native-vector-icons/Ionicons';
import Container from '../Components/Container';
import HeadNav from '../Components/HeadNav';
import Box from '../Components/Box';
import {useTheme} from '@shopify/restyle';
import Header from '../Components/Header';
import Text from '../Components/Text';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';

const OrderSuccess = () => {
  const theme = useTheme();
  const {success} = theme.colors;
  return (
    <Container>
      <Header
        leftIcon={true}
        text={'Order Successful'}
        // rightIcon={() => {}}
      />
      <ScrollView>
        <Box paddingHorizontal="mx2">
          <Box
            justifyContent="center"
            backgroundColor="grey"
            alignItems="center">
            <Check name="checkmark-done-circle" size={86} color={success} />
            <Text variant="medium" color={'primary'}>
              Order Completed
            </Text>
            <Box width={widthPercentageToDP('80%')} marginVertical="my2">
              <Text variant="regular" color="content" textAlign="center">
                Payment is successfully processsed and your Order is on the way.
              </Text>
            </Box>
          </Box>
          <Box>
            <Text variant="regular" marginVertical="my1" fontSize={17}>
              Order Details
            </Text>
            <Box
              backgroundColor="grey"
              paddingHorizontal="mx2"
              borderRadius={5}
              paddingVertical="mx2">
              <Box
                borderBottomWidth={1}
                marginVertical="mx1"
                borderBottomColor={'border'}>
                <Text variant="medium" fontSize={15}>
                  Payment Method
                </Text>
                <Text variant="regular" fontSize={14}>
                  Pay with cards
                </Text>
              </Box>
              <Box flexDirection="row">
                <Text variant="regular" color="content" fontSize={14}>
                  Your order Id:{' '}
                </Text>
                <Text variant="medium" fontSize={14}>
                  # 34783898
                </Text>
              </Box>
              <Box flexDirection="row">
                <Text variant="regular" color="content" fontSize={14}>
                  Item Price:{' '}
                </Text>
                <Text variant="medium" fontSize={14}>
                  ₦ 20,000
                </Text>
              </Box>
              <Box flexDirection="row">
                <Text variant="regular" color="content" fontSize={14}>
                  Shipping Fees:{' '}
                </Text>
                <Text variant="medium" fontSize={14}>
                  ₦ 1,500
                </Text>
              </Box>
              <Box flexDirection="row">
                <Text variant="regular" color="content" fontSize={14}>
                  Total:{' '}
                </Text>
                <Text variant="medium" fontSize={14}>
                  ₦1,500
                </Text>
              </Box>
              {/* <Text variant="bold" fontSize={14}>
              This condition will be ship to
            </Text>
            <Text variant="regular" fontSize={14}>
              3501 Maloy Court, East Elmhurst, New York City NY 11369
            </Text> */}
            </Box>
          </Box>
          <Box>
            <Text variant="regular" marginVertical="my1" fontSize={17}>
              Delivery
            </Text>
            <Box
              backgroundColor="grey"
              paddingHorizontal="mx2"
              borderRadius={5}
              paddingVertical="mx2">
              <Box
                borderBottomWidth={1}
                marginVertical="mx1"
                borderBottomColor={'border'}>
                <Text variant="medium" fontSize={15}>
                  Delivery Option
                </Text>
                <Text variant="regular" fontSize={14}>
                  Door Delivery
                </Text>
              </Box>
              <Box flexDirection="row">
                <Text variant="medium" color="content" fontSize={14}>
                  Shipping Address
                </Text>
              </Box>
              <Box flexDirection="row">
                <Text variant="regular" color="content" fontSize={14}>
                  Babatunde Amos
                </Text>
              </Box>
              <Box flexDirection="row">
                <Text variant="regular" color="content" fontSize={14}>
                  murewa close ajasa command
                </Text>
              </Box>
              <Box flexDirection="row">
                <Text variant="regular" color="content" fontSize={14}>
                  Lagos - Meran Alagbado
                </Text>
              </Box>
              <Box flexDirection="row">
                <Text variant="regular" color="content" fontSize={14}>
                  Status:{' '}
                </Text>
                <Box
                  backgroundColor="info"
                  paddingHorizontal="my1"
                  borderRadius={3}>
                  <Text variant="regular" color={'white'} fontSize={12}>
                    In Progress
                  </Text>
                </Box>
              </Box>
              {/* <Text variant="bold" fontSize={14}>
              This condition will be ship to
            </Text>
            <Text variant="regular" fontSize={14}>
              3501 Maloy Court, East Elmhurst, New York City NY 11369
            </Text> */}
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </Container>
  );
};

export default OrderSuccess;
