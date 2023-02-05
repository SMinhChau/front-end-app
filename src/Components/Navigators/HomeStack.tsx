import React from 'react';
import RouteNames from '../RouteNames';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Home/Home';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={RouteNames.honmeStack} component={Home} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
