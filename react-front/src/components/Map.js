import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { BusMarker } from './BusMarker'; 
 
export class Map extends Component {
  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 16
  };
 
  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        lat={this.props.lat}
        lng={this.props.lng}
        center={this.props.newCenter}
      >

    <BusMarker
        lat={this.props.lat}
        lng={this.props.lng}
        text={'Bus'} />

      </GoogleMapReact>
    );
  }
}
