import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Button} from 'react-native-elements';

export default class Register extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Register</Text>
        <Button
          title="gotohome"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}
