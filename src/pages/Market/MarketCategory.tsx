import {View} from 'react-native';
import React, {Component, ReactNode} from 'react';
import Container from '../../Components/Container';
import Box from '../../Components/Box';
import Text from '../../Components/Text';

import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import Card from '../../Components/HCard';
import {useTheme} from '@shopify/restyle';
import Clickable from '../../Components/Clickable';

type Props = {
  icon: Function;
  title: string;
};
const MarketCategory: React.FC<Props> = ({icon, title}) => {
  const theme = useTheme();
  
  const {primary} = theme.colors;

  return (
    <Container>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Box flexDirection="row">
          <Text variant="bold" fontSize={16}>
            {title}
          </Text>
          {icon()}
        </Box>
        <Clickable>
          <Text variant="regular" color="primary" fontSize={14}>
            See all
          </Text>
        </Clickable>
      </Box>

      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </Container>
  );
};

export default MarketCategory;
