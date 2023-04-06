import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import Colors from '../Themes/Colors';
import {responsiveHeight, responsiveWidth} from '../utilities/sizeScreen';
import Lottie from 'lottie-react-native';

interface Props {
  title?: string;
  require?: string;
  backgroundColor?: any;
  borderColor?: any;
  onPress?: () => void;
}
const TouchViewMenu: React.FC<Props> = ({
  title,
  onPress,
  backgroundColor,
  borderColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.content,
        {backgroundColor: backgroundColor ? backgroundColor : Colors.white},
        {borderColor: borderColor ? borderColor : Colors.blueBoder},
      ]}
      onPress={onPress}>
      <Lottie
        source={require('../../src/assets/jsonAmination/term_menu.json')}
        autoPlay
        loop
        style={[styles.iconTerm]}
      />
      <View style={styles.cotent}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TouchViewMenu;

const styles = StyleSheet.create({
  content: {
    height: responsiveHeight(200),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    flexDirection: 'column',
    width: responsiveWidth(160),
    borderRadius: 30,

    borderWidth: 2,
    shadowOpacity: 1,
    shadowColor: Colors.primaryButton,
    elevation: 5,
    shadowOffset: {width: 2, height: 2},
  },
  cotent: {},
  title: {
    fontSize: 20,
    color: '#0096c7',
    fontWeight: '500',
  },
  iconTerm: {
    // position: 'absolute',
    width: responsiveWidth(70),
  },
});
