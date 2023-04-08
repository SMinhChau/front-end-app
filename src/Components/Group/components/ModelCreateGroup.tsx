import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, TextInput, Alert} from 'react-native';
import {Modal, Portal, Text} from 'react-native-paper';
import CloseButton from '../../../common/CloseButton';
import Colors from '../../../Themes/Colors';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';
import {useAppDispatch} from '../../../redux/hooks';
import languages from '../../../languages';
import ButtonHandle from '../../../common/ButtonHandle';
import groupAPI from '../../../redux/apis/group';

import {result} from 'lodash';
import Term from '../../../utilities/Contant/Term';
import {isEmpty} from '../../../utilities/utils';
import LoadingScreen from '../../../common/LoadingScreen';

interface Props {
  title?: string;
  onPressClose?: () => void;
  modalClose: React.Dispatch<React.SetStateAction<boolean>>;
  termCreateGroup?: any;
  visible?: any;
}

const ModelCreateGroup: React.FC<Props> = ({
  title,
  onPressClose,
  termCreateGroup,
  visible,
  modalClose,
}) => {
  const [nameGroupInput, setNameGroupInput] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState<Term>();

  useEffect(() => {
    setTerm(termCreateGroup);
  }, [term]);

  const onChangeText = (text: string) => {
    setNameGroupInput(text);
  };

  const handleCreatgroup = () => {
    if (!isEmpty(term?.id)) {
      setLoading(true);
      dispatch(
        groupAPI.createGroup()({
          termId: term?.id as number,
          name: nameGroupInput,
        }),
      )
        .then(result => {
          setLoading(false);
          Alert.alert('Thông báo', 'Tạo nhóm thành công');
          modalClose(false);
        })
        .catch(error => {
          setLoading(false);
          Alert.alert('Thông báo', 'Tạo nhóm không thành công');
        });
      setNameGroupInput('');
    }
  };

  return (
    <>
      <Portal>
        <Modal visible={visible} style={styles.container}>
          <View style={{backgroundColor: Colors.white}}>
            <Text style={styles.title}>{title}</Text>
            <CloseButton
              style={styles.logo}
              onPress={() => modalClose(false)}
            />
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
                  <Text style={styles.titleTerm}>{languages['vi'].term}</Text>
                  <Text style={styles.subTitle}>{term?.name}</Text>
                </View>
              </View>

              <View style={styles.contentBtn}>
                <ButtonHandle
                  onPress={() => {
                    handleCreatgroup();
                  }}
                  icon
                  iconName={'create-sharp'}
                  title="Tạo nhóm"
                />
              </View>
            </View>
          </ScrollView>
        </Modal>
      </Portal>
      {loading && <LoadingScreen />}
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
    backgroundColor: '#caf0f8',
    borderRadius: 10,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: responsiveHeight(20),
    paddingHorizontal: responsiveWidth(10),
    marginVertical: responsiveHeight(20),
  },
  titleGroup: {
    color: Colors.textPrimary,
    fontSize: responsiveFont(16),
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(10),
  },
  titleTerm: {
    width: '30%',
    color: Colors.textPrimary,
    fontSize: responsiveFont(15),
    fontWeight: '400',
  },
  subTitle: {
    color: Colors.textPrimary,

    fontWeight: '400',
    fontSize: responsiveFont(15),
  },
  contentBtn: {
    paddingHorizontal: responsiveWidth(16),
    backgroundColor: Colors.white,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: responsiveHeight(20),
  },
});
