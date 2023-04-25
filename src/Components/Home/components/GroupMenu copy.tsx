import React, {useEffect, useState} from 'react';
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

const numberOfItemsPerPageList = [2, 3, 4];

const items = [
  {
    key: 1,
    name: 'Page 1',
  },
  {
    key: 2,
    name: 'Page 2',
  },
  {
    key: 3,
    name: 'Page 3',
  },
];

let i = 0;
const EvaluationMenu = () => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);
  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

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
        {/* 
        <View style={[styles.containner]}>
          <Text numberOfLines={1} style={[styles.titleMain]}>
            Kết quả tổng kết điểm
          </Text>
        </View> */}
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>ID</DataTable.Title>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Property</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row key={i++}>
            <DataTable.Cell>{i}</DataTable.Cell>
            <DataTable.Cell>Is A</DataTable.Cell>
            <DataTable.Cell>Test</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row key={i++}>
            <DataTable.Cell>{i}</DataTable.Cell>
            <DataTable.Cell>Is A</DataTable.Cell>
            <DataTable.Cell>Test</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row key={i++}>
            <DataTable.Cell>{i}</DataTable.Cell>
            <DataTable.Cell>Is A</DataTable.Cell>
            <DataTable.Cell>Test</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row key={i++}>
            <DataTable.Cell>{i}</DataTable.Cell>
            <DataTable.Cell>Is A</DataTable.Cell>
            <DataTable.Cell>Test</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row key={i++}>
            <DataTable.Cell>{i}</DataTable.Cell>
            <DataTable.Cell>Is A</DataTable.Cell>
            <DataTable.Cell>Test</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row key={i++}>
            <DataTable.Cell>{i}</DataTable.Cell>
            <DataTable.Cell>Is A</DataTable.Cell>
            <DataTable.Cell>Test</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row key={i++}>
            <DataTable.Cell>{i}</DataTable.Cell>
            <DataTable.Cell>Is A</DataTable.Cell>
            <DataTable.Cell>Test</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row key={i++}>
            <DataTable.Cell>{i}</DataTable.Cell>
            <DataTable.Cell>Is A</DataTable.Cell>
            <DataTable.Cell>Test</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row key={i++}>
            <DataTable.Cell>{i}</DataTable.Cell>
            <DataTable.Cell>Is A</DataTable.Cell>
            <DataTable.Cell>Test</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
            onPageChange={page => setPage(page)}
            label={`${from + 1}-${to} of ${items.length}`}
            showFastPaginationControls
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={numberOfItemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            selectPageDropdownLabel={'Rows per page'}
          />
        </DataTable>
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
