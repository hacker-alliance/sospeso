import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Button} from 'react-native-elements';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Login</Text>
        <Button
          title="gotohome"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}
