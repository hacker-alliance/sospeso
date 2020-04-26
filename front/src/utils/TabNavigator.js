import React from 'react';
import {NavigationContainer, TabActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Pay from '../screens/Pay';
// import Navbar from './src/components/Navbar';

const Tab = createBottomTabNavigator();

const TabNavigator = ({navigation}) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Register" component={Register} />
      <Tab.Screen name="Pay" component={Pay} />
    </Tab.Navigator>
    //   <Tab.Navigator>
    //   <Tab.Screen name="Home" component={Home} />
    //   <Tab.Screen name="Login" component={Login} />
    //   <Tab.Screen name="Register" component={Register} />
    //   <Tab.Screen name="Pay" component={Pay} />
    // </Tab.Navigator>
  );
};

export default TabNavigator;
