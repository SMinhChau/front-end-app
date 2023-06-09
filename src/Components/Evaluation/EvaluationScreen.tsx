import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import GlobalStyles from '../../common/styles/GlobalStyles';
import Colors from '../../Themes/Colors';
import Header from '../../common/Header';
import data from './data';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {DataTable, Text} from 'react-native-paper';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../utilities/sizeScreen';
import {useEffect, useMemo, useState} from 'react';

import {checkGenger, getStatusFinal} from '../../utilities/contants';
import NoneData from '../Section/NoneData';
import {isEmpty} from '../../utilities/utils';
import Transcript from '../../utilities/Contant/Transcript';
import authService from '../../services/auth';

interface data {
  data: data;
}
const EvaluationScreen: React.FC<data> = ({}) => {
  const userState = useAppSelector(state => state.user);
  const groupState = useAppSelector(state => state.group.group);

  const termState = useAppSelector(state => state.term.term);
  const [transcript, setTranscript] = useState<Transcript>();

  useEffect(() => {
    authService.getTranscripts(termState?.id).then(result => {
      setTranscript(result.data);
    });
  }, [transcript]);

  const _data = [
    {
      key: 1,
      label: 'Hướng dẫn',
      grade: transcript?.ADVISOR.avgGrader,
    },
    {
      key: 2,
      label: 'Phản Biện',
      grade: transcript?.REVIEWER.avgGrader,
    },
    {
      key: 3,
      label: 'Hội Đồng',
      grade: transcript?.SESSION_HOST.avgGrader,
    },
    {
      key: 4,
      label: 'Điểm Cộng',
      grade: transcript?.SESSION_HOST.avgGrader,
    },
    {
      key: 5,
      label: 'Điểm Trung Bình',
      grade: transcript?.gradeSummary,
    },
  ];

  const infoUser = useMemo(() => {
    const _data = userState.user;
    const _DATA = [
      {name: _data.name, key: 'Tên Sinh viên:'},
      {name: checkGenger(_data.gender), key: 'Giới tính:'},
      {name: _data.phoneNumber, key: 'Số điện thoại:'},
      {name: _data.email, key: 'Email:'},
    ];
    return (
      <>
        <View style={styles.contentListItem}>
          {_DATA.map((i, index) => {
            return (
              <View key={index} style={styles.content}>
                <Text numberOfLines={1} style={[styles.titleMain]}>
                  {i?.key}
                </Text>
                <Text numberOfLines={1} style={[styles.titleGroup]}>
                  {i?.name}
                </Text>
              </View>
            );
          })}
        </View>
      </>
    );
  }, [transcript]);

  const renderForAchievement = useMemo(() => {
    const _data = transcript?.achievements;
    const _dataId = transcript?.achievements;
    return (
      <>
        {_dataId ? (
          <DataTable style={styles.cotent_Achiev}>
            <DataTable.Header>
              <DataTable.Title textStyle={styles._titleCol_Ar}>
                Điểm cộng
              </DataTable.Title>
              <DataTable.Title textStyle={styles._titleCol_Ar} numeric>
                Điểm
              </DataTable.Title>
            </DataTable.Header>
            {_data?.map((item, key) => {
              return (
                <DataTable.Row key={key}>
                  <DataTable.Cell textStyle={styles._total_Ar} numeric>
                    {item.name}
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={styles._total_Ar} numeric>
                    {!isEmpty(item.bonusGrade) ? (
                      <>{item.bonusGrade}</>
                    ) : (
                      <Text style={styles.title_Point}>Chưa có điểm</Text>
                    )}
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
        ) : (
          <>
            <Text style={styles._titleCol_NON}>Không có điểm cộng</Text>
          </>
        )}
      </>
    );
  }, [transcript]);

  return (
    <View style={GlobalStyles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <Header
        title="Tổng kết"
        iconLeft={true}
        home={false}
        iconRight={true}></Header>

      {termState.isPublicResult === 1 ? (
        <View style={styles.containner}>
          <Text style={styles.title} variant="titleLarge">
            Kết Quả Cuối Kỳ
          </Text>
          {infoUser}

          <Text style={styles.title_Table}>Tổng hợp điểm</Text>

          <ScrollView>
            <View>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title textStyle={styles._titleCol}>
                    Điểm thuộc gđ
                  </DataTable.Title>
                  <DataTable.Title textStyle={styles._titleCol} numeric>
                    Điểm TB
                  </DataTable.Title>
                </DataTable.Header>

                {_data.map(item => {
                  if (item.key === 4) {
                    return <>{renderForAchievement}</>;
                  }

                  if (item.key === 5) {
                    return (
                      <DataTable.Row>
                        <DataTable.Cell textStyle={styles._total} numeric>
                          {item.label}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={styles._total} numeric>
                          {!isEmpty(item.grade) ? (
                            <>{item.grade}</>
                          ) : (
                            <Text style={styles.title_Point}>Chưa có điểm</Text>
                          )}
                        </DataTable.Cell>
                      </DataTable.Row>
                    );
                  }
                  return (
                    <DataTable.Row>
                      <DataTable.Cell textStyle={styles._grade} numeric>
                        {item.label}
                      </DataTable.Cell>
                      <DataTable.Cell textStyle={styles._grade} numeric>
                        {!isEmpty(item.grade) ? (
                          <>{item.grade}</>
                        ) : (
                          <Text style={styles.title_Point}>Chưa có điểm</Text>
                        )}
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                })}
              </DataTable>
            </View>
            <View style={styles.contentStstus}>
              <Text style={styles.titleFinal}>
                {getStatusFinal(String(groupState?.status))
                  ? getStatusFinal(String(groupState?.status))
                  : null}
              </Text>
            </View>
          </ScrollView>
        </View>
      ) : (
        <NoneData icon title="Chưa được xem đi"></NoneData>
      )}
    </View>
  );
};
export default EvaluationScreen;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(10),
  },
  cotent_Achiev: {
    marginVertical: responsiveHeight(15),
    borderColor: '#588157',
  },
  contentStstus: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  titleFinal: {
    color: '#e79291',
    fontWeight: '400',
    textTransform: 'uppercase',
  },
  title: {
    textAlign: 'center',
    paddingVertical: responsiveHeight(10),
    color: '#e79291',
    fontWeight: '400',
    textTransform: 'uppercase',
    borderColor: '#588157',
    borderBottomWidth: 1,
    borderRadius: 5,
    marginBottom: responsiveHeight(20),
    backgroundColor: 'red',
  },
  title_Table: {
    textAlign: 'center',
    fontSize: responsiveFont(16),
    paddingVertical: responsiveHeight(10),
    color: '#f28482',
    fontWeight: '500',
    textTransform: 'uppercase',
    marginTop: 10,
  },
  title_Point: {
    textAlign: 'center',
    fontSize: responsiveFont(16),
    paddingVertical: responsiveHeight(10),
    color: '#f28482',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: 10,
  },
  _titleCol: {
    fontSize: responsiveFont(16),
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  _titleCol_Ar: {
    color: '#386641',
    fontSize: responsiveFont(16),
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  _titleCol_NON: {
    textAlign: 'center',
    color: '#bcb8b1',
    paddingVertical: responsiveHeight(10),
    fontSize: responsiveFont(14),
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  _total: {
    color: '#f28482',
    fontSize: responsiveFont(16),
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  _total_Ar: {
    color: '#6a994e',
    fontSize: responsiveFont(16),
    fontWeight: '600',
  },
  _grade: {
    color: '#6b705c',
    fontSize: responsiveFont(16),
    fontWeight: '600',
  },
  contentListItem: {
    marginVertical: responsiveHeight(15),
  },

  content: {
    paddingVertical: responsiveHeight(5),
    flexDirection: 'row',
    marginHorizontal: responsiveWidth(15),
  },
  titleMain: {
    fontSize: responsiveFont(14),
    color: '#b7b7a4',
    textTransform: 'uppercase',
  },
  titleGroup: {
    fontSize: responsiveFont(14),
    color: Colors.textPrimary,
    textTransform: 'uppercase',
    paddingHorizontal: responsiveWidth(14),
  },
});
