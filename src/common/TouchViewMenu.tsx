import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import Colors from '../Themes/Colors';
import {responsiveHeight, responsiveWidth} from '../utilities/sizeScreen';
import IconView from './IconView';
import Lottie from 'lottie-react-native';
import GlobalStyles from './styles/GlobalStyles';
interface Props {
  title?: string;
  require?: string;
  onPress?: () => void;
}
const TouchViewMenu: React.FC<Props> = ({title, onPress}) => {
  return (
    <TouchableOpacity style={[styles.content]} onPress={onPress}>
      <Lottie
        source={require('../../src/assets/jsonAmination/term_menu.json')}
        autoPlay
        loop
        style={styles.iconTerm}
      />
      <Text style={styles.title}>{title}</Text>
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
    backgroundColor: Colors.white,
    flexDirection: 'row',
    width: responsiveWidth(160),
    borderRadius: 20,
    borderColor: Colors.blueBoder,
    borderWidth: 1,
    shadowOpacity: 1,
    shadowColor: Colors.primaryButton,
    elevation: 5,
    shadowOffset: {width: 2, height: 2},
  },
  title: {
    fontSize: 20,
    color: '#0096c7',
    fontWeight: '500',
  },
  iconTerm: {
    position: 'absolute',
    width: responsiveWidth(70),
  },
});
