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
  Alert,
} from 'react-native';
import {Redirect} from 'react-router-native';

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

  goto = location => <Redirect to={'/' + location} />;

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
        <View>
          <Text>Pepega</Text>
          <Button title="Push to show" onPress={this.toggleCamera.bind(this)} />
          <Button title="Gotopay" onPress={() => <Redirect to="/pay" />} />
          <Button title="Gotologin" onPress={() => <Redirect to="/login" />} />
          <Button
            title="Gotoregister"
            onPress={() => <Redirect to="/register" />}
          />

          {/* {this.state.renderCamera && <CameraScreen />} */}
        </View>
      );
    }
  }
}
