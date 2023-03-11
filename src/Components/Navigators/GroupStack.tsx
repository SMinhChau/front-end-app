import React from 'react';
import RouteNames from '../RouteNames';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Group from '../Group/GroupScreen';

const Stack = createNativeStackNavigator();

const GroupStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={RouteNames.GroupStack} component={Group} />
    </Stack.Navigator>
  );
};

export default GroupStackNavigator;
