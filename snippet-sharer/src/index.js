import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
window.$ = require('jquery');
window.jQuery = window.$;
window.api = 'https://snippet-server-app.herokuapp.com'

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
