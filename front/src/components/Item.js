import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Button, ButtonGroup} from 'react-native-elements';

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButtons: false,
      buttons: ['Redeem', 'Purchase'],
      selectedIndex: 0,
    };
  }

  toggleButtons = () => this.setState({showButtons: !this.state.showButtons});

  render() {
    return (
      <TouchableOpacity
        onPress={this.toggleButtons}
        style={styles.imageWrapper}>
        <Image
          style={this.state.showButtons ? styles.imageButtons : styles.image}
          source={this.props.image}
        />
        {this.state.showButtons && (
          //   <ButtonGroup
          //     buttons={this.state.buttons}
          //     containerStyle={{height: '60%', width: '50%', right: '50%'}}
          //   />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button title="Redeem" buttonStyle={styles.button1} />
            <Button title="Purchase" buttonStyle={styles.button2} />
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  imageWrapper: {
    height: 100,
    // height: '15%',
    // flex: 1,
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: '5%',
    borderColor: 'black',
  },
  image: {
    width: '85%',
    height: '100%',
    opacity: 0.8,
    borderRadius: 5,
  },
  imageButtons: {
    width: '85%',
    height: '100%',
    opacity: 0.8,
    borderRadius: 5,
    right: '60%',
  },
  button1: {
    width: '70%',
    height: '100%',
    opacity: 0.8,
    borderRadius: 5,
    right: '60%',
    backgroundColor: '#aeaeae',
  },
  button2: {
    width: '70%',
    height: '100%',
    opacity: 0.8,
    borderRadius: 5,
    // right: '100%',
    right: '111%',
    backgroundColor: '#ffbe42',
  },
});
