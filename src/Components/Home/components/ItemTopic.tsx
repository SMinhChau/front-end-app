import React, {useMemo, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {List} from 'react-native-paper';
import Lottie from 'lottie-react-native';
import IconView from '../../../common/IconView';
import Colors from '../../../Themes/Colors';
import Topic from '../../../utilities/Contant/Topic';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';
import ModalDes from './ModalDes';
import ButtonHandle from '../../../common/ButtonHandle';
import GlobalStyles from '../../../common/styles/GlobalStyles';
import {useAppSelector} from '../../../redux/hooks';


interface Props {
  topicInfo?: Topic;
  handleChosseTopic(): void;
}

const ItemTopic = ({topicInfo, handleChosseTopic}: Props) => {
  const groupState = useAppSelector(state => state.group.group);
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

  const renderButton = useMemo(() => {
  
    return (
      <>
        {groupState?.id ? (
          <>
            {groupState?.topic?.id ? null : (
              <View style={GlobalStyles.centerView}>
                <ButtonHandle
                  style={styles.btn}
                  iconName="md-arrow-redo-outline"
                  title="Chọn đề tài"
                  onPress={handleChosseTopic}
                />
              </View>
            )}
          </>
        ) : null}
      </>
    );
  }, [groupState?.topic?.id, groupState?.id]);

  return (
    <>
      <View style={styles.mainTopic}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.contentName}>Tên đề tài: </Text>
          <Text style={styles.contentName}>{topicInfo?.name}</Text>
        </View>
        {renderButton}
        <List.Section style={styles.content}>
          <List.Accordion
            title={<Text>Thông tin</Text>}
            right={props => null}
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
              {TOPIC_DATA.map((item, index) => {
                return (
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
                );
              })}
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
            right={props => null}
            expanded={expanded}
            onPress={handlePress}>
            <ScrollView style={{height: 300}}>
              {LECTURER_DATA.map((item, index) => {
                if (item?.key === '') {
                  return (
                    <>
                      <List.Item
                        key={index}
                        style={styles.contentListItem}
                        title={''}
                        description={<></>}
                        right={props => (
                          <>
                            <Image
                              source={{uri: item.name}}
                              style={styles.imgaAvatar}
                            />
                          </>
                        )}
                      />
                    </>
                  );
                }

                return (
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
                );
              })}
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
    backgroundColor: '#fff0f3',
    borderColor: '#f08080',
    borderWidth: 1,
    width: responsiveWidth(360),
    marginHorizontal: responsiveWidth(6),
    paddingHorizontal: responsiveWidth(16),
  },
  content: {
    width: '100%',
    backgroundColor: Colors.white,
  },
  iconMenu: {
    width: 50,
  },
  contentName: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '500',
    paddingTop: responsiveHeight(10),
    textTransform: 'uppercase',
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
  imgaAvatar: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    // borderRadius: 50,
    // borderColor: Colors.blueBoder,
    // borderWidth: 1,
    // shadowOpacity: 0.02,
    position: 'absolute',
    top: -10,
  },
  btn: {
    width: '40%',
  },
});
