import {StyleSheet, TextInput, View} from 'react-native';
import Colors from '../Themes/Colors';
import {responsiveHeight, responsiveWidth} from '../utilities/sizeScreen';
interface Props {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
}

const InputView: React.FC<Props> = props => {
  return (
    <View style={styles.content}>
      <TextInput
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
        style={styles.input}
      />
    </View>
  );
};

export default InputView;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
  },
  input: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingHorizontal: 15,
    marginTop: 25,
    fontSize: 18,
  },
});
