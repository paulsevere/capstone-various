import $ from 'jquery'
export const signupAttempt = (creds) => {
  return function(dispatch) {
    $.ajax({
      method: 'POST',
      url: window.api + '/sign-up',
      data: {
        credentials: creds
      }
    }).then(() => {
      dispatch(loginAttempt(creds))
      dispatch(authError(null))
    })
      .catch(err => dispatch(authError(err)))
  }
}

function getUser() {
  return JSON.parse(window.localStorage.getItem('user'))
}

export const logOut = (user) => {
  return function(dispatch) {
    $.ajax({
      method: 'DELETE',
      url: window.api + '/sign-out/' + getUser().id,
      headers: {
        Authorization: 'Token token=' + getUser().token
      }

    }).then(() => dispatch({
      type: "USER_LOGOUT"
    }))
  }
}



function authError(error, dispatch) {
  return {
    type: 'AUTH_ERROR',
    error
  }
}



export function loginAttempt(creds) {
  return function(dispatch) {
    $.ajax({
      method: 'POST',
      url: window.api + '/sign-in',
      data: {
        credentials: creds
      }
    }).then(user => {
      dispatch({
        type: 'USER_LOGIN',
        user: user.user
      });
      dispatch(authError(null))

    })
      .catch(err => dispatch(authError(err)))

  }
}

window.logOut = logOut
window.loginAttempt = loginAttempt
