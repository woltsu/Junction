import React, { Component } from 'react';
import { Map } from './Map';

var d;
var c;
var fakeSpeedInterval;

export class Datagetter extends Component {
    constructor(props) {
        super(props);
        var bus = '3009';
        this.state = {
            data: {
                'BusId': '"waiting"',
                'tsl': '"soon"',
                fakeSpeed: 0
            }
        };
        this.getData = this.getData.bind(this);
        this.getCenter = this.getCenter.bind(this);
        this.setFakeSpeed = this.setFakeSpeed.bind(this);
    }

    getData() {
        var data = fetch('https://llb.cloud.tyk.io/llb-bus-api/GetData?busId=9999', {
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

    getCenter() {
        const lat = this.state.data.lat;
        var lng = this.state.data.lon;
        this.setState({ center: { lat: lat, lng: lng } });
    }

    setFakeSpeed() {
        this.setState({fakeSpeed: Math.floor(Math.random() * 6) + 30  })
    }

    componentDidMount() {
        this.getData();
        this.getCenter();
        d = setInterval(this.getData, 1000);
        c = setInterval(this.getCenter, 3000);
        fakeSpeedInterval = setInterval(this.setFakeSpeed, 1000);
    }

    componentUnmount() {
        d.clearInterval();
        c.clearInterval();
    }

    render() {
        var now = new Date();
        return (
            <div>
                <h3>Bus {this.state.data.BusId}</h3>
                <p>Speed: {Math.round(this.state.data.spd * 3.6) + " km/h"}</p>
                <p>Speed: {this.state.fakeSpeed} km/h</p>
                
                <p>  {now.getHours() + ':' + now.getMinutes() + ', ' + now.getDate() + '.' + (now.getMonth()+1) + '.' + now.getFullYear()}</p>
            </div>
        );
    }
}



