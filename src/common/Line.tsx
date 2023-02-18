import {ActivityIndicator, View, Text, StyleSheet, Image} from 'react-native';
import Colors from '../Themes/Colors';

const Line = () => {
  return <View style={styles.content}></View>;
};

export default Line;

const styles = StyleSheet.create({
  content: {
    height: 2,
    width: '100%',
    backgroundColor: Colors.primary,
  },
});
