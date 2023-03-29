import {Image, ScrollView, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import Box from '../../Components/Box';
import Text from '../../Components/Text';
import Clickable from '../../Components/Clickable';
import Icon from 'react-native-vector-icons/AntDesign';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useTheme} from '@shopify/restyle';
import Button from '../../Components/Button';
import {useNavigation} from '@react-navigation/native';

import {useForm, Controller} from 'react-hook-form';
import Select from '../../Components/Select';
import Input from '../../Components/Input';
import ProductImage from '../../Components/ProductImage';
import _ from 'lodash';
import {ProductUploadContext} from '../../state/CarInfoContext';
import {useUpdateEffect} from 'usehooks-ts';
import {useToast} from 'react-native-toast-notifications';
import ConfirmationModal from '../../Components/ConfirmationModal';
import {useAuth} from '../../state/hooks/userAuth';
import {useAddOtherProductMutation} from '../../state/services/RequestService';
import {formatPrice} from '../../helpers/constants';

type Props = {
  title: string;
  onPress: () => void;
  icon?: string;
};

export const ListItem: React.FC<Props> = ({title, onPress, icon = 'right'}) => {
  const theme = useTheme();
  const {content} = theme.colors;
  return (
    <Clickable
      onPress={onPress}
      backgroundColor={'background'}
      flexDirection={'row'}
      borderRadius={5}
      justifyContent={'space-between'}
      alignItems={'center'}
      paddingHorizontal={'mx2'}
      borderWidth={0.5}
      borderColor="content"
      style={{borderColor: 'red'}}
      height={heightPercentageToDP('6.5%')}>
      <Box flexDirection={'row'} width="100%" justifyContent="space-between">
        <Text variant="medium" color="content" fontSize={14}>
          {title}
        </Text>
        <Icon name={icon} color={content} size={14} />
      </Box>
    </Clickable>
  );
};

const category = [
  {label: 'spare parts', value: 'parts'},
  {label: 'cars', value: 'cars'},
];
type UploadProps = {
  image: [];
  remove: (index?: string) => void;
};
const Uploads: React.FC<UploadProps> = ({image, remove}) => {
  const {name} = image;
  return (
    <Box
      marginVertical="my2"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between">
      <Image source={{uri: image.uri}} style={{height: 70, width: 70}} />
      <Clickable
        onPress={() => remove(name)}
        padding="mx3"
        backgroundColor="border">
        <Icon name={'close'} color={'red'} size={16} />
      </Clickable>
    </Box>
  );
};
const About = () => {
  const {navigate} = useNavigation();
  const [type, setType] = useState('parts');
  const {images, setImages, setPrice, maker, model, price} =
    useContext(ProductUploadContext);
  const [uploadCount, setUploadCount] = useState(0);
  const [proceed, setProceed] = useState(false);
  const [addOtherProduct, {isLoading}] = useAddOtherProductMutation();
  const toast = useToast();
  const {user} = useAuth();
  // useEffect(() => {
  //   console.log(images);
  // }, [images]);
  useUpdateEffect(() => {
    _.map(images, image => console.log(image.name));
    // console.log(images);
  }, [uploadCount]);
  // console.log(images);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      category: '',
      name: '',
      description: '',
      price: '',
    },
  });
  const handleSparePartSubmission = async (credentials: any) => {
    // console.log(credentials);
    const response = await addOtherProduct(credentials);
    const {data: resData, error} = response;
    if (resData?.success) {
      toast.show(resData?.message, {
        type: 'success',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
      setPrice(0);

      setImages([]);
      navigate('Dashboard');
    } else {
      console.log(response.error.data);
      toast.show(error?.data?.message, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    }
  };
  const onSubmit = (credentials: any) => {
    if (type === 'parts') {
      let formData = new FormData();
      _.map(images, item => {
        formData.append('images[]', item);
      });
      formData.append('user_id', user.id);
      Object.keys(credentials).forEach(key =>
        formData.append(key, credentials[key]),
      );
      handleSparePartSubmission(formData);
    } else {
      if (!price || !maker || !model || _.size(images) < 0) {
        toast.show('Please fill all fields', {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          animationType: 'zoom-in',
        });
      } else {
        setProceed(true);
      }
    }
  };

  const submitProduct = () => {
    setProceed(false);
    navigate('UploadCar');
  };

  const removeImage = (selected: any) => {
    const processed = images.filter(item => selected !== item.name);
    // console.log(selected);
    setImages(processed);
  };
  return (
    <Container backgroundColor="background">
      <Header leftIcon={true}  text={`Upload ${type}`} />
      <Box flex={1} justifyContent="space-between">
        <ConfirmationModal
          visible={proceed}
          header={'Confirmation'}
          description={
            'Are you sure you want to proceed to upload your product?'
          }
          confirm={submitProduct}
          decline={() => setProceed(false)}
        />
        <ScrollView>
          <Box paddingHorizontal="mx3">
            <Text
              variant="medium"
              fontSize={15}
              marginVertical="my3"
              color="content">
              Tell About Your Product
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({
                field: {
                  onChange,
                  // onBlur,
                  value,
                },
              }) => (
                <Box marginBottom="my2">
                  <Select
                    defaultValue=""
                    label={'what are your  selling'}
                    onSelect={val => {
                      setType(val);
                      onChange(val);
                    }}
                    data={category}
                  />
                </Box>
              )}
              name={'category'}
            />
            {type === 'parts' ? (
              <Box>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({
                    field: {
                      onChange,
                      // onBlur,
                      value,
                    },
                  }) => (
                    <Box marginBottom="my3">
                      <Input
                        value={value}
                        onChange={input => onChange(input)}
                        label="Product name"
                        customStyles={{}}
                      />
                    </Box>
                  )}
                  name={'name'}
                />
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({
                    field: {
                      onChange,
                      // onBlur,
                      value,
                    },
                  }) => (
                    <Box marginBottom="my3">
                      <Input
                        value={value}
                        onChange={input => onChange(input)}
                        label="Product description"
                        multiline={true}
                        lines={3}
                        customStyles={{}}
                      />
                    </Box>
                  )}
                  name={'description'}
                />
              </Box>
            ) : (
              <Box>
                <Box marginVertical="my2">
                  <ListItem
                    onPress={() => navigate('CarMaker')}
                    title={maker ? maker : 'What is your car make'}
                  />
                </Box>
                <Box marginVertical="my2">
                  <ListItem
                    onPress={() => navigate('CarModel')}
                    title={model ? model : 'What is your car model'}
                  />
                </Box>
                <Box marginVertical="my2">
                  <ListItem
                    onPress={() => navigate('CarDetails')}
                    title="Tell us about your car"
                  />
                </Box>
              </Box>
            )}
            <ProductImage selected={() => setUploadCount(uploadCount + 1)} />
            {_.size(images) > 0 &&
              _.map(images, (image, index) => (
                <Uploads remove={removeImage} key={index} image={image} />
              ))}

            <Box marginVertical="my3">
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({
                  field: {
                    onChange,
                    // onBlur,
                    value,
                  },
                }) => (
                  <Input
                    value={value}
                    onChange={input => {
                      onChange(input);
                      setPrice(input);
                    }}
                    inputType="phone-pad"
                    label="Product Price"
                    customStyles={{}}
                  />
                )}
                name="price"
              />
            </Box>
          </Box>
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
            isloading={isLoading}
            disabled={isLoading}
            childColor="white"
            onPress={handleSubmit(onSubmit)}
            type="primary"
            label={type === 'parts' ? 'Upload Product' : 'Schedule Inspection'}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default About;
