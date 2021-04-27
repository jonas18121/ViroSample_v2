'use strict';

import React, { Component } from 'react';

import {StyleSheet, PermissionsAndroid} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      text_2 : '',
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._getLocation = this._getLocation.bind(this)
    this._showPosition = this._showPosition.bind(this)
  }

  componentDidMount() {
    if (PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) {

      this._getLocation()
      /* try {
        Geolocation.getCurrentPosition(
            (position) => {
              console.log(position);
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
      catch (e) {
          console.log('cameraRollErr:', e)
      } */

      /* this.setState({
        text : this._getLocation()
      }); */
      
    }

    
  }

  _getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._showPosition);
    } else {
      return 'no bro'
    }
  }

  _showPosition(position) {
    // return "Latitude: " + position.coords.latitude
    // "<br>Longitude: " + position.coords.longitude;

    this.setState({
      text_2 : "Latitude: " + position.coords.latitude
    });
  }
  
  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        <ViroText text={this.state.text_2} scale={[.5, .5, .5]} position={[-1, 0, -1]} style={styles.helloWorldTextStyle} />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldSceneAR;
