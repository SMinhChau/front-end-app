import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import Colors from '../Themes/Colors';
import IconView from './IconView';

import GlobalStyles from './styles/GlobalStyles';
interface Props {
  title?: string;
}
const TouchViewMenu: React.FC<Props> = ({title}) => {
  return (
    <TouchableOpacity style={[styles.content]}>
      {/* <IconView name="arrow-redo" color={Colors.primaryButton} size={30} /> */}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TouchViewMenu;

const styles = StyleSheet.create({
  content: {
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#caf0f8',
    flexDirection: 'row',
    width: 180,
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
});
