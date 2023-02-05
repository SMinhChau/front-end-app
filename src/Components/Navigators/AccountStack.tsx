import React from 'react';
import RouteNames from '../RouteNames';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Account from '../Account/Account';

const Stack = createNativeStackNavigator();

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={RouteNames.accountStack} component={Account} />
    </Stack.Navigator>
  );
};

export default AccountStackNavigator;
