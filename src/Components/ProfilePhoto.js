import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

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

const ProfilePhoto = ({profilePics}) => {
  const [updateProfilePics, {isLoading}] = useUpdateProfilePicsMutation();
  const {user} = useAuth();
  const toast = useToast();
  const theme = useTheme();
  const {primary} = theme.colors;
  const [changePics, setChangePics] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [fileUri, setFileUri] = useState(null);
  const dispatch = useDispatch();
  console.log(user.profile_pics);
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
        setFileUri(response.assets[0].uri.toString());
        const file = {
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: 'image/jpeg',
        };
        uploadProfileImage();
        try {
          setChangePics(false);
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const uploadProfileImage = async () => {
    try {
      let formData = new FormData();
      formData.append('image', {
        type: 'image/jpeg',
        uri: fileContent,
        name: fileUri,
      });
      console.log(formData);

      const response = await updateProfilePics(formData);
      console.log(response.data);
      const {data} = response;
      if (!data?.success) {
        console.log(data);
        toast.show(data?.message, {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          offset: 30,
          animationType: 'zoom-in',
        });
      } else {
        toast.show(data?.message, {
          type: 'success',
          placement: 'top',
          duration: 4000,
          offset: 30,
          animationType: 'zoom-in',
        });
        let updatedUser = {
          user: data?.data,
        };
        dispatch(updateCredentials(updatedUser));
        console.log(data);
      }
    } catch (err) {
      console.log(err);
      toast.show('error', {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        offset: 30,
        animationType: 'zoom-in',
      });
    }
  };

  const renderFileUri = () => {
    if (user?.profile_pics) {
      console.log(`${assetUrl()}/${user.profile_pics}`, 'here');
      return (
        <Image
          source={{uri: `${assetUrl()}/${user.profile_pics}`}}
          style={styles.img}
        />
      );
    } else {
      return (
        <Box flex={2} justifyContent="center" alignItems="center">
          <Icon name={'user'} size={72} />
        </Box>
      );
    }
  };
  useEffect(() => {}, [user]);

  return (
    <Box style={styles.profile}>
      <TouchableOpacity
        onPress={() => {
          setChangePics(true);
        }}>
        <Box backgroundColor="grey" style={styles.picture}>
          {renderFileUri()}
          <Box position="absolute" right={0} bottom={10}>
            <Icon2 name="edit" size={18} color={primary} />
          </Box>
        </Box>
      </TouchableOpacity>
      <Box flexDirection="row" justifyContent="center" alignItems="center">
        <Image source={profileLogo} />
        {/* <Text variant="medium" fontSize={RFValue(15)}>
          {user?.username}
        </Text> */}
      </Box>

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
              <Icon2 name="close" size={24} />
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
export default ProfilePhoto;

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
    // backgroundColor: 'red',
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
