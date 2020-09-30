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
    this.weatherService();
  }

  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }
  weatherService = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const initialPosition = JSON.stringify(position);
        const lng = JSON.stringify(position.coords.longitude);
        const lat = JSON.stringify(position.coords.latitude);
        const appid = 'APPID';
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon${lng}&appid=${appid}`,
        )
          .then((response) => response.json())
          .then((data) => console.log('data', data));
        this.setState({
          initialPosition,
          lng,
          lat,
        });
      },
      (error) => this.props.navigation.navigate('Error'),
      {enableHighAccuracy: true},
    );
    this.watchID = Geolocation.watchPosition((position) => {
      const lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  };

  render() {
    const {initialPosition, lat, lng} = this.state;
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 35, fontWeight: '800'}}>10 </Text>
          <Text style={{fontSize: 18}}>Delhi </Text>
        </View>
        <View style={{flex: 1}}>
          <Text>Latitude: {lat}</Text>
        </View>
      </View>
    );
  }
}
