import React from 'react';
import {View} from 'react-native';

import FastImage, {ResizeMode} from 'react-native-fast-image';

import {StyleSheet} from 'react-native';
import {Images} from '../assets/images/Images';

type Props = {
  height?: number | string;
  width?: number | string;
};

const Logo = ({height, width}: Props) => {
  return (
    <View style={[styles.content]}>
      <FastImage
        source={Images.logo}
        style={[{width: 200, height: 200} || {height, width}]}
        resizeMode={'contain'}
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
