import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export function deviceWidth() {
  return width;
}

export function deviceHeight() {
  return height;
}
