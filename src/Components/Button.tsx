import {TouchableOpacity, View, TextProps} from 'react-native';
import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  LayoutProps,
  shadow,
  ShadowProps,
  layout,
  BackgroundColorProps,
  composeRestyleFunctions,
  useTheme,
} from '@shopify/restyle';
import React, {ReactNode} from 'react';

import Text from './Text';
import {Theme} from '../theme';
import Box from './Box';
import {Chase} from 'react-native-animated-spinkit';

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  LayoutProps<Theme> &
  ShadowProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  shadow,
  layout,
  backgroundColor,
]);

type Props = RestyleProps & {
  onPress: () => void;
  label: string;
  textType?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  isloading?: boolean;
  type?: string;
  hasIcon?: boolean;
  buttonIcon?: () => ReactNode;
  textFont?: number;
  childColor?: string;
  disabled?: boolean;
};

const Button = ({
  onPress,
  label,
  textType = 'uppercase',
  childColor,
  hasIcon = false,
  type = 'primary',
  textFont = 15,
  disabled = false,
  buttonIcon = () => <></>,
  isloading = false,
  ...rest
}: Props) => {
  const props = useRestyle(restyleFunctions, rest);
  const theme = useTheme();
  const {primary, background} = theme.colors;
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <Box
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        borderRadius={10}
        paddingVertical="my2"
        borderWidth={type === 'primary' ? 0 : 1}
        borderColor={type === 'secondary' ? 'outlineSecondary' : 'primary'}
        backgroundColor={
          disabled
          ? 'lightprimary'
            : type === 'primary'
            ? 'primary'
            : 'background'
        }
        {...props}>
        {hasIcon && <Box marginRight="mx2">{buttonIcon()}</Box>}
        {isloading && (
          <Chase color={childColor} style={{marginRight: 5}} size={16} />
        )}
        <Text
          variant="medium"
          fontSize={textFont}
          textTransform={textType}
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
