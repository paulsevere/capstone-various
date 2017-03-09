import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { connect } from 'react-redux'

import LoginModal from '../components/Login'

class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton label="login" onTouchTap={this.props.toggle} />
      );
  }
}

const Logged = (props) => (
  <IconMenu
  {...props}
  iconButtonElement={
  <IconButton><MoreVertIcon /></IconButton>
  }
  targetOrigin={{
    horizontal: 'right',
    vertical: 'top'
  }}
  anchorOrigin={{
    horizontal: 'right',
    vertical: 'top'
  }}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class Nav extends Component {
  state = {
    logged: true,
    loginModal: false
  };

  handleChange = (event, logged) => {
    this.setState({
      logged: logged
    });
  };

  toggleLogin = () => {
    this.setState({
      loginModal: !this.state.loginModal
    })
  }

  render() {
    let {toggleLogin} = this;
    // let {user} = this.props;
    return (
      <div>
        <AppBar
      title="snippet sharer"
      iconElementRight={
      this.props.user ?
        <Logged />
        : <FlatButton label="login/signup" onTouchTap={toggleLogin}/>
      }
      />
    <LoginModal toggle={toggleLogin} open={this.state.loginModal}/>
      </div>
      );
  }
}





function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}


function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
