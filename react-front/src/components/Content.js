import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Datagetter } from './Datagetter';

export class Content extends Component {
  render() {
    return (
        <div>
          <Datagetter />
        </div>
    );
  }
}

