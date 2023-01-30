import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../Themes/Colors';
import {responsiveHeight, responsiveWidth} from '../utilities/sizeScreen';
import GlobalStyles from './styles/GlobalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../Components/Home/Home';

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
          <Ionicons name="home-outline" color={Colors.headerColor} size={24} />
        </TouchableOpacity>
      )}

      {iconLeft && back && (
        <TouchableOpacity style={styles.contentIcon}>
          <Ionicons
            name="arrow-back-outline"
            color={Colors.headerColor}
            size={24}
          />
        </TouchableOpacity>
      )}

      <Text style={[GlobalStyles.titleHeader, styles.textView]}>{title}</Text>

      {iconRight && (
        <TouchableOpacity style={styles.contentIcon}>
          <Ionicons
            name="notifications-outline"
            color={Colors.headerColor}
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
    paddingHorizontal: responsiveWidth(10),
    backgroundColor: Colors.primary,
    paddingVertical: responsiveHeight(20),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  textView: {
    paddingHorizontal: responsiveWidth(110),
  },
  contentIcon: {},
});
