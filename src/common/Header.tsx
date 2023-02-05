import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../Themes/Colors';
import IconView from './IconView';

import GlobalStyles from './styles/GlobalStyles';

interface Props {
  title: string;
  iconLeft?: boolean;
  iconRight?: boolean;
  home?: boolean;
  back?: boolean;
}
const Header: React.FC<Props> = ({title, back, iconLeft, home, iconRight}) => {
  return (
    <View style={[styles.sectionContainer]}>
      {iconLeft && home && (
        <TouchableOpacity style={styles.contentIcon}>
          <IconView name="home-outline" color={Colors.black} size={24} />
        </TouchableOpacity>
      )}

      {iconLeft && back && (
        <TouchableOpacity style={styles.contentIcon}>
          <IconView name="arrow-back-outline" color={Colors.black} size={24} />
        </TouchableOpacity>
      )}

      <Text style={[GlobalStyles.titleHeader, styles.textView]}>{title}</Text>

      {iconRight && (
        <TouchableOpacity style={styles.contentIcon}>
          <IconView
            name="notifications-outline"
            color={Colors.black}
            size={24}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: Colors.primary,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  textView: {
    paddingHorizontal: 110,
  },
  contentIcon: {
    backgroundColor: Colors.white,
    padding: 5,
    borderRadius: 20,
  },
});
