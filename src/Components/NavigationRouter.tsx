import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login/LoginScreen';
import TabNavigation from './TabNavigation';
import SplashScreen from './SplashScreen';
import TermMenu from './Home/components/TermMenu';
import TopicMenu from './Home/components/TopicMenu';
import EvaluationMenu from './Home/components/GroupMenu';

import ItemStudents from './Group/components/ItemStudents';
import ItemListGroup from './Group/components/ItemListGroup';

import InviteJoinGroup from './Group/components/InviteJoinGroup';
import JoinGroupToOrther from './Group/components/JoinGroupToOrther';

import ItemTopicMenu from './Group/components/ItemTopicMenu';
import LectureMenu from './Home/components/LectureMenu';
import Notification from './Home/Notification';
import DisAcceptedUser from './Login/Notification';
import ForgotPassword from './Login/ForgotPassword';

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
        <Stack.Screen name={'EvaluationMenu'} component={EvaluationMenu} />
        <Stack.Screen name={'LectureMenu'} component={LectureMenu} />

        <Stack.Screen name={'ItemListGroup'} component={ItemListGroup} />
        <Stack.Screen name={'ItemStudents'} component={ItemStudents} />
        <Stack.Screen
          name={'JoinGroupToOrther'}
          component={JoinGroupToOrther}
        />
        <Stack.Screen name={'InviteJoinGroup'} component={InviteJoinGroup} />
        <Stack.Screen name={'ItemTopicMenu'} component={ItemTopicMenu} />
        <Stack.Screen name={'Notification'} component={Notification} />
        <Stack.Screen name={'DisAcceptedUser'} component={DisAcceptedUser} />
        <Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default NavigationRouter;
