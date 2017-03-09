import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
window.$ = require('jquery');
window.jQuery = window.$;
window.api = 'http://localhost:4741'

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
