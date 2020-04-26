import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  TouchableWithoutFeedback,
  Dimensions,
  Button,
  Linking,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import Navbar from '../components/Navbar';
import Item from '../components/Item';

import coffee1 from '../images/coffee1.jpg';
import coffee2 from '../images/coffee2.jpg';
import coffee3 from '../images/coffee3.jpg';
import coffee4 from '../images/coffee4.jpg';

import QRScanner from '../components/QRScanner';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderCamera: false,
    };
  }

  onSuccess = e => {
    Alert.alert('Dank', 'Message', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel'),
        style: 'cancel',
      },
      {cancelable: false},
    ]);
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err),
    // );
  };

  toggleCamera = () => this.setState({renderCamera: !this.state.renderCamera});

  render() {
    if (this.state.renderCamera) {
      return (
        <QRScanner
          fadeIn={false}
          onRead={this.onSuccess}
          toggle={this.toggleCamera}
          bottomContent={<Button title="Toggle" onPress={this.toggleCamera} />}
        />
      );
    } else {
      return (
        <ScrollView style={{flex: 1, height: '100%'}}>
          <Text>Pepega</Text>
          <Button title="Push to show" onPress={this.toggleCamera.bind(this)} />

          {/* <Button
            title="pepega"
            onPress={() =>
              this.props.navigation.navigate('Login', {name: 'Login'})
            }
          /> */}

          <Item image={coffee1} />
          <Item image={coffee1} />
          <Item image={coffee1} />
          <Item image={coffee1} />
          <Item image={coffee1} />
          <Item image={coffee1} />
          <Item image={coffee1} />
          <Item image={coffee1} />
          <Item image={coffee1} />
          <Item image={coffee1} />
          <Item image={coffee1} />
          <Item image={coffee1} />
          <Item image={coffee1} />
          <Item image={coffee1} />

          {/* <Item image={coffee2} />
          <Item image={coffee3} />
          <Item image={coffee4} /> */}

          {/* <Image source={coffee1} />
            <Image source={coffee1} />
            <Image source={coffee1} />
            <Image source={coffee1} /> */}
          {/* <Item image={coffee1} /> */}
          {/* <Item image={coffee2} /> */}
          {/* <Item image={coffee3} />
          <Item image={coffee4} /> */}
          {/* <Navbar goto={loc => this.props.navigation.navigate(loc)} /> */}
        </ScrollView>
      );
    }
  }
}
