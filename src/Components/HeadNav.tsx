import {Image} from 'react-native';
import React from 'react';
import Box from './Box';
import Clickable from './Clickable';
import {useTheme} from '@shopify/restyle';
import Toggle from 'react-native-vector-icons/AntDesign';
import Bell from 'react-native-vector-icons/Fontisto';
import {logo} from '../assets';
import {useNavigation} from '@react-navigation/native';
import Text from './Text';

type Props = {
  leftIcons?: boolean;
  hasSkip?: boolean;
};
const HeadNav: React.FC<Props> = ({leftIcons = true, hasSkip = false}) => {
  const theme = useTheme();
  const {title} = theme.colors;
  const {navigate} = useNavigation();
  return (
    <Box
      flexDirection="row"
      paddingVertical="mx4"
      paddingHorizontal="mx2"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="background">
      <Box flexDirection="row" alignItems="center">
        {/* <Clickable onPress={()=>navigation.openDrawer()}>
          <Toggle name="menuunfold" color={title} size={18} />
        </Clickable> */}
        <Clickable marginLeft="mx3">
          <Image source={logo} style={{}} />
        </Clickable>
      </Box>
      {hasSkip && (
        <Box
          height={200}
          width={200}
          zIndex={-5}
          borderRadius={120}
          backgroundColor="border"
          position={'absolute'}
          right={-50}
          top={-100}
        />
      )}
      {leftIcons && (
        <Box flexDirection="row">
          <Clickable onPress={() => navigate('Search')} paddingHorizontal="mx2">
            <Toggle name="search1" color={title} size={18} />
          </Clickable>
          <Clickable paddingHorizontal="mx2">
            <Bell name="bell" color={title} size={18} />
          </Clickable>

          {/* <Clickable paddingHorizontal="mx2">
            <Toggle name="shoppingcart" color={title} size={18} />
          </Clickable> */}
          {/* <Clickable paddingHorizontal="mx2">
          <Toggle name="menuunfold" color={title} size={18} />
        </Clickable> */}
        </Box>
      )}
      {hasSkip && (
        <Clickable
          onPress={() => navigate('Dashboard')}
          paddingHorizontal="mx2">
          <Text variant={'medium'} textTransform={'uppercase'} fontSize={14}>
            Skip
          </Text>
        </Clickable>
      )}
    </Box>
  );
};

export default HeadNav;
