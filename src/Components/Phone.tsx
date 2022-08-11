import {StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';
import Box from './Box';
import PhoneInput from 'react-native-phone-number-input';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Text from './Text';
import {useTheme} from '@shopify/restyle';

type Props = {
  //   onChange: (e: Event) => void;
  label: string;
  //   customStyles: {};
};

const Phone: React.FC<Props> = ({label}) => {
  const [phone, setPhone] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [code, setCode] = useState('234');
  const phoneInput = useRef<PhoneInput>(null);
  const theme = useTheme();
  const {background, content} = theme.colors;
  return (
    <Box
      backgroundColor={'background'}
      flexDirection={'row'}
      borderRadius={10}
      justifyContent={'space-between'}
      marginVertical={'my3'}
      alignItems={'center'}
      //   paddingHorizontal={'mx2'}
      borderColor="content"
      borderWidth={1}
      height={heightPercentageToDP('6.5%')}
      //   style={customStyles}
    >
      {phone.length > 0 && (
        <Box
          position="absolute"
          top={-10}
          left={25}
          zIndex={5}
          paddingHorizontal={'mx3'}
          backgroundColor="background">
          <Text variant="regular">{label}</Text>
        </Box>
      )}
      <PhoneInput
        ref={phoneInput}
        defaultValue={phone}
        defaultCode="NG"
        layout="first"
        // placeholder=" "
        onChangeCountry={country => setCode(country.callingCode[0])}
        onChangeText={text => {
          setPhone(text);
        }}
        onFocus={() => {}}
        onChangeFormattedText={text => {
          setFormattedValue(text);
        }}
        codeTextStyle={{color: content}}
        withShadow
        containerStyle={[
          styles.phoneInputContainer,
          {backgroundColor: background, borderColor: content},
        ]}
        textContainerStyle={{
          borderRadius: 45,
          backgroundColor: 'transparent',
        }}
        textInputStyle={{
          height: 40,
          marginTop: 1,
          color: content,
          fontSize: 16,
          fontWeight: '400',
        }}
      />
    </Box>
  );
};

export default Phone;

const styles = StyleSheet.create({
  phoneInputContainer: {
    height: '100%',
    // marginHorizontal: heightPercentageToDP('1.3%'),
    marginVertical: 10,

    borderRadius: 10,
    width: '100%',
    // borderWidth: 1,
    // borderColor: '#6294CD',
  },
});
