import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@shopify/restyle';
import ModalSelector from 'react-native-modal-selector';
import Box from './Box';
import Input from './Input';
import {heightPercentageToDP} from 'react-native-responsive-screen';

interface dataType {
  key: number;
  label: string;
}

type Props = {
  value: string;
  onValueChange: (value: string) => void;
  data: Array<dataType>;
};

const LocationModal: React.FC<Props> = ({value, onValueChange, data}) => {
  const theme = useTheme();
  const {background, content, border} = theme.colors;
  return (
    <Box marginTop="my3">
      <ModalSelector
        data={data}
        initValue="Fix at motoringhub service center"
        supportedOrientations={['landscape']}
        fullHeight={true}
        accessible={true}
        overlayStyle={{
          backgroundColor: background,
          padding: 0,
        }}
        optionContainerStyle={{
          // backgroundColor: 'red',
          margin: 0,
          padding: 0,
        }}
        sectionStyle={{
          padding: 8,

          borderBottomColor: border,
        }}
        sectionTextStyle={{textAlign: 'left', color: content}}
        optionTextStyle={{color: content, textAlign: 'left'}}
        optionStyle={{
          // backgroundColor: 'green',
          margin: 0,
          color: content,
          borderBottomColor: border,
        }}
        searchStyle={{
          height: heightPercentageToDP('5%'),
          marginTop: 10,
        }}
        scrollViewAccessibilityLabel={'Scrollable options'}
        cancelButtonAccessibilityLabel={'Cancel Button'}
        onChange={option => {
          onValueChange(option.label);
        }}
      />
    </Box>
  );
};

export default LocationModal;
