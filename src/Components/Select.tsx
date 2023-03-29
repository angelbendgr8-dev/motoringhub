import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {createBox, useTheme} from '@shopify/restyle';
import {Dropdown} from 'react-native-element-dropdown';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Text from './Text';
import {RFValue} from 'react-native-responsive-fontsize';
const Box = createBox();

type Props = {
  data: Array<{}>;
  label: string;
  disabled?: boolean;
  onSelect: (val: string) => void;
  defaultValue: string;
};
const Select: React.FC<Props> = ({
  data,
  disabled = false,
  defaultValue,
  label,
  onSelect,
}) => {
  const [value, setValue] = useState(defaultValue);

  const theme = useTheme();
  const {title, muted, background, grey, border, content} = theme.colors;
  const renderItem = (item: any) => {
    return (
      <View style={[styles.item, {borderBottomColor: border}]}>
        <Text
          textTransform="capitalize"
          variant={'regular'}
          fontSize={RFValue(16)}
          color="content">
          {item.label}
        </Text>
      </View>
    );
  };
  return (
    <Box
      // marginVertical={'my1'}
      paddingVertical="mx1"
      borderWidth={0.5}
      borderColor="content"
      borderRadius={5}>
      <Box
        position="absolute"
        top={-10}
        left={25}
        zIndex={5}
        paddingHorizontal={'mx3'}
        backgroundColor="background">
        <Text variant="regular">{label}</Text>
      </Box>
      <Dropdown
        style={[styles.dropdown, {backgroundColor: 'transparent'}]}
        placeholderStyle={[styles.placeholderStyle, {color: content}]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          {color: disabled ? muted : content},
        ]}
        containerStyle={[
          {backgroundColor: grey, borderWidth: 0, borderRadius: 5},
        ]}
        data={data}
        maxHeight={300}
        width={200}
        disable={disabled}
        labelField="label"
        valueField="value"
        activeColor={grey}
        value={value}
        onChange={item => {
          setValue(item.value);
          onSelect(item.value);
        }}
        renderItem={renderItem}
      />
    </Box>
  );
};

export default Select;

const styles = StyleSheet.create({
  dropdown: {
    height: heightPercentageToDP('5.5%'),
    // borderColor: 'gray',
    // borderWidth: 0.5,
    borderRadius: 30,
    paddingHorizontal: 8,
    width: '100%',
    color: 'white',
    // backgroundColor: 'red',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'transparent',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: 'white',
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
  },
});
