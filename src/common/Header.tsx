import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import Colors from '../Themes/Colors';
import IconView from './IconView';
import {useNavigation} from '@react-navigation/native';
import GlobalStyles from './styles/GlobalStyles';
import RouteNames from '../Components/RouteNames';
import {responsiveFont, responsiveHeight} from '../utilities/sizeScreen';

interface Props {
  title: string;
  iconLeft?: boolean;
  iconRight?: boolean;
  home?: boolean;
  back?: boolean;
  style?: any;
}
const Header: React.FC<Props> = ({
  title,
  style,
  back,
  iconLeft,
  home,
  iconRight,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.sectionContainer, style]}>
      {iconLeft && home && (
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteNames.homeTab)}
          style={[styles.contentIcon, styles.contentIconLeft]}>
          <IconView name="home-outline" color={Colors.textPrimary} size={24} />
        </TouchableOpacity>
      )}

      {iconLeft && back && (
        <TouchableOpacity
          style={[styles.contentIcon, styles.contentIconLeft]}
          onPress={() => navigation.goBack()}>
          <IconView
            name="arrow-back-outline"
            color={Colors.textPrimary}
            size={24}
          />
        </TouchableOpacity>
      )}

      <View style={styles.contentText}>
        <Text style={[styles.textView]}>{title}</Text>
      </View>

      <View style={styles.contentIconRight}>
        {iconRight && (
          <TouchableOpacity style={[styles.contentIcon]}>
            <IconView
              name="notifications-outline"
              color={Colors.textPrimary}
              size={24}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    // paddingHorizontal: responsiveHeight(10),
    backgroundColor: Colors.primaryButton,
    paddingVertical: responsiveHeight(15),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.blueBoder,
    borderEndWidth: 1,
    elevation: 5,
    shadowOpacity: 0.02,
    shadowOffset: {width: 2, height: 3},
  },
  contentText: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 90,
    // marginRight: 90,
  },
  textView: {
    textAlign: 'center',
    fontSize: responsiveFont(20),
    color: '#f7ede2',
    fontWeight: '600',
  },
  contentIcon: {
    backgroundColor: Colors.white,

    borderRadius: 20,
  },
  contentIconLeft: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  contentIconRight: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
