import React, {useContext, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import {
  heightPercentageToDP,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../assets/colors';
import {Image} from 'react-native';

// import AnimatedLoader from 'react-native-animated-loader';
// import {S3_ACCESS_KEY_ID, S3_SECRET_KEY_ID} from '@env';

import * as ImagePicker from 'react-native-image-picker';
import {useEffect} from 'react';
// import {useProfilePicMutation} from '../../state/services/SettingServices';
import {useDispatch} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import Modal from 'react-native-modal';
import {profile, profileLogo, shaggi} from '../assets';
import Text from './Text';
import {RFValue} from 'react-native-responsive-fontsize';
import Clickable from './Clickable';
import {useAuth} from '../state/hooks/userAuth';
import {updateCredentials} from '../state/reducers/userAuth';
import Box from './Box';
import {useTheme} from '@shopify/restyle';
import {assetUrl, performAsyncCalls} from '../helpers/constants';
import {useUpdateProfilePicsMutation} from '../state/services/SettingsService';
import {ProductUploadContext} from '../state/CarInfoContext';

const ProductImage = ({selected}) => {
  const theme = useTheme();
  const {primary} = theme.colors;
  const [changePics, setChangePics] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [fileUri, setFileUri] = useState(null);
  const dispatch = useDispatch();
  const {images, setImages} = useContext(ProductUploadContext);

  const uploadFromCamera = () => {
    const options = {
      quality: 0.1,
      maxWidth: 400,
      maxHeigth: 400,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setFileContent(response.assets[0].uri);
        setFileUri(response.assets[0].uri.toString());

        setChangePics(false);
      }
    });
  };

  const uploadFromGallery = () => {
    const options = {
      quality: 0.1,
      maxWidth: 400,
      maxHeigth: 400,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled images picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        console.log(response);
        setFileContent(response.assets[0].uri);
        setFileUri(response.assets[0].fileName);
        const file = {
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: 'image/jpeg',
        };
        uploadProfileImage(file);
        try {
          setChangePics(false);
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const uploadProfileImage = async file => {
    let formData = images;
    // console.log(formData);
    formData.push(file);
    setImages(formData);
    selected();

    // console.log(formData);
  };

  return (
    <Box>
      <Clickable
        borderRadius={5}
        borderColor={'content'}
        height={heightPercentageToDP('6.5%')}
        justifyContent="center"
        paddingHorizontal="mx3"
        borderWidth={0.5}
        onPress={() => {
          setChangePics(true);
        }}>
        <Text variant="medium" fontSize={14} color="content">
          Select Product image
        </Text>
      </Clickable>

      <Modal
        animationType="slide"
        onBackdropPress={() => setChangePics(false)}
        isVisible={changePics}>
        <Box
          // backgroundColor="grey"
          position="absolute"
          width={widthPercentageToDP('100%')}
          height={heightPercentageToDP('15%')}
        />
        <Box
          width={'100%'}
          height={heightPercentageToDP('15%')}
          borderRadius={15}>
          <Box
            flexDirection="row"
            paddingTop="my3"
            backgroundColor="background"
            borderRadius={15}
            paddingBottom="my2">
            <Clickable
              onPress={() => setChangePics(false)}
              position="absolute"
              top={1}
              right={3}>
              {/* <Icon2 name="close" size={24} /> */}
            </Clickable>
            <Box width="60%" alignItems="center" justifyContent="center">
              <Clickable
                onPress={() => {
                  // console.log('here');
                  uploadFromCamera();
                }}>
                <Icon2 name={'camera'} color={primary} size={30} />
              </Clickable>
              <Text variant="regular">Camera</Text>
            </Box>
            <Box width="60%" alignItem="center" justifyContent="center">
              <Clickable
                onPress={() => {
                  uploadFromGallery();
                }}>
                <Icon name={'image'} color={primary} size={30} />
              </Clickable>
              <Text variant="regular">Gallery</Text>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
export default ProductImage;

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp('5%'),
  },
  picture: {
    // backgroundColor: colors.white,
    height: 105,
    width: 105,
    borderRadius: 60,
    // borderColor: '#FBBA16',
    // borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 104,
    width: 104,
    borderRadius: 60,
  },
  camera: {
    position: 'absolute',
    left: 25,
    top: 21,
    height: 25,
    width: 25,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prof: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  lottie: {
    width: 100,
    height: 100,
  },
});
