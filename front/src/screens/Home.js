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
  TextInput,
  Alert,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Item from '../components/Item';
import Icon from 'react-native-ionicons';

import coffee1 from '../images/coffee1.jpg';
import coffee2 from '../images/coffee2.jpg';
import coffee3 from '../images/coffee3.jpg';
import coffee4 from '../images/coffee4.jpg';

import QRScanner from '../components/QRScanner';

const data = [
  {itemid: 1, itemName: 'coffee1', image: coffee1, quantityAvailable: 4},
  {itemid: 2, itemName: 'coffee2', image: coffee2, quantityAvailable: 9},
  {itemid: 3, itemName: 'coffee3', image: coffee3, quantityAvailable: 7},
  {itemid: 4, itemName: 'coffee4', image: coffee4, quantityAvailable: 12},
];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderCamera: false,
      search: '',
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
          {/* <Text>Pepega</Text>
          <Button title="Push to show" onPress={this.toggleCamera.bind(this)} /> */}

          <View
            style={{
              height: '4%',
            }}>
            <View
              style={{
                // backgroundColor: 'red',
                width: '10%',
                left: '87%',
                top: '35%',
              }}>
              <Icon name="person-outline" color="#ffbe42" size={35} />
            </View>
          </View>

          <View
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              marginLeft: '5%',
              marginRight: '5%',
              height: '3.9%',
            }}>
            <TextInput
              style={{
                backgroundColor: '#aeaeae',
                borderRadius: 100,
                height: '70%',
              }}
            />
          </View>

          {data.map((d, idx) => (
            <Item
              key={idx}
              name={d.name}
              image={d.image}
              itemid={d.itemId}
              goto={loc => this.props.navigation.navigate(loc, d)}
            />
          ))}
          {/* <Item image={coffee1} />
          <Item image={coffee2} />
          <Item image={coffee3} />
          <Item image={coffee4} />
          <Item image={coffee1} />
          <Item image={coffee2} />
          <Item image={coffee3} />
          <Item image={coffee4} />
          <Item image={coffee2} />
          <Item image={coffee3} />
          <Item image={coffee4} /> */}
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
