import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer, TabActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Pay from './src/screens/Pay';
import Redeem from './src/screens/Redeem';
import Profile from './src/screens/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class App extends Component {
  render() {
    const HomePageTabs = () => (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        {/* <Tab.Screen name="Dank" component={Login} /> */}
        {/* <Tab.Screen name="Memes" component={Register} /> */}
        <Tab.Screen name="Pay" component={Pay} />
      </Tab.Navigator>
    );

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" headerMode={false}>
          <Stack.Screen name="Home" component={HomePageTabs} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Redeem" component={Redeem} />
          <Stack.Screen name="Pay" component={Pay} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
