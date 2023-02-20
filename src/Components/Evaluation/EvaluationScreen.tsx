import {useEffect} from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';
import Header from '../../common/Header';
import Logo from '../../common/logo';
import GlobalStyles from '../../common/styles/GlobalStyles';
import Colors from '../../Themes/Colors';

const Evaluation: React.FC<{}> = () => {
  return (
    <>
      <Header
        title="Đánh giá"
        // iconLeft={true}
        // home={true}
        iconRight={true}></Header>

      <View style={[GlobalStyles.container]}>
        <View style={styles.top}></View>
        <View style={styles.bottom}></View>
      </View>
    </>
  );
};
export default Evaluation;

const styles = StyleSheet.create({
  top: {},
  bottom: {
    backgroundColor: Colors.grayLight,
  },
});
