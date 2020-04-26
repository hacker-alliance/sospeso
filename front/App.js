import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer, TabActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ionicons';

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
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Notifications') {
              iconName = 'wallet-outline';
            } else if (route.name === 'Bookmarks') {
              iconName = 'bookmark-outline';
            } else if (route.name == 'Profile') {
              iconName = 'person-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          showLabel: false,
          activeTintColor: '#ffbe42',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Notifications" component={Home} />
        <Tab.Screen name="Bookmarks" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );

    const PayTabs = () => {
      return (
        <Tab.Navigator initialRouteName="Pay">
          <Tab.Screen name="Home" component={HomePageTabs} />
          <Tab.Screen name="Pay" component={Pay} />
        </Tab.Navigator>
      );
    };

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
