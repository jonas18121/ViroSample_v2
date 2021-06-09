'use strict';

import React, { Component } from 'react';

import {StyleSheet, PermissionsAndroid} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

import projector from 'ecef-projector';

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
      geolocation : {
        latitude : null,
        longitude : null,
        count: 0,
        selisih: null,
        xSel: null,
        ySel: null,
        zSel: null,
        distance: null,
      }
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    // this._getLocation = this._getLocation.bind(this)
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

  getCoordinate = () => {

    const userxyz = projector.project(this.state.geolocation.latitude, this.state.geolocation.longitude, 0.0);
    const objectxyz = projector.project(-6.260719, 106.781616, 0.0)

    if (this.state.geolocation.count === 0) {
        this.selisih(userxyz, objectxyz)
    }
    const distance = this.getDistance(this.state.geolocation.latitude, this.state.geolocation.longitude, -6.260719, 106.781616)
    this.setState({
        geolocation: {
            distance: distance
        }
    })
}

selisih = (user, object) => {

    let selisih = {
        x: user[0] - object[0],
        y: user[1] - object[1],
        z: user[2] - object[2]
    }
    this.setState({
        geolocation: {
            xSel: selisih.x,
            ySel: selisih.y,
            zSel: selisih.z,
            count: this.state.geolocation.count + 1
        }
    })
}


getDistance = (lon1, lat1, lon2, lat2) => {
    if (typeof(Number.prototype.toRad) === "undefined") {
        Number.prototype.toRad = function() {
            return this * Math.PI / 180;
        }
    }

    /* var R = 6371; // Radius of the earth in km

    var dLat = (lat2-lat1).toRad();  // Javascript functions in radians

    var dLon = (lon2-lon1).toRad(); // distance longitude

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
            Math.sin(dLon/2) * Math.sin(dLon/2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c * 1000 // Distance in km

    return d.toFixed(2) */
}

  _getLocation = () => {
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
      text_2 : "Latitude: " + position.coords.longitude,
      geolocation : {
        latitude : position.coords.latitude,
        longitude : position.coords.longitude
      }
    });

    const userxyz = projector.project(this.state.geolocation.latitude, this.state.geolocation.longitude, 0.0);
    const objectxyz = projector.project(-6.260719, 106.781616, 0.0)

    if (this.state.geolocation.count === 0) {
        this.selisih(userxyz, objectxyz)
    }
    /*const distance = this.getDistance(this.state.geolocation.latitude, this.state.geolocation.longitude, -6.260719, 106.781616)
    this.setState({
        geolocation: {
            distance: distance
        }
    }) */

    /* this.setState({
      text_2 : "mon test: " + this.state.geolocation.latitude,
    }); */

    
  }
  
  render() {

    const numx = this.state.geolocation.xSel;
    const numy = this.state.geolocation.ySel;
    const numz = this.state.geolocation.zSel;
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        {/* <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} /> */}
        <ViroText text={this.state.text_2} scale={[.5, .5, .5]} position={[this.state.geolocation.latitude, 0, this.state.geolocation.longitude]} style={styles.helloWorldTextStyle} />
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
