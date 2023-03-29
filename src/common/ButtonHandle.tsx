/**
 * Created by Hong HP on 3/16/20.
 */

import {TouchableOpacity, StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';

import Colors from '../Themes/Colors';
import {responsiveHeight, responsiveWidth} from '../utilities/sizeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  title?: string;
  style?: any;
  onPress?: () => void;
  out?: boolean;
  textStyle?: any;
  wrapper?: string;
  icon?: boolean;
  disabled?: boolean;
  colorIcon?: any;
  iconName?: string;
}

const ButtonHandle: React.FC<Props> = ({
  title,
  style,
  onPress,
  out,
  colorIcon,
  iconName,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, style, out && {backgroundColor: '#bc4749'}]}
      onPress={onPress}>
      <View style={styles.content}>
        <Ionicons
          name={iconName ? iconName : 'ios-log-out-outline'}
          size={24}
          color={colorIcon ? colorIcon : Colors.white}
        />
        {title && <Text style={[styles.textStyle]}>{title}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default ButtonHandle;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.primary,
    paddingVertical: responsiveHeight(5),
    marginVertical: responsiveHeight(10),
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: responsiveWidth(15),
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#80b918',
  },
  textStyle: {
    color: Colors.white,
    fontSize: 16,
    paddingHorizontal: responsiveWidth(10),
    textAlign: 'center',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
