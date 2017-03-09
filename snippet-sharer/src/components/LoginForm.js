import React from 'react';
import TextField from 'material-ui/TextField';
// import FlatButton from 'material-ui/FlatButton';
import LoginModal from './LoginModal';
import { loginAttempt, signupAttempt } from '../actions/authentication'

export default class LoginForm extends React.Component {

  submit = () => {
    let {dispatch} = this.props;
    let {password, email} = this.refs
    let creds = {
      password: password.getValue(),
      email: email.getValue()
    }
    if (this.props.signUp) {
      dispatch(signupAttempt(creds))
    } else {
      dispatch(loginAttempt(creds))
    }
  }

  err = () => {
    let authErr = this.props.error.auth;
    let style = {
      backgroundColor: "#E57373",
      borderRadius: "5px",
      position: "absolute",
      top: "10px",
      right: "10px",
      padding: "20px"
    }
    if (authErr) {
      return (<div style={style}>{authErr.statusText}</div>)
    } else {
      return null
    }
  }

  render() {
    let {props} = this;
    return (
      <LoginModal
      toggle={props.toggle}
      submit={this.submit}

      open={props.open}>
        <div>
      <TextField
      ref="email"
      floatingLabelText="email"
      />
  <br/>
      <TextField
      floatingLabelText="password"
      ref="password"
      />
  <br/>
    { props.signUp ?
        <TextField
        floatingLabelText="confirm password"
        ref="password_confirmation"
        />
        : null
      }
      <br/>
      {this.err()}
      </div>
      </LoginModal>


    )
  }
}
