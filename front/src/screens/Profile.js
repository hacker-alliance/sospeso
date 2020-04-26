import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Button} from 'react-native-elements';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'idk bruh',
      accountId: 'toolazy to fakedata',
      accountType: 'donatee',
    };
  }

  changeAccountType = () => {
    if (this.state.accountType === 'donatee') {
      this.setState({accountType: 'donater'}, () => {
        // insert logic here
      });
    } else {
      this.setState({accountType: 'donatee'}, () => {
        // insert logic here
      });
    }
  };

  render() {
    return (
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            marginTop: '50%',
          }}>
          <Text style={{marginBottom: '3%'}}>Name: {this.state.name}</Text>
          <Text style={{marginBottom: '3%'}}>ID: {this.state.accountId}</Text>
          <Text style={{marginBottom: '3%'}}>
            accountType: {this.state.accountType}
          </Text>
          <Button
            buttonStyle={{backgroundColor: '#ffbe42', width: '60%'}}
            title="Change accounttype"
            onPress={this.changeAccountType}
          />
        </View>
      </View>
    );
  }
}
