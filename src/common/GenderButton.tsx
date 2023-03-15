import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import Colors from '../Themes/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../utilities/sizeScreen';

interface Props {
  onPress: () => void;
  selected: boolean;
  style: any;
  text: string;
  icon: string;
}

const GenderButton = ({onPress, selected, style, text, icon}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => !!onPress && onPress()}
      style={[
        styles.container,
        selected && {
          backgroundColor: Colors.primary,
          borderColor: Colors.blueBoder,
        },
        style,
      ]}>
      <Ionicons name={'close-circle'} color={Colors.grayLight} size={18} />
      {/* <FastImage
          source={icon}
          style={styles.icon}
          tintColor={selected ? Colors.secondaryPlaceV3 : Colors.borderColor}
        /> */}
      <Text style={[styles.text, selected && {color: Colors.rosyBrown}]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default GenderButton;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(6),
    paddingHorizontal: responsiveWidth(12),
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.grayLight,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: responsiveWidth(4),
  },
  text: {
    fontSize: responsiveFont(14),
    color: Colors.grayLight,
  },
});
