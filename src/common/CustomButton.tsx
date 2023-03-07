/**
 * Created by Hong HP on 3/16/20.
 */

import {TouchableOpacity, StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';

import Colors from '../Themes/Colors';
import {responsiveHeight, responsiveWidth} from '../utilities/sizeScreen';

interface Props {
  title: string;
  style: any;
  onPress: () => void;
  disabled?: boolean;
  textStyle: any;
  wrapper: string;
}

const CustomButton: React.FC<Props> = ({title, style, onPress, disabled}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        disabled && {backgroundColor: Colors.grayLight},
      ]}
      disabled={disabled}
      onPress={onPress}>
      {title && <Text style={[styles.textStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.blueBoder,
    paddingHorizontal: responsiveWidth(16),
    paddingVertical: responsiveHeight(16),
    width: responsiveWidth(120),
  },
  textStyle: {
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'center',
    color: Colors.textPrimary,
  },
});
