import React, {useEffect, useMemo, useState} from 'react';
import {StatusBar, StyleSheet, View, useWindowDimensions} from 'react-native';
import Header from '../../../common/Header';
import GlobalStyles from '../../../common/styles/GlobalStyles';
import Colors from '../../../Themes/Colors';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';
import {SceneMap, TabView} from 'react-native-tab-view';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import authAPI from '../../../redux/apis/auth';
import {DataTable, Text} from 'react-native-paper';
import NoneData from '../../Section/NoneData';
import {isEmpty} from 'lodash';

const EvaluationMenu = () => {
  const layout = useWindowDimensions();
  const dispatch = useAppDispatch();

  const userState = useAppSelector(state => state.user);
  const termState = useAppSelector(state => state.term.term);
  const transcript = useAppSelector(state => state.user.transcript);
  useEffect(() => {
    console.log('transcript', transcript);

    dispatch(authAPI.getTranscripts()(termState.id));
  }, []);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'ADVISOR', title: 'Điểm hướng dẫn'},
    {key: 'REVIEW', title: 'Điểm phản biện'},
    {key: 'HOST', title: 'Điểm hội đồng'},
  ]);

  const TABADVISOR = () => {
    return <>{advisorRender}</>;
  };
  const TABREVIEW = () => {
    return <>{reviewRender}</>;
  };
  const TABHOST = () => {
    return <>{hostRender}</>;
  };

  const renderScene = SceneMap({
    ADVISOR: TABADVISOR,
    REVIEW: TABREVIEW,
    HOST: TABHOST,
  });

  const advisorRender = useMemo(() => {
    const _data = transcript.ADVISOR;
    return (
      <>
        <>
          {_data.avgGrader !== null ? (
            <>
              <View style={[styles.bottomContent]}>
                <Text style={styles.title} variant="titleLarge">
                  Kết Quả GĐ Hướng Dẫn
                </Text>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title textStyle={styles._titleCol}>
                      Điểm Trung Bình
                    </DataTable.Title>
                    <DataTable.Title textStyle={styles._titleCol} numeric>
                      {_data.avgGrader}
                    </DataTable.Title>
                  </DataTable.Header>
                </DataTable>
              </View>
            </>
          ) : (
            <NoneData icon title="Chưa có điểm Trung bình"></NoneData>
          )}
        </>
      </>
    );
  }, [transcript]);

  const reviewRender = useMemo(() => {
    const _data = transcript.REVIEWER;
    return (
      <>
        <>
          {_data.avgGrader !== null ? (
            <>
              <View style={[styles.bottomContent]}>
                <Text style={styles.title} variant="titleLarge">
                  Kết Quả GĐ Phản biện
                </Text>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title textStyle={styles._titleCol}>
                      Điểm Trung Bình
                    </DataTable.Title>
                    <DataTable.Title textStyle={styles._titleCol} numeric>
                      {_data.avgGrader}
                    </DataTable.Title>
                  </DataTable.Header>
                </DataTable>
              </View>
            </>
          ) : (
            <NoneData icon title="Chưa có điểm Trung bình"></NoneData>
          )}
        </>
      </>
    );
  }, [transcript]);
  const hostRender = useMemo(() => {
    const _data = transcript.SESSION_HOST;
    return (
      <>
        <>
          {_data.avgGrader !== null ? (
            <>
              <View style={[styles.bottomContent]}>
                <Text style={styles.title} variant="titleLarge">
                  Kết Quả GĐ Hội đồng
                </Text>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title textStyle={styles._titleCol}>
                      Điểm Trung Bình
                    </DataTable.Title>
                    <DataTable.Title textStyle={styles._titleCol} numeric>
                      {_data.avgGrader}
                    </DataTable.Title>
                  </DataTable.Header>
                </DataTable>
              </View>
            </>
          ) : (
            <NoneData icon title="Chưa có điểm Trung bình"></NoneData>
          )}
        </>
      </>
    );
  }, [transcript]);

  return (
    <>
      <View style={GlobalStyles.container}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={Colors.primaryButton}
        />
        <Header
          title="Đánh giá"
          iconLeft={true}
          home={false}
          style={styles.header}
          back={true}></Header>

        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </View>
    </>
  );
};

export default EvaluationMenu;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    paddingHorizontal: responsiveWidth(10),
  },
  titleMain: {
    textAlign: 'center',
    paddingHorizontal: responsiveHeight(10),
    paddingVertical: responsiveHeight(20),

    fontSize: responsiveFont(16),
    color: '#d90429',
    fontWeight: '600',
  },
  headerTable: {
    flexDirection: 'column',
  },
  table: {
    borderColor: Colors.blueBoder,
    borderWidth: 1,
  },
  bottomContent: {
    height: '90%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderColor: '#caf0f8',
    marginTop: responsiveHeight(20),
    shadowOffset: {width: 2, height: 3},
  },
  title: {
    textAlign: 'center',
    paddingVertical: responsiveHeight(10),
    color: '#e29578',
    fontWeight: '500',
    fontSize: responsiveFont(16),
    textTransform: 'uppercase',
  },
  _titleCol: {
    fontSize: responsiveFont(16),
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
