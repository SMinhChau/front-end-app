import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import Timeline from 'react-native-timeline-flatlist';
import {Notification} from '../types/Types';
import IconView from './IconView';
import {SCREEN_WIDTH} from '../Themes/Constants';

interface Props {
  navigation: any;
  isRTL: boolean;
  strings: any;
  alerts: Notification[];
}

const AlertsHistory = ({
  navigation,
  strings: {
    alertsHistory: {title, noAlerts},
  },
  alerts,
}: Props) => {
  const renderEmptyState = () => (
    <View style={styles.headerSubContainer}>
      <IconView name="ios-close-circle-outline" size={30} />
      <Text style={{fontSize: 20}}>{noAlerts}</Text>
    </View>
  );

  const renderDetail = (rowData: any) => {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>;
    var desc = null;
    if (rowData.description)
      desc = (
        <View style={styles.descriptionContainer}>
          <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
      );

    return (
      <View style={{flex: 1, alignContent: 'flex-start', paddingBottom: 10}}>
        {title}
        {desc}
      </View>
    );
  };

  const renderList = () => (
    <Timeline
      style={styles.list}
      data={alerts}
      circleSize={20}
      separator={true}
      circleColor="rgb(45,156,219)"
      lineColor="rgb(45,156,219)"
      timeContainerStyle={{minWidth: 52}}
      separatorStyle={{backgroundColor: '#b5b6b759'}}
      descriptionStyle={{color: 'gray'}}
      //   options={{
      //     style: {paddingTop: 5},
      //   }}
      showTime={false}
      innerCircle={'icon'}
      renderDetail={renderDetail}
    />
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigation.goBack}>
        <View style={{marginLeft: 20}}>
          <IconView name="close" size={31} />
        </View>
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <IconView name="ios-navigate-outline" size={30} />
          <Text>{title}</Text>
        </View>
        <View style={styles.separator} />
      </View>
      {alerts.length === 0 ? renderEmptyState() : renderList()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  headerContainer: {
    width: SCREEN_WIDTH,
    height: 300,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerSubContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: SCREEN_WIDTH * 0.875,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#eaeaea',
  },
  list: {
    flex: 1,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 20,
  },
  title: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 50,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray',
  },
});

const mapStateToProps = (state: any) => {
  const {
    locale: {isRTL, strings},
    exposures: {alerts},
  } = state;

  return {isRTL, strings, alerts};
};

export default connect(mapStateToProps, null)(AlertsHistory);
