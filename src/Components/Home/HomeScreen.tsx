import {StatusBar, StyleSheet, View, Text} from 'react-native';
import GlobalStyles from '../../common/styles/GlobalStyles';
import Colors from '../../Themes/Colors';
import Header from '../../common/Header';
import ContentAccount from '../../common/ContentAccount';
import languages from '../../languages';
import data from './data';

interface data {
  data: data;
}

const Home: React.FC<data> = ({}) => {
  return (
    <View style={GlobalStyles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.primaryButton}
      />
      <Header
        title="Trang chủ"
        iconLeft={true}
        home={false}
        iconRight={true}></Header>

      <ContentAccount></ContentAccount>

      <View style={[styles.contentMenu, GlobalStyles.margin20]}>
        <View style={[styles.contentMain]}>
          <Text style={styles.titleMain}>{languages['vi'].special}</Text>
        </View>
        <Text style={styles.title}>{languages['vi'].testMajor}</Text>
      </View>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  formView: {
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },

  contentMenu: {
    height: 90,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: Colors.blueBoder,
    borderWidth: 1,
    elevation: 2.5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  contentMain: {
    position: 'absolute',

    top: -20,
    left: 2,
    padding: 3,
    borderWidth: 1,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    borderColor: Colors.blueBoder,
  },
  titleMain: {
    fontSize: 17,
    color: Colors.textPrimary,
    fontWeight: '400',
  },
  title: {
    fontSize: 18,
    color: Colors.rosyBrown,
    fontWeight: '500',
    textDecorationStyle: 'double',
  },
});
