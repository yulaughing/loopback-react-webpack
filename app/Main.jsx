import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import rootRoute from './index';

require('file?name=[name].[ext]!./index.html');
require('file?name=[name].[ext]!./client.bundle.js');

ReactDOM.render(
  <Router history={browserHistory} routes={rootRoute} />,
  document.getElementById('app')
);
