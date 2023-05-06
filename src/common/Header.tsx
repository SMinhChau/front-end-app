import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Colors from '../Themes/Colors';
import IconView from './IconView';
import {useNavigation} from '@react-navigation/native';
import RouteNames from '../Components/RouteNames';
import {responsiveFont, responsiveHeight} from '../utilities/sizeScreen';
import {Images} from '../assets/images/Images';

interface Props {
  title: string;
  iconLeft?: boolean;
  iconRight?: boolean;
  home?: boolean;
  back?: boolean;
  style?: any;
  logo?: boolean;
}
const Header: React.FC<Props> = ({
  title,
  style,
  back,
  iconLeft,
  home,
  iconRight,
  logo,
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
      {logo && (
        <Image
          source={Images.logo_iuh}
          style={{
            width: 100,
            height: 40,
            position: 'relative',
            left: 60,
            top: -5,
          }}
        />
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
        <Text style={[logo ? styles.content_Logo : styles.textView]}>
          {title}
        </Text>
      </View>

      <View style={styles.contentIconRight}>
        {iconRight && (
          <TouchableOpacity
            onPress={() => navigation.navigate(RouteNames.Notification)}
            style={[styles.contentIcon]}>
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
    // backgroundColor: Colors.primaryButton,
    backgroundColor: Colors.white,
    paddingVertical: responsiveHeight(15),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.primaryButton,
    borderBottomWidth: 1,
    elevation: 5,
    shadowOpacity: 0.02,
    shadowOffset: {width: 2, height: 3},
  },
  contentText: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    textAlign: 'center',
    fontSize: responsiveFont(20),
    color: '#003049',
    fontWeight: '600',
  },
  content_Logo: {
    textAlign: 'center',
    position: 'relative',
    left: -20,
    fontSize: responsiveFont(20),
    color: '#003049',
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
