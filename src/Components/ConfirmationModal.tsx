import React, {useMemo, useState} from 'react';
import {StyleSheet, ScrollView, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import Box from './Box';
import Clickable from './Clickable';
import Text from './Text';
import {heightPercentageToDP} from 'react-native-responsive-screen';

type Props = {
  visible: boolean;
  confirm: () => void;
  decline: () => void;
  header: string;
  description: string;
};

const ConfirmationModal: React.FC<Props> = ({
  visible,
  confirm,
  decline,
  header,
  description,
}) => {
  return (
    <Box>
      <Modal isVisible={visible}>
        <Box backgroundColor="grey" padding="mx4" borderRadius={3}>
          <Box
            borderBottomColor="border"
            paddingBottom="my3"
            borderBottomWidth={1}>
            <Text
              variant="medium"
              paddingBottom="my1"
              color="title"
              fontSize={16}>
              {header}
            </Text>
            <Text variant="regular" fontSize={14}>
              {description}
            </Text>
          </Box>
          <Box
            flexDirection="row"
            marginTop="my2"
            justifyContent="space-evenly">
            <Clickable onPress={confirm}>
              <Text variant="medium">Continue</Text>
            </Clickable>
            <Clickable onPress={decline}>
              <Text variant="medium" color="primary">
                Go Back
              </Text>
            </Clickable>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({});
