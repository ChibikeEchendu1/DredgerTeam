import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  Vibration,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import {VARIABLES} from '../utils/Variables';
import Normalize from '../utils/Normalize';

import {
  emailChanged,
  PasswordChanged,
  NameChanged,
  AddItemStore,
  SignUpUser,
  CodeChanged,
  SendBreackDown,
} from '../actions';
import {connect} from 'react-redux';
import {Input, Button} from 'react-native-elements';
const MIDHIGHT = Dimensions.get('window').height / 2;
const DURATION = 1000;
class TakePictureView extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.off,
      },
      barcodeCodesFound: [],
      found: false,
      error: '',
      flash: false,
      Current: '',
      Parts: this.props.navigation.state.params.Parts,
      Description: this.props.navigation.state.params.Description,
      WorkmanShip: this.props.navigation.state.params.WorkmanShip,
      Prospect: this.props.navigation.state.params.Prospect,
    };
  }

  async _handlePress() {
    if (this.state.flash) {
      this.setState({
        camera: {
          type: RNCamera.Constants.Type.back,
          flashMode: RNCamera.Constants.FlashMode.off,
        },
        flash: false,
      });
    } else {
      this.setState({
        camera: {
          type: RNCamera.Constants.Type.back,
          flashMode: RNCamera.Constants.FlashMode.torch,
        },
        flash: true,
      });
    }
  }

  onBarCodeRead(scanResult) {
    console.log('found');

    if (scanResult.data != null) {
      if (!this.barcodeCodes.includes(scanResult.data)) {
        Vibration.vibrate(DURATION);
        if (!this.state.found) {
          this.barcodeCodes.push(scanResult.data);
          this.setState({Current: scanResult.data, error: '', found: true});
          console.warn('onBarCodeRead call');
        } else {
          this.setState({error: 'ADD PRICE FOR OLD ITEM'});
        }
      } else {
        this.setState({error: 'Item Is Already Added'});
      }
    }
    return;
  }

  async takePicture() {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      this.props.SendBreackDown(
        this.state.Parts,
        this.state.Description,
        this.state.WorkmanShip,
        this.state.Prospect,
        data,
      );

      console.log(data.uri);
    }
  }

  onNameC(text) {
    this.props.NameChanged(text);
  }

  onAddPress() {
    this.setState({Current: '', found: false, error: ''});
  }

  onCodeC(text) {
    this.props.CodeChanged(text);
  }
  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Waiting</Text>
      </View>
    );
  }

  added() {
    if (this.props.Added) {
      console.log('jgvhgvhgvh');
      this.props.navigation.navigate('MachineHomeManager');
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={Keyboard.dismiss} style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          defaultTouchToFocus
          flashMode={this.state.camera.flashMode}
          mirrorImage={false}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
          style={styles.preview}
          type={this.state.camera.type}
        />
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <TouchableOpacity
            style={{
              display: 'flex',
              backgroundColor: 'white',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              height: 60,
              width: 60,
              borderRadius: 50,
              marginBottom: 10,
            }}
            onPress={this.takePicture.bind(this)}>
            <Icon name="camera" size={20} color="black" />
          </TouchableOpacity>
        </View>
        {this.added()}
      </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    Name: state.auth.Name,
    Code: state.auth.Code,
    NameError: state.auth.NameError,
    CodeError: state.auth.CodeError,
    EmailError: state.auth.EmailError,
    PasswordError: state.auth.PasswordError,
    Loader: state.auth.Loader,
    Boss: state.auth.Boss,
    items: state.auth.items,
    Added: state.auth.Added,

    Manager: state.auth.Manager,
  };
};

export default connect(
  mapStateToProps,
  {
    emailChanged,
    PasswordChanged,
    NameChanged,
    AddItemStore,
    SignUpUser,
    CodeChanged,
    SendBreackDown,
  },
)(TakePictureView);
