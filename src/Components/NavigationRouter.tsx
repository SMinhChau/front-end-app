import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login/LoginScreen';
import TabNavigation from './TabNavigation';
import SplashScreen from './SplashScreen';
import TermMenu from './Terms/components/TermMenu';
import TopicMenu from './Terms/components/TopicMenu';
import GroupMenu from './Terms/components/GroupMenu';
import LectureMenu from './Terms/components/LectureMenu';

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
        <Stack.Screen name={'TermMenu'} component={TermMenu} />
        <Stack.Screen name={'TopicMenu'} component={TopicMenu} />
        <Stack.Screen name={'GroupMenu'} component={GroupMenu} />
        <Stack.Screen name={'LectureMenu'} component={LectureMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default NavigationRouter;
