/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
const Stack = createNativeStackNavigator();

import {store} from './src/redux/store';
import SplashScreen from './src/Components/SplashScreen';
import RouteNames from './src/Components/RouteNames';
import TabNavigation from './src/Components/TabNavigation';
import Login from './src/Components/Login/Login';

const App = () => {
  return (
    <Provider store={store}>
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
            // options={{title: 'Login'}}
          />

          <Stack.Screen name={'TabNavigation'} component={TabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
