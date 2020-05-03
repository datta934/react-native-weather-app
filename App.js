import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import Weather from './components/Weather';
import { Api_Key } from './utils/WeatherAPI';

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    windSpeed: 0,
    humidity: 0,
    weatherCondition: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.fetchWeather(position.coords.latitude, position.coords.longitude);
    },
      error => {
        this.setState({
          error: "Getting error to fetch conditions!"
        });
      }
    );
  }

  fetchWeather(lat, lon) {
    // lat = 37;
    // lon = 95;
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${Api_Key}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          windSpeed: json.wind.speed,
          humidity: json.main.humidity,
          isLoading: false
        });
      });
  }

  render() {
    const { isLoading, weatherCondition, temperature, windSpeed, humidity } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching The Weather</Text>
          </View>
        ) : (
            <Weather weather={weatherCondition} temperature={temperature} windSpeed={windSpeed} humidity={humidity} />
          )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 30
  }
});
