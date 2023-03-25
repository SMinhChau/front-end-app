import React from 'react';
import RouteNames from '../RouteNames';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EvaluationScreen from '../Evaluation/EvaluationScreen';

const Stack = createNativeStackNavigator();

const EvaluationStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={RouteNames.EvaluationStack}
        component={EvaluationScreen}
      />
    </Stack.Navigator>
  );
};

export default EvaluationStackNavigator;
