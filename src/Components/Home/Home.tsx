import {StatusBar, StyleSheet, View, TouchableOpacity} from 'react-native';
import GlobalStyles from '../../common/styles/GlobalStyles';
import Colors from '../../Themes/Colors';
import Header from '../../common/Header';
import MenuContent from './MenuContent';
import ContentAccount from '../../common/ContentAccount';

const Home: React.FC<{}> = () => {
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

      <View style={[styles.contentMenu, GlobalStyles.margin20]}></View>
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
    height: 300,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: Colors.blueBoder,
    borderWidth: 1,
    elevation: 2.5,
  },
});
