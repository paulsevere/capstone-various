import $ from 'jquery'
function getUser() {
  return JSON.parse(window.localStorage.getItem('user'))
}
export const getSnippets = () => {
  return function(dispatch) {
    $.ajax({
      method: 'GET',
      url: window.api + '/snippets'

    }).then((snippets) => {
      dispatch({
        type: 'SET_SNIPPETS',
        snippets: snippets.snippets
      })
    })
  // .catch(err => dispatch(authError(err)))
  }
}


export const postSnippet = (snippet) => {
  return function(dispatch) {
    $.ajax({
      method: 'POST',
      url: window.api + '/snippets',
      data: {
        snippet
      },
      headers: {
        Authorization: 'Token token=' + getUser().token
      }
    }).then((snippet) => {
      console.log(snippet)
      dispatch({
        type: 'ADD_SNIPPET',
        snippet: snippet.snippet
      })
    })
      .catch(console.error)
  }
}

window.postSnippet = postSnippet;
window.getSnippets = getSnippets
