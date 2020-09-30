import React, {Component} from 'react';
import {Text, View, Alert, Image, ActivityIndicator} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';

export default class index extends Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
    lng: 'unkown',
    lat: 'unkown',
    listData: [],
    loader: false,
  };
  watchID = null;

  componentDidMount() {
    this.weatherService();
  }

  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }
  weatherService = () => {
    this.setState({loader: true});
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const initialPosition = JSON.stringify(position);
        const lng = JSON.stringify(position.coords.longitude);
        const lat = JSON.stringify(position.coords.latitude);
        const appid = 'APP_ID_HERE';
        console.log(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon${lng}&appid=${appid}`,
        );
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${appid}`,
        )
          .then((response) => response.json())
          .then((data) => {
            const {list = []} = data;
            let Week = [];
            for (let i = 0; i < 5; i++) {
              var today = new Date();
              let D = today.setDate(today.getDate() + i);
              Week.push(D);
            }
            var D = [];
            Week.map((e1, index1) => {
              list.map((e, index) => {
                if (moment(e.dt_txt).date() == moment(e1).date())
                  if (moment(e.dt_txt).hour() == 15) {
                    D.push(e);
                  }
              });
            });
            this.setState({listData: D});
          })
          .finally((e) => this.setState({loader: false}));
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
      <View style={{flex: 1, flexDirection: 'column', paddingLeft: 5}}>
        <View
          style={{position: 'absolute', left: '40%', top: '40%', zIndex: 1000}}>
          <ActivityIndicator
            animating={this.state.loader}
            color="#0000ff"
            size={70}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 200,
            borderWidth: 3,
          }}>
          <View style={{marginTop: 200}}>
            <Text style={{fontSize: 35, fontWeight: '800'}}>
              {this.state.listData.length > 0 &&
                this.state.listData[0].main.temp}
            </Text>
          </View>
          <Text style={{fontSize: 18}}>Delhi </Text>
        </View>
        <View></View>
        <ScrollView>
          {this.state.listData.map(
            (e1, index) => index != 0 && <Row data={e1} />,
          )}
        </ScrollView>
      </View>
    );
  }
}

const Row = (props) => {
  const {dt = '', main = [], dt_txt = ''} = props.data;
  var weekday = new Array(7);
  weekday[0] = 'Sunday';
  weekday[1] = 'Monday';
  weekday[2] = 'Tuesday';
  weekday[3] = 'Wednesday';
  weekday[4] = 'Thursday';
  weekday[5] = 'Friday';
  weekday[6] = 'Saturday';
  const day = weekday[moment(dt_txt).weekday()];
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
      }}>
      <View style={{width: '50%'}}>
        <Text>{day}</Text>
      </View>
      <View style={{width: '50%'}}>
        <Text>{main.temp}</Text>
      </View>
    </View>
  );
};
