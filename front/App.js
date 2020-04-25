/* eslint-disable no-console */
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
// eslint-disable-next-line import/no-unresolved

import QRScanner from './src/components/QRScanner';

const landmarkSize = 2;

export default class App extends Component {
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
        <View>
          <Text>Pepega</Text>
          <Button title="Push to show" onPress={this.toggleCamera.bind(this)} />
          {/* {this.state.renderCamera && <CameraScreen />} */}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    // backgroundColor: '#000',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoFocusBox: {
    position: 'absolute',
    height: 64,
    width: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    opacity: 0.4,
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});
