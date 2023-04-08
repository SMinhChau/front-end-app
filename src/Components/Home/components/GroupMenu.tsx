import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Header from '../../../common/Header';
import GlobalStyles from '../../../common/styles/GlobalStyles';
import Colors from '../../../Themes/Colors';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';
import {DataTable} from 'react-native-paper';

const EvaluationMenu = () => {
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
          back={true}
          iconRight={true}></Header>

        <View style={[styles.containner]}>
          <Text numberOfLines={1} style={[styles.titleMain]}>
            Kết quả tổng kết điểm
          </Text>

          <DataTable style={styles.table}>
            {/* <DataTable.Header>
              <DataTable.Title sortDirection="descending">
               
              </DataTable.Title>
            </DataTable.Header> */}

            <DataTable.Row>
              <DataTable.Title numeric>Điểm </DataTable.Title>
              <DataTable.Cell numeric>GVHD</DataTable.Cell>
              <DataTable.Cell numeric>GVPB1</DataTable.Cell>
              <DataTable.Cell numeric>GVPB2</DataTable.Cell>
              <DataTable.Cell numeric>HĐ</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
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
});
