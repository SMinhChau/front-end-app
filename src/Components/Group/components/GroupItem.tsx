import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import IconView from '../../../common/IconView';
import GlobalStyles from '../../../common/styles/GlobalStyles';
import Colors from '../../../Themes/Colors';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';

interface Props {
  title: string;
  icon?: boolean;
  onPress: () => void;
  handleJoin: () => void;
  join: boolean;
}
const GroupItem: React.FC<Props> = ({
  title,
  icon,
  onPress,
  join,
  handleJoin,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[GlobalStyles.margin20, styles.contentTitle]}>
      <View style={styles.viewIcon}>
        <IconView
          name="ios-people-circle-sharp"
          color={Colors.iconbr}
          size={26}
        />
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '90%',
        }}>
        <Text numberOfLines={1} style={styles.titleGroup}>
          {title}dskhfgjhtriedasf
        </Text>
        {join && (
          <TouchableOpacity onPress={handleJoin}>
            <Text style={styles.joinStyle}>Tham gia </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default GroupItem;

const styles = StyleSheet.create({
  contentTitle: {
    paddingHorizontal: responsiveWidth(16),
    paddingVertical: responsiveHeight(9),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 0.5,
    shadowOpacity: 3,
    borderRadius: 10,
    backgroundColor: '#caf0f8',
    borderColor: '#caf0f8',
    marginTop: responsiveHeight(10),
    shadowOffset: {width: 2, height: 3},
  },
  viewIcon: {
    width: '10%',
    backgroundColor: '#e8e8e4',
    borderRadius: 10,
    marginRight: responsiveWidth(10),
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(6),
  },
  titleGroup: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '400',
    flex: 1,
    textTransform: 'uppercase',
    paddingHorizontal: responsiveWidth(10),
  },
  joinStyle: {
    fontSize: responsiveFont(16),
    color: Colors.textPrimary,
    fontWeight: '400',
    borderRadius: 3,
    backgroundColor: '#38b000',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
  },
});
