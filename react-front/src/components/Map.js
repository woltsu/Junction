import React from 'react';
import ReactGoogleMapLoader from "react-google-maps-loader";

// api key: AIzaSyACmB2n2iFqcWZe1hFWHAlWyxGUtc6RIFA

var map, infoWindow;
var google = <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyACmB2n2iFqcWZe1hFWHAlWyxGUtc6RIFA&callback=initMap"/>;

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.initMap = this.initMap.bind(this);
        this.handleLocationError = this.handleLocationError.bind(this);
    }

    componentWillMount() {
        this.initMap();
    }

    initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                infoWindow.open(map);
                map.setCenter(pos);
            }, function () {
                this.handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            this.coordshandleLocationError(false, infoWindow, map.getCenter());
        }
    }

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    render() {
        
        return (
            <div className="Map">
                {map}
            </div>
        );
    }
}

export default Map
