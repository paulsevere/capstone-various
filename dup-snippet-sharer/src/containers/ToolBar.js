import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { logOut } from '../actions/authentication'
class TopBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
      loginModal: false,
      signupModal: false
    };
  }

  notLogged = () => {
    return (
      <ToolbarGroup>
        <ToolbarSeparator/>
        <FlatButton label="login" onTouchTap={this.toggleLogin}/>
        <FlatButton label="signup" onTouchTap={this.toggleSignup}/>

        <IconMenu iconButtonElement={< IconButton touch={
      true
      } > <NavigationExpandMoreIcon/> < /IconButton>}>
            <MenuItem primaryText="Download"/>
            <MenuItem primaryText="More Info"/>
        </IconMenu>
    </ToolbarGroup>
    )
  }


  logged = () => {

    return (
      <ToolbarGroup>
      <ToolbarSeparator/>
      <FlatButton label="log out" onTouchTap={() => this.props.dispatch(logOut())}/>

      <IconMenu iconButtonElement={< IconButton touch={
      true
      } > <NavigationExpandMoreIcon/> < /IconButton>}>
          <MenuItem primaryText="Download"/>
          <MenuItem primaryText="More Info"/>
      </IconMenu>
  </ToolbarGroup>
    )
  }


  toggleLogin = () => {
    this.setState({
      loginModal: !this.state.loginModal
    })
  }
  toggleSignup = () => {
    this.setState({
      signupModal: !this.state.signupModal
    })
  }

  handleChange = (event, index, value) => this.setState({
    value
  });

  render() {
    return (
      <div>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                            <MenuItem value={1} primaryText="All Broadcasts"/>
                        </DropDownMenu>
                    </ToolbarGroup>
                    {this.props.user ? this.logged() : this.notLogged()}
                    </Toolbar>

                <LoginForm
      dispatch={this.props.dispatch}
      toggle={this.toggleLogin}
      error={this.props.error}

      open={this.state.loginModal && !this.props.user}>
                  </LoginForm>

                 <LoginForm
      dispatch={this.props.dispatch}
      toggle={this.toggleSignup}
      open={this.state.signupModal && !this.props.user}
      error={this.props.error}
      signUp={true}
      />

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
    user: state.user,
    error: state.error
  }
}

// <ToolbarGroup>
//     <ToolbarSeparator/>
//     <FlatButton label="login" onTouchTap={this.toggleLogin}/>
//     <FlatButton label="signup" onTouchTap={this.toggleSignup}/>
//
//     <IconMenu iconButtonElement={< IconButton touch={
// true
// } > <NavigationExpandMoreIcon/> < /IconButton>}>
//         <MenuItem primaryText="Download"/>
//         <MenuItem primaryText="More Info"/>
//     </IconMenu>
// </ToolbarGroup>
//
// <LoginModal title="sign up" toggle={this.toggleLogin} open={this.state.signupModal}>
//    <LoginForm signUp={true}/>
// </LoginModal>
// <LoginModal title="log in" toggle={this.toggleLogin} open={this.state.loginModal}>
//     <LoginForm/>
// </LoginModal>

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)
