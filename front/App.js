import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer, TabActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Pay from './src/screens/Pay';
import Navbar from './src/components/Navbar';
import StackNavigator from './src/utils/StackNavigator';
import TabNavigator from './src/utils/TabNavigator';

const Stack = createStackNavigator();

// const StackNavigator = ({navigation}) => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="Register" component={Register} />
//       <Stack.Screen name="Pay" component={Pay} />
//     </Stack.Navigator>
//   );
// };
export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    );
  }
}
