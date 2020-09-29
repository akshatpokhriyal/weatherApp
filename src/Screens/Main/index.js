import React, {Component} from 'react';
import {Text, View, Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
export default class index extends Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
    lng: 'unkown',
    lat: 'unkown',
  };
  watchID = null;

  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const initialPosition = JSON.stringify(position);
        const lng = JSON.stringify(position.coords.longitude);
        const lat = JSON.stringify(position.coords.latitude);
        this.setState({
          initialPosition,
          lng,
          lat,
        });
      },
      (error) => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000},
    );
    this.watchID = Geolocation.watchPosition((position) => {
      const lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }

  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  render() {
    const {initialPosition, lat, lng} = this.state;
    return (
      <View>
        <Text>Main </Text>
        <Text>Latitude: {lat}</Text>
        <Text>longitude: {lng}</Text>
      </View>
    );
  }
}
