import React, {useCallback, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {List, Modal, Portal} from 'react-native-paper';
import Lottie from 'lottie-react-native';
import IconView from '../../../common/IconView';
import Colors from '../../../Themes/Colors';
import Topic from '../../../utilities/Contant/Topic';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';
import TextItemAccount from '../../Account/component/TextItemAccount';
import languages from '../../../languages';
import ListItemDes from './content/ListItemDes';
import CloseButton from '../../../common/CloseButton';
import ModalDes from './ModalDes';

interface Props {
  topicInfo?: Topic;
}

const ItemTopic = ({topicInfo}: Props) => {
  console.log('ItemTopic topicInfo', topicInfo);
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);
  const [ismodal, showModal] = useState(false);
  const [valueModal, setValueModal] = useState<string>();

  const TOPIC_DATA = [
    {name: topicInfo?.quantityGroupMax, key: 'Số lượng'},
    {name: topicInfo?.description, key: 'Mô tả'},
    {name: topicInfo?.note, key: 'Ghi chú'},
    {name: topicInfo?.target, key: 'Mục tiêu'},
    {name: topicInfo?.standradOutput, key: 'Mục đích'},
    {name: topicInfo?.requireInput, key: 'Yêu cầu đầu vào'},
    {name: topicInfo?.status, key: 'Tình trạng'},
  ];
  const LECTURER_DATA = [
    {name: topicInfo?.lecturer?.avatar, key: ''},
    {name: topicInfo?.lecturer?.name, key: 'Tên Giảng viên'},
    {name: topicInfo?.lecturer?.gender, key: 'Giới tính'},
    {name: topicInfo?.lecturer?.phoneNumber, key: 'Số điện thoại'},
    {name: topicInfo?.lecturer?.degree, key: 'Trình độ'},
    {name: topicInfo?.lecturer?.email, key: 'Email'},
  ];

  return (
    <>
      <View style={styles.mainTopic}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.contentName}>Tên: </Text>
          <Text style={styles.contentName}>{topicInfo?.name}</Text>
        </View>
        <List.Section style={styles.content}>
          <List.Accordion
            title={<Text>Thông tin</Text>}
            right={props => <></>}
            left={props => (
              <Lottie
                {...props}
                source={require('../../../assets/jsonAmination/more-icon.json')}
                autoPlay
                loop
                style={styles.iconMenu}
              />
            )}>
            <ScrollView style={{height: 200}}>
              {TOPIC_DATA.map((item, index) => (
                <List.Item
                  key={index}
                  style={styles.contentListItem}
                  title={<Text style={styles.titleMain}>{item?.key}</Text>}
                  description={
                    <>
                      <Text style={styles.subTitle}>{item?.name}</Text>
                    </>
                  }
                  right={props => (
                    <TouchableOpacity
                      onPress={() => {
                        showModal(true);
                        setValueModal(item?.name as string);
                      }}>
                      <IconView
                        {...props}
                        name="ios-ellipsis-vertical"
                        color={Colors.grayLight}
                        size={24}
                      />
                    </TouchableOpacity>
                  )}
                />
              ))}
            </ScrollView>
          </List.Accordion>

          <List.Accordion
            title={<Text>Giảng viên</Text>}
            left={props => (
              <Lottie
                {...props}
                source={require('../../../assets/jsonAmination/more-icon.json')}
                autoPlay
                loop
                style={styles.iconMenu}
              />
            )}
            right={props => <></>}
            expanded={expanded}
            onPress={handlePress}>
            <ScrollView style={{height: 300}}>
              {LECTURER_DATA.map((item, index) => (
                <List.Item
                  key={index}
                  style={styles.contentListItem}
                  title={<Text style={styles.titleMain}>{item?.key}</Text>}
                  description={
                    <>
                      <Text style={styles.subTitle}>{item?.name}</Text>
                    </>
                  }
                  right={props => (
                    <TouchableOpacity
                      onPress={() => {
                        showModal(true);
                        setValueModal(item?.name as string);
                      }}>
                      <IconView
                        {...props}
                        name="ios-ellipsis-vertical"
                        color={Colors.grayLight}
                        size={24}
                      />
                    </TouchableOpacity>
                  )}
                />
              ))}
            </ScrollView>
          </List.Accordion>
        </List.Section>
      </View>

      <ModalDes
        visible={ismodal}
        title={valueModal}
        modalClose={showModal}></ModalDes>
    </>
  );
};
export default ItemTopic;

const styles = StyleSheet.create({
  mainTopic: {
    backgroundColor: Colors.white,
    borderLeftColor: '#f08080',
    borderRightColor: '#f08080',
    borderBottomColor: '#f08080',
    borderTopColor: Colors.white,
    borderWidth: 1,

    width: responsiveWidth(360),
    marginHorizontal: responsiveWidth(6),
    paddingHorizontal: responsiveWidth(16),
  },
  content: {
    width: '100%',
  },
  iconMenu: {
    width: 50,
  },
  contentName: {
    fontSize: responsiveFont(18),
    fontWeight: '500',
    paddingVertical: responsiveHeight(5),
    color: Colors.rosyBrown,
  },
  subTitle: {
    fontSize: responsiveFont(14),
    color: Colors.headerColor,
  },
  titleMain: {
    fontSize: responsiveFont(18),
    color: Colors.textPrimary,
  },
  contentListItem: {},
});
