import {
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  createBox,
  useTheme,
} from '@shopify/restyle';
import React from 'react';

import {Theme} from '../theme';
import {KeyboardTypeOptions, StyleSheet, TextInput, View} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Text from './Text';
const Box = createBox();

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme>;

type Props = RestyleProps & {
  value: string;
  onChange: (e: any) => void;
  type?: string;
  secure?: boolean;
  label: string;
  disabled?: boolean;
  blurred?: () => void;
  rightBtn?: Function;
  leftIcon?: Function;
  inputType?: KeyboardTypeOptions;
  customStyles?: {};
  multiline?: boolean;
  lines?: number;
};

const Input = ({
  value,
  onChange,
  type = 'none',
  secure = false,
  disabled = true,
  blurred,
  rightBtn,
  inputType = 'text',
  label,
  multiline = false,
  lines = 1,
  customStyles = {},
}: Props) => {
  // const [holder, setHolder] = React.useState(placeholder);
  const [isFocus, setIsFocus] = React.useState(false);
  const theme = useTheme();
  const {content, primary, title} = theme.colors;

  return (
    <Box
      backgroundColor={'background'}
      flexDirection={'row'}
      borderRadius={5}
      justifyContent={'space-between'}
      alignItems={'center'}
      paddingHorizontal={'mx2'}
      borderColor={isFocus ? 'title' : 'content'}
      borderWidth={0.5}
      height={
        multiline
          ? (heightPercentageToDP('6.5%') * lines) / 2
          : heightPercentageToDP('6.5%')
      }
      style={customStyles}>
      {isFocus && (
        <Box
          position="absolute"
          top={-10}
          left={25}
          zIndex={5}
          paddingHorizontal={'mx3'}
          backgroundColor="grey">
          <Text variant="regular" color="title">
            {label}
          </Text>
        </Box>
      )}
      <TextInput
        value={value}
        placeholder={isFocus ? '' : label}
        placeholderTextColor={content}
        onChangeText={onChange}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
          // blurred()
        }}
        onEndEditing={blurred}
        style={[
          styles.inputStyle,
          {
            flex: 2,
            color: content,
            textAlignVertical: multiline ? 'top' : 'center',
          },
          // props.style,
        ]}
        // multiline={props.line ? true : false}
        textContentType={type}
        secureTextEntry={secure}
        editable={disabled}
        keyboardType={inputType}
        multiline={multiline}
        numberOfLines={lines}
        underlineColorAndroid="transparent"
      />
      {rightBtn && <View style={{}}>{rightBtn()}</View>}
    </Box>
  );
};

export default Input;

const styles = StyleSheet.create({
  iconStyle: {
    // marginLeft:10,
    alignSelf: 'center',
  },
  inputStyle: {
    borderBottomWidth: 0,

    fontFamily: 'Roboto-Medium',
    // backgroundColor:'green',
  },
});
