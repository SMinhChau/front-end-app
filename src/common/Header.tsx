import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../Themes/Colors';
import {responsiveHeight, responsiveWidth} from '../utilities/sizeScreen';
import GlobalStyles from './styles/GlobalStyles';
import MaterialIcons from '@types/react-native-vector-icons/MaterialIcons';

interface Props {
  title: string;
  icon?: boolean;
}
const Header: React.FC<Props> = ({title, icon}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={GlobalStyles.titleHeader}>{title}</Text>

      {icon && (
        <TouchableOpacity
          style={{
            backgroundColor: 'gray',
            marginRight: 30,
            padding: 5,
            borderRadius: 20,
          }}>
          <MaterialIcons name="home" color="white" size={24} />
        </TouchableOpacity>
      )}
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
