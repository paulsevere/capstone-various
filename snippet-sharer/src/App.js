import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './containers/MuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

//
// Containters
//
import Snippets from './containers/Snippets';
import ToolBar from './containers/ToolBar'




class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme()}>
      <div className="App">
        <ToolBar/>
        <div className="snippets-holder">
        <Snippets/>
        </div>
      </div>
    </MuiThemeProvider>
  </Provider>
      );
  }
}

export default App;
