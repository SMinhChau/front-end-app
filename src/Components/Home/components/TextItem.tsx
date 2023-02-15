import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {string} from 'yup';
import languages from '../../../languages';
import Colors from '../../../Themes/Colors';

interface Props {
  textLeft?: string;
  textRight?: string;
  color?: string;
}
const TextItem: React.FC<Props> = ({textLeft, textRight}) => {
  return (
    <>
      <View style={styles.content}>
        <View style={styles.left}>
          <Text style={styles.subTitle}>{textLeft} :</Text>
        </View>
        <View style={styles.right}>
          <Text numberOfLines={1} style={styles.subTitle}>
            {textRight}
          </Text>
        </View>
      </View>
    </>
  );
};
export default TextItem;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'space-between',
  },
  subTitle: {
    paddingVertical: 9,
    fontSize: 15,
  },
  left: {
    width: '25%',
  },
  right: {
    width: '75%',
  },
});
