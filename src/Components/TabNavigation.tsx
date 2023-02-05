/* eslint-disable react/no-unstable-nested-components */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import AccountStackNavigator from './Navigators/AccountStack';
import GroupStackNavigator from './Navigators/GroupStack';
import HomeStackNavigator from './Navigators/HomeStack';
import NotificationStackNavigator from './Navigators/NotificationStack';

import RouteNames from './RouteNames';
import MyTabBar from './Section/MyTabBar';

const Tab = createBottomTabNavigator();

const tabScreens = [
  {
    name: RouteNames.homeTab,
    component: HomeStackNavigator,
  },
  {
    name: RouteNames.groupTab,
    component: GroupStackNavigator,
  },
  {
    name: RouteNames.notificationTab,
    component: NotificationStackNavigator,
  },
  {
    name: RouteNames.accountTab,
    component: AccountStackNavigator,
  },
];

const TabNavigation = () => {
  return (
    <Tab.Navigator
      // defaultScreenOptions={{tabBarStyle: {display: 'none'}}}
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{headerShown: false}}>
      {tabScreens.map(tab => (
        <Tab.Screen key={tab.name} {...tab} />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigation;
