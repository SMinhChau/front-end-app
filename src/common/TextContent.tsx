import React, {forwardRef} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  icon?: any;
  error: String;
  touched: any;
}

const TextContent = forwardRef(
  ({icon, error, touched, ...otherProps}: Props, ref) => {
    const validationColor = !touched
      ? '#0573ff'
      : error
      ? '#FF5A5F'
      : '#0573ff';
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 48,
          borderRadius: 8,
          borderColor: validationColor,
          borderWidth: StyleSheet.hairlineWidth,
          padding: 8,
        }}>
        <View style={{padding: 8}}>
          <Ionicons name={icon} color={validationColor} size={16} />
        </View>
        <View style={{flex: 1}}>
          <TextInput
            underlineColorAndroid="transparent"
            placeholderTextColor="rgba(34, 62, 75, 0.7)"
            ref={ref}
            {...otherProps}
          />
        </View>
      </View>
    );
  },
);

export default TextContent;
