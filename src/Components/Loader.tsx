import {StyleSheet} from 'react-native';
import React from 'react';
import Box from './Box';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

type Props = {
  visible: boolean;
};
export const Loader: React.FC<Props> = ({visible}) => {
  return (
    <>
      {visible && (
        <Box>
          <Modal isVisible={visible}>
            <Box
              flex={1}
              flexDirection="row"
              justifyContent="center"
              alignItems="center">
              <LottieView
                source={require('../assets/carloading.json')}
                autoPlay
                loop
                style={styles.lottie}
              />
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
