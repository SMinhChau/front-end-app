import {StatusBar, View} from 'react-native';
import GlobalStyles from '../../common/styles/GlobalStyles';
import Colors from '../../Themes/Colors';
import Header from '../../common/Header';

const Home: React.FC<{}> = () => {
  return (
    <View style={GlobalStyles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.primary} />
      <Header title="Trang chủ" icon={true}></Header>
    </View>
  );
};
export default Home;
