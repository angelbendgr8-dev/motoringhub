import {Platform, StatusBar} from 'react-native';
import React from 'react';
import {
  useRestyle,
  spacing,
  backgroundColor,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  composeRestyleFunctions,
  createBox,
  useTheme,
} from '@shopify/restyle';
import {Theme} from '../theme';

const Box = createBox();
type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme>;
const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  backgroundColor,
]);
type Props = RestyleProps & {};
const Container: React.FC<Props> = ({children, ...rest}) => {
  const props = useRestyle(restyleFunctions, rest);
  const theme = useTheme();
  const {primary} = theme.colors
  return (
    <Box
      {...props}
      flex={1}
      backgroundColor="background"
      // paddingTop={Platform.OS === 'android' ? 's' : 'm'}
    >
      <StatusBar backgroundColor={primary} barStyle={'light-content'} />
      {children}
    </Box>
  );
};

export default Container;
