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
  borderRadius10: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  margin20: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  borderContent: {
    borderRadius: 10,
    borderColor: Colors.blueBoder,
    borderWidth: 1,
    elevation: 5,
    shadowOpacity: 0.02,
    shadowOffset: {width: 2, height: 3},
  },
  flexDirectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
