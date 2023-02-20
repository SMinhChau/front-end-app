import React from 'react';
import RouteNames from '../RouteNames';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Home/HomeScreen';

import TermsScreen from '../Terms/TermsScreen';

const Stack = createNativeStackNavigator();

const TermsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={RouteNames.TermsStack} component={TermsScreen} />
    </Stack.Navigator>
  );
};

export default TermsStackNavigator;
