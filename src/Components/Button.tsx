import {TouchableOpacity, View} from 'react-native';
import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  LayoutProps,
  layout,
  BackgroundColorProps,
  composeRestyleFunctions,
} from '@shopify/restyle';
import React from 'react';

import Text from './Text';
import {Theme} from '../theme';
import Box from './Box';
import {Chase} from 'react-native-animated-spinkit';
import {transparent} from 'react-native-paper/lib/typescript/styles/colors';

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  LayoutProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  layout,
  backgroundColor,
]);

type Props = RestyleProps & {
  onPress: () => void;
  label: string;

  isloading?: boolean;
  type?: string;
  childColor?: string;
};

const Button = ({
  onPress,
  label,

  childColor,
  type = 'primary',
  isloading = false,
  ...rest
}: Props) => {
  const props = useRestyle(restyleFunctions, rest);

  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        borderRadius={10}
        paddingVertical="my2"
        borderWidth={type === 'primary' ? 0 : 1}
        borderColor={type === 'secondary' ? 'outlineSecondary' : 'primary'}
        backgroundColor={type === 'primary' ? 'primary' : 'background'}
        {...props}>
        {isloading && (
          <Chase color={childColor} style={{marginRight: 5}} size={16} />
        )}
        <Text
          variant="medium"
          fontSize={20}
          textTransform={'uppercase'}
          color={
            type === 'primary'
              ? 'white'
              : type === 'secondary'
              ? 'outlineSecondary'
              : 'primary'
          }>
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};
export default Button;
