import {StatusBar, StyleSheet, View, TouchableOpacity} from 'react-native';
import GlobalStyles from '../../common/styles/GlobalStyles';
import Colors from '../../Themes/Colors';
import Header from '../../common/Header';
import MenuContent from './MenuContent';

const Home: React.FC<{}> = () => {
  return (
    <View style={GlobalStyles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.primary} />
      <Header
        title="Trang chủ"
        iconLeft={true}
        home={true}
        iconRight={true}></Header>

      <TouchableOpacity
        style={[
          styles.contentInfor,
          GlobalStyles.borderRadius10,
          GlobalStyles.centerView,
          GlobalStyles.margin20,
        ]}></TouchableOpacity>

      <MenuContent></MenuContent>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  formView: {
    paddingTop: 150,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  contentInfor: {
    height: 250,
    backgroundColor: Colors.primary,
  },
});
