import {View, StyleSheet, Text} from 'react-native';
import Colors from '../Themes/Colors';
import {responsiveHeight, responsiveWidth} from '../utilities/sizeScreen';
import GlobalStyles, {textPrimary} from './styles/GlobalStyles';

interface Props {
  title: string;
}
const Header: React.FC<Props> = ({title}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={GlobalStyles.titleHeader}>{title}</Text>

      <View></View>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: Colors.primary,
    paddingVertical: responsiveHeight(20),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
