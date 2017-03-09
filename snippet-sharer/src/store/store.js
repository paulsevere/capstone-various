import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'
// import { snippetsReducer } from './snippets_reducer';


function findByIdAndUpdate(arr, item) {
  return arr.map(el => {
    if (el._id === item._id) {
      return item
    } else {
      return el
    }
  })
}




let snippets = function(state = [], action) {
  switch (action.type) {
    case 'SET_SNIPPETS':
      return action.snippets
    case 'ADD_SNIPPET':
      return state.concat(action.snippet)
    case 'DELETE_SNIPPET':
      return state.filter(snip => snip._id !== action.snippet._id)
    case 'UPDATE_SNIPPET':
      return findByIdAndUpdate(state, action.snippet)
    default:
      return state
  }
}
let user = function(state = null, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      window.localStorage.setItem('user', JSON.stringify(action.user))
      return action.user
    case 'USER_LOGOUT':
      window.localStorage.setItem('user', null);
      return null

    default:
      return state
  }
}

let error = function(state = {
    auth: null
  }, action) {
  let easy = obAssign(state);
  switch (action.type) {
    case 'AUTH_ERROR':
      return easy('auth', action.error)
    default:
      return state
  }
}


let app = combineReducers({
  snippets,
  user,
  error
})


//
function obAssign(state) {
  return function(field, value) {
    let updatedStateSlice = {};
    updatedStateSlice[field] = value;
    return Object.assign({}, state, updatedStateSlice)
  }
}


let store = createStore(app, applyMiddleware(thunk));

window.store = store;

export default store;
