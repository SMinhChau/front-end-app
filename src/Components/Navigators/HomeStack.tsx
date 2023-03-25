import React from 'react';
import RouteNames from '../RouteNames';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Home/HomeScreen';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={RouteNames.HonmeStack} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
