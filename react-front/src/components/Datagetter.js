import React, { Component } from 'react';
import { Map } from './Map';

var d;
var c;

export class Datagetter extends Component {
    constructor(props) {
        super(props);
        this.state = { data: { 'BusId': '"waiting"', 'tsl': '"soon"', '3009_6': { 'set_6': 6 }, '3009_7': { 'set_7': 7 }, '3009_8': { 'set_8': 8 }  } };
        this.getData = this.getData.bind(this);
        this.getCenter = this.getCenter.bind(this);
    }

    getData() {
        var data = fetch('https://llb.cloud.tyk.io/llb-bus-api/GetData?busId=3009', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer 5a07a2f986f30e00015b3cb1061eb57097f8488b8cf5cfb61e782186",
            }
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            this.setState({ data: responseJson });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    getCenter(){
        const lat = this.state.data.lat;
        var lng = this.state.data.lon;
        this.setState({ center: {lat: lat, lng: lng} });
    }

    componentDidMount() {
        this.getData();
        this.getCenter();
        d = setInterval(this.getData, 1000);
        c = setInterval(this.getCenter, 3000);
    }

    componentDidUnmount() {
        d.clearInterval();
        c.clearInterval();
    }

    render() {
        return (
            <div>
                <div style={{ width: "20%", float: "left" }}>
                    <p>Bus {this.state.data.BusId}</p>
                    <p>~ spd: {(this.state.data.spd*1000/360)}</p>
                    <p>~ Altitude: {this.state.data.alt}</p>
                    <p>~ Latitude: {this.state.data.lat}</p>
                    <p>~ Lontitude: {this.state.data.lon}</p>
                    <p>~ Temp_6: {this.state.data['3009_6']['set_6']}</p>
                    <p>~ Temp_7: {this.state.data['3009_7']['set_7']}</p>
                    <p>~ Temp_8: {this.state.data['3009_8']['set_8']}</p>
                    <button onClick={this.getData}>Get the Bus!</button>
                    <button onClick={this.getCenter}>Get the Map!</button>
                </div>
            </div>
        );
  }
}



