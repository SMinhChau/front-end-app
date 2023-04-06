import {TouchableOpacity, StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';

import Colors from '../Themes/Colors';

interface Props {
  title?: string;
  style?: any;
  onPress?: () => void;
  disabled?: boolean;
  textStyle?: any;
  wrapper?: string;
}

const ButtonView: React.FC<Props> = ({title, style, onPress, disabled}) => {
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

export default ButtonView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    height: 50,
    minHeight: 40,
    marginBottom: 5,
    marginTop: 30,
    borderColor: Colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0096c7',
  },
  textStyle: {
    color: '#ade8f4',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
});
