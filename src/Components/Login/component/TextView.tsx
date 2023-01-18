import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native/types';

interface Props {
  onChange: () => void;
  value: string;
}

const TextView: React.FC<Props> = ({values, onChange}) => {
  return (
    <View>
      <TextInput
        onChange={onChange}
        placeholder="Email Address"
        style={textInput}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        value={values.email}
        keyboardType="email-address"
      />
    </View>
  );
};
export default TextView;

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: Colors.primary,
    paddingVertical: responsiveHeight(20),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
