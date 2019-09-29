import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Moment from 'moment';

import { App } from './App';


import 'antd/dist/antd.css';
import './styles/app.css';
import './styles/icons/fa.css';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  Axios.defaults.baseURL='http://localhost:3030/api';
} else {
  // production code
  Axios.defaults.baseURL='/api';
}

Moment.locale('es');

ReactDOM.render(<App />, document.getElementById('App'))