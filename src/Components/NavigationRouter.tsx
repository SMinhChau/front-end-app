import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login/LoginScreen';
import TabNavigation from './TabNavigation';
import SplashScreen from './SplashScreen';

const Stack = createNativeStackNavigator();

const NavigationRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{title: 'SplashScreen'}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          //   options={{title: 'Login'}}
        />
        <Stack.Screen name={'TabNavigation'} component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default NavigationRouter;
