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
import QRScanner from '../components/QRScanner';

import coffee1 from '../images/coffee1.jpg';
import coffee2 from '../images/coffee2.jpg';
import coffee3 from '../images/coffee3.jpg';
import coffee4 from '../images/coffee4.jpg';

// If CSS is fucked up related to the camera in here, you will prolly modify the camera css in QRScanner

export default class Redeem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderCamera: false,
      search: '',
    };
  }

  render() {
    return (
      <View>
        {/* <Text>Pepega</Text>
          <Button title="Push to show" onPress={this.toggleCamera.bind(this)} /> */}

        <View style={{height: '10%'}}>
          <View
            style={{
              // backgroundColor: 'red',
              width: '10%',
              left: '87%',
              top: '70%',
            }}>
            <Icon name="person-outline" color="#ffbe42" size={35} />
          </View>
        </View>

        <View
          style={{
            height: '42%',
            width: '120%',
            // height: '15%',
            // flex: 1,
            // backgroundColor: 'red',
            flexDirection: 'row',
            marginTop: '8%',
            borderColor: 'black',
          }}>
          <Image
            style={{
              width: '85%',
              height: '100%',
              opacity: 0.8,
              borderRadius: 5,
            }}
            source={this.props.route.params.image}
          />
        </View>
        <View>
          <Text
            style={{
              color: '#ffbe42',
              fontWeight: 'bold',
              marginLeft: '16%',
              marginTop: '3%',
            }}>
            Redeem | {this.props.route.params.itemName}
          </Text>
          <Text
            style={{marginLeft: '16%', marginTop: '3%', fontWeight: 'bold'}}>
            QR CODE
          </Text>
          <QRScanner />
        </View>
      </View>
    );
  }
}
