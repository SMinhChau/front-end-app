import {StyleSheet} from 'react-native';
import Colors from '../../Themes/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  textPrimary: {
    fontSize: 14,
    color: Colors.headerColor,
  },

  titleHeader: {
    fontSize: 20,
    color: Colors.headerColor,
    fontWeight: '500',
  },
  textError: {
    fontSize: 14,
    color: Colors.red,
    fontWeight: '400',
  },
  rememberText: {
    fontSize: 14,
    color: Colors.headerColor,
  },

  flexEnd: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
