import React, {Component} from 'react';
import {NavigationContainer, TabActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Pay from '../screens/Pay';
import Navbar from '../components/Navbar';

const Stack = createStackNavigator();

const StackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Pay" component={Pay} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
