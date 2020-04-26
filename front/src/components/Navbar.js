import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import {ButtonGroup} from 'react-native-elements';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 2,
      buttons: ['Home', 'Login', 'Register', 'Pay'],
    };
    this.goto = this.goto.bind(this);
  }

  goto = selectedIndex => {
    this.setState({selectedIndex}, () => {
      this.props.goto(this.state.buttons[selectedIndex]);
    });
  };

  render() {
    return (
      <View>
        <View>
          <ButtonGroup
            onPress={this.goto}
            buttons={this.state.buttons}
            containerStyle={{
              height: '50%',
              borderColor: 'black',
              width: '100%',
              right: '10%',
            }}
            innerBorderStyle={{backgroundColor: 'black'}}
            buttonStyle={{height: '100%', width: '100%'}}
          />
        </View>
      </View>
    );
  }
}
