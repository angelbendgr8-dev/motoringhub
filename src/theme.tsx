import {createTheme} from '@shopify/restyle';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
const palette = {
  primary: '#E5202B',
  lightprimary: 'rgba(255, 219, 216, 1)',
  lighterprimary: 'rgba(255, 246, 245, 1)',
  border: '#DDDDDD',
  title: '#222222',
  white: '#FFFFFF',
  lightbg: '#E5E5E5',
  content: '#777777',
  transparent: 'rgba(1,1,1,0.1)',
  blackbg: '#2B2B2B',
  lightgray: '#EDEFF4',
  darkgray: '#232323',
  darkcontent: '#BABABA',
  darktitle: '#EFEFEF',
  darkoutline: '#BABABA',
};

export const theme = createTheme({
  colors: {
    background: palette.lightbg,
    title: palette.title,
    lightprimary: palette.lightprimary,
    lighterprimary: palette.lighterprimary,
    primary: palette.primary,
    content: palette.content,
    border: palette.border,
    grey: palette.lightgray,
    white: palette.white,
    outlineSecondary: palette.content,
  },

  spacing: {
    s: 4,
    my2: heightPercentageToDP('2%'),
    my1: heightPercentageToDP('1%'),
    mx1: widthPercentageToDP('1%'),
    my3: heightPercentageToDP('3%'),
    mx3: widthPercentageToDP('3%'),
    mx2: widthPercentageToDP('2%'),
    my4: heightPercentageToDP('4%'),
    my7: heightPercentageToDP('7%'),
    py4: heightPercentageToDP('4%'),
    mx4: widthPercentageToDP('3.5%'),
    py2: heightPercentageToDP('2%'),
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    bold: {
      fontFamily: 'Lato-Black',
      fontSize: RFValue(30),
      lineHeight: 39,
      color: 'content',
    },
    medium: {
      fontFamily: 'Lato-Bold',
      fontSize: 20,
      lineHeight: 21,
      color: 'content',
    },
    regular: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      lineHeight: 21,
      color: 'content',
    },
    Light: {
      fontFamily: 'Lato-Light',
      fontSize: RFValue(15),
      lineHeight: 21,
      color: 'content',
    },
    thin: {
      fontFamily: 'Lato-Thin',
      fontSize: RFValue(13),
      lineHeight: 21,
      color: 'content',
    },
  },
  breakpoints: {},
  position: {},
});

export type Theme = typeof theme;

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.blackbg,
    title: palette.darktitle,
    content: palette.darkcontent,
    grey: palette.darkgray,
    border: palette.content,
    outlineSecondary: palette.darktitle,
  },
};
export default theme;
