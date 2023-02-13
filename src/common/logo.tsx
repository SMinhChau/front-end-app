import React from 'react';
import {View} from 'react-native';

import FastImage, {ResizeMode} from 'react-native-fast-image';

import {StyleSheet} from 'react-native';
import {Images} from '../assets/images/Images';
import Colors from '../Themes/Colors';

type Props = {
  height?: number | string;
  width?: number | string;
  tintColor?: string;
};

const Logo = ({height, width, tintColor}: Props) => {
  return (
    <View style={[styles.content]}>
      <FastImage
        source={Images.logo}
        style={[{width: 200, height: 200} || {height, width}]}
        resizeMode={'contain'}
        tintColor={tintColor}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  content: {
    height: 200,
    width: 200,
  },
});
