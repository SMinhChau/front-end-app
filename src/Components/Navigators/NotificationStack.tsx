import React from 'react';
import RouteNames from '../RouteNames';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Home/Home';
import Notification from '../Notification/Notification';

const Stack = createNativeStackNavigator();

const NotificationStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={RouteNames.notificationStack}
        component={Notification}
      />
    </Stack.Navigator>
  );
};

export default NotificationStackNavigator;
