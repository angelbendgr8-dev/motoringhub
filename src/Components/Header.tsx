import {TouchableOpacity} from 'react-native';
import React from 'react';
import {createBox} from '@shopify/restyle';
import Icon from 'react-native-vector-icons/AntDesign';
import Text from './Text';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import Clickable from './Clickable';

import {useTheme} from '@shopify/restyle';
import Toggle from 'react-native-vector-icons/AntDesign';
import Bell from 'react-native-vector-icons/Fontisto';

const Box = createBox();
type Props = {
  text?: string;
  leftIcon?: boolean;
  rightIcon?: boolean;
  closeIcon?: React.ReactFragment;
  bgColor?: string;
  rightButtonClicked?: () => void;
};
const Header: React.FC<Props> = ({
  leftIcon = false,
  text = '',
  rightIcon = false,
  closeIcon,
  bgColor = 'primary',
  rightButtonClicked,
}) => {
  const {goBack} = useNavigation();
  const theme = useTheme();
  const {title, background} = theme.colors;
  return (
    <Box
      backgroundColor={bgColor}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      paddingHorizontal={'mx2'}
      paddingVertical={'my2'}>
      <Box flexDirection={'row'} alignItems={'center'}>
        {leftIcon && (
          <Clickable
            flexDirection="row"
            alignItems="center"
            onPress={goBack}
            style={{padding: 2}}>
            <Icon name="arrowleft" color={background} size={18} />
          </Clickable>
        )}
        <Box marginLeft={'s'} alignItems={'center'}>
          <Text
            variant={'medium'}
            marginRight={'s'}
            color="background"
            fontSize={RFValue(16)}>
            {text}
          </Text>
        </Box>
      </Box>

      {rightIcon && (
        <Box flexDirection="row">
          <Clickable onPress={rightButtonClicked} paddingHorizontal="mx2">
            <Toggle name="search1" color={background} size={18} />
          </Clickable>

          {/* <Clickable paddingHorizontal="mx2">
          <Toggle name="shoppingcart" color={title} size={18} />
        </Clickable> */}
          {/* <Clickable paddingHorizontal="mx2">
          <Toggle name="menuunfold" color={title} size={18} />
        </Clickable> */}
        </Box>
      )}
      {/* {closeIcon()} */}
    </Box>
  );
};

export default Header;
