import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect as reduxConnect } from 'react-redux'
import './styles.css'
import {setcurrentlocation} from '../../actions'

const locationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

const mapStateToProps = () => ({
})

const mapDispatchToProps = {

}

class GoogleMap extends Component {
  constructor(props) {
    super();
 
    this.state = {
      seconds: 0,
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: null,
      longitude: null,
      speed: null,
      timestamp: null
    };
  }

  tick = () => {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));
  }

  static propTypes = {
    
  }

  static defaultProps = {
    seconds: 0,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null
  }
  
  componentDidMount() {
      this.getState()
  }

  componentWillReceiveProps(nextProps) {
      this.getState(nextProps)
  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
  }

  getState = props => {
    this.interval = setInterval(() => this.tick(), 1000);
    const {accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp} = window.store.getState().currentlocation
    this.setState({accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp})
  }

  successCallback = (pos) => {
    const {accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp} = pos.coords
    window.store.dispatch(setcurrentlocation(accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp))
  }

  errorCallback = () => {
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    navigator.geolocation.watchPosition(this.successCallback, this.errorCallback, locationOptions)
    return (
      <div className="GoogleMapContainer">
        <p>Accuracy: {this.state.accuracy}</p>
        <p>Altitude: {this.state.altitude}</p>
        <p>AltitudeAccuracy: {this.state.altitudeAccuracy}</p>
        <p>Heading: {this.state.heading}</p>
        <p>Latitude: {this.state.latitude}</p>
        <p>Longitude: {this.state.longitude}</p>
        <p> Speed: {this.state.speed}</p>
        <p>Timestamp: {this.state.timestamp}</p>
        Seconds: {this.state.seconds}
      </div>
    );
  }
}
export default reduxConnect(mapStateToProps, mapDispatchToProps)(GoogleMap)
