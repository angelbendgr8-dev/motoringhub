import {StyleSheet} from 'react-native';
import React from 'react';
import Box from './Box';
import Modal from 'react-native-modal';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import Check from 'react-native-vector-icons/Ionicons';
import Text from './Text';
import {useTheme} from '@shopify/restyle';
import Clickable from './Clickable';
import {useNavigation} from '@react-navigation/native';

type Props = {
  visible: boolean;
};
export const InspectSuccess: React.FC<Props> = ({visible}) => {
  const theme = useTheme();
  const {success, primary} = theme.colors;
  const {navigate} = useNavigation();
  return (
    <>
      {visible && (
        <Box>
          <Modal isVisible={visible}>
            <Box
              backgroundColor="white"
              flexDirection="row"
              borderRadius={7}
              paddingVertical={'my2'}
              justifyContent="center"
              alignItems="center">
              <Box
                // backgroundColor="primary"
                justifyContent="center"
                alignItems="center">
                <Check name="checkmark-done-circle" size={86} color={success} />
                <Text variant="medium" color={'title'}>
                  Inspection Request Submitted
                </Text>
                <Box width={'80%'} marginVertical="my2">
                  <Text variant="regular" textAlign="center" color={'content'}>
                    Thank you! Admin will contact you shortly with inspection
                    location
                  </Text>
                </Box>
                <Clickable
                  onPress={() => navigate('Dashboard')}
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center">
                  <Check name="home" size={16} color={primary} />
                  <Text
                    variant="regular"
                    marginHorizontal="mx1"
                    textAlign="center"
                    color={'content'}>
                    Go Home
                  </Text>
                </Clickable>
              </Box>
            </Box>
          </Modal>
        </Box>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  lottie: {
    height: heightPercentageToDP('4%'),
    width: widthPercentageToDP('10%'),
    alignSelf: 'center',
  },
});
