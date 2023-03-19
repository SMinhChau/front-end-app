import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, TextInput} from 'react-native';
import {Modal, Text} from 'react-native-paper';
import CloseButton from '../../../common/CloseButton';
import Colors from '../../../Themes/Colors';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import languages from '../../../languages';
import ButtonHandle from '../../../common/ButtonHandle';
import groupAPI from '../../../redux/apis/group';

interface Props {
  title?: string;
  onPressClose: () => void;
  modalClose: () => void;
}

const ModelCreateGroup: React.FC<Props> = ({
  title,
  onPressClose,
  modalClose,
}) => {
  const termState = useAppSelector(state => state.term);

  const [nameGroupInput, setNameGroupInput] = useState('');
  const dispatch = useAppDispatch();

  const onChangeText = (text: string) => {
    setNameGroupInput(text);
  };
  console.log('termState', termState);

  const handleCreatgroup = async () => {
    console.log('termState?.term?.id', termState?.term?.id);
    console.log('nameGroupInput', nameGroupInput);

    await dispatch(
      groupAPI.createGroup()({
        termId: termState?.term?.id,
        name: nameGroupInput,
      }),
    );
  };

  return (
    <>
      <Modal visible style={styles.container}>
        <View style={{backgroundColor: Colors.white}}>
          <Text style={styles.title}>{title}</Text>
          <CloseButton style={styles.logo} onPress={onPressClose} />
        </View>
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.form}>
              <Text style={styles.titleGroup}>Tên nhóm:</Text>
              <TextInput
                style={[styles.lable]}
                placeholder={'Tên nhóm'}
                onChangeText={text => onChangeText(text)}
                value={nameGroupInput}
              />
              <View style={[styles.viewTitle]}>
                <View style={[styles.viewTitleLeft]}>
                  <Text style={styles.titleTerm}>{languages['vi'].term}</Text>
                </View>
                <View style={[styles.viewTitleRight]}>
                  <Text style={styles.subTitle}>{termState?.term?.name}</Text>
                </View>
              </View>
            </View>
            <View style={styles.contentBtn}>
              <ButtonHandle
                onPress={() => {
                  handleCreatgroup();
                }}
                icon
                iconName={'create-sharp'}
                // onPress={handleSubmit}
                title="Tạo nhóm"
                // onPress={handleSubmit}

                style={styles.buttonJoin}
              />
            </View>
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

export default ModelCreateGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: responsiveWidth(10),
  },
  title: {
    fontSize: responsiveFont(20),
    color: Colors.textPrimary,
    textAlign: 'center',
    backgroundColor: Colors.white,
    margin: responsiveHeight(20),
  },
  logo: {
    top: responsiveWidth(17),
  },
  content: {
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  contentTitle: {
    width: '100%',
    // height: '100%',
    // borderColor: '#caf0f8',
    // borderWidth: 1,
    // shadowOpacity: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    padding: 10,
  },
  lable: {
    color: Colors.textPrimary,
    fontSize: responsiveFont(16),
    fontWeight: '400',
    paddingHorizontal: responsiveWidth(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 2,
  },
  form: {
    flexDirection: 'column',
    paddingHorizontal: responsiveWidth(16),
    paddingVertical: responsiveHeight(16),
  },
  viewTitle: {
    // backgroundColor: '#caf0f8',
    // borderRadius: 10,
    flexDirection: 'row',
    flex: 1,
    // paddingVertical: responsiveHeight(20),
    // marginVertical: responsiveHeight(20),
  },
  titleGroup: {
    color: Colors.textPrimary,
    fontSize: responsiveFont(16),
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(10),
  },
  titleTerm: {
    paddingHorizontal: responsiveWidth(10),
    marginRight: responsiveWidth(20),
    color: Colors.textPrimary,

    fontWeight: '400',
  },
  subTitle: {
    color: Colors.textPrimary,
    fontSize: responsiveFont(14),
    fontWeight: '400',
  },
  contentBtn: {
    paddingHorizontal: responsiveWidth(16),
    backgroundColor: Colors.white,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: responsiveHeight(20),
  },
  viewTitleLeft: {
    backgroundColor: '#90e0ef',
    fontSize: responsiveFont(14),
    paddingVertical: responsiveHeight(20),
    marginVertical: responsiveHeight(30),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  viewTitleRight: {
    width: '75%',
    backgroundColor: '#caf0f8',
    fontSize: responsiveFont(14),
    paddingVertical: responsiveHeight(20),
    marginVertical: responsiveHeight(30),
    borderTopRightRadius: 10,
    paddingLeft: responsiveWidth(10),
    borderBottomRightRadius: 10,
  },
});
