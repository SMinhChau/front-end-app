import React from 'react';
import RouteNames from '../RouteNames';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AccountScreen from '../Account/AccountScreen';

const Stack = createNativeStackNavigator();

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={RouteNames.AccountStack} component={AccountScreen} />
    </Stack.Navigator>
  );
};

export default AccountStackNavigator;
