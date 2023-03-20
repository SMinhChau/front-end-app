/* eslint-disable react/no-unstable-nested-components */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import AccountStackNavigator from './Navigators/AccountStack';
import GroupStackNavigator from './Navigators/GroupStack';

import HomeStackNavigator from './Navigators/HomeStack';
import TermsStackNavigator from './Navigators/TermsStack';

import RouteNames from './RouteNames';
import MyTabBar from './Section/MyTabBar';

const Tab = createBottomTabNavigator();

const tabScreens = [
  {
    name: RouteNames.homeTab,
    component: HomeStackNavigator,
  },
  {
    name: RouteNames.GroupTab,
    component: GroupStackNavigator,
  },
  {
    name: RouteNames.TermsTab,
    component: TermsStackNavigator,
  },
  {
    name: RouteNames.accountTab,
    component: AccountStackNavigator,
  },
];

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={RouteNames.homeTab}
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{headerShown: false}}>
      {tabScreens.map((tab, index) => (
        <Tab.Screen key={index} {...tab} />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigation;
