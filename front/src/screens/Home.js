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
import axios from 'axios';
import {api} from '../../API';

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
      vendors: [],
    };
  }

  componentDidMount() {
    api.getItems('titanic').then(res => {
      let vendors = [];
      let idx = 0;
      for (vend in res.data) {
        vendors.push({vendorID: vend.vendorID, vendorName: vend.vendorName});
      }
      this.setState({vendors: vendors});
    });
  }

  onSuccess = e => {
    // if (api)
    Alert.alert('Dank', 'Message', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel'),
        style: 'cancel',
      },
      {cancelable: false},
    ]);
    // else Alert.alert('pepega');
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
              <Icon
                name="person-outline"
                color="#ffbe42"
                size={35}
                onPress={() => this.props.navigation.navigate('Profile')}
              />
            </View>
          </View>

          <View
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              marginLeft: '5%',
              marginRight: '5%',
              height: '9%',
              marginTop: '8%',
            }}>
            <TextInput
              style={{
                backgroundColor: '#aeaeae',
                borderRadius: 100,
                height: '80%',
              }}
            />
          </View>

          {/* <Text>{this.state.vendorName}</Text> */}

          {data.map((d, idx) => {
            if (idx < this.state.vendors.length) {
              console.log(this.state.vendors[idx]);
            }
            return (
              <Item
                key={idx}
                name={d.name}
                image={d.image}
                itemid={d.itemId}
                goto={loc => this.props.navigation.navigate(loc, d)}
              />
            );
          })}
        </ScrollView>
      );
    }
  }
}
