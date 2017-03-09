import $ from 'jquery'

function getUser() {
    return window.store.getState().user
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
                dispatch({
                    type: 'ADD_SNIPPET',
                    snippet: snippet.snippet
                })
            })
            .catch(console.error)
    }
}

export const updateSnippet = (snippet, newSnippet) => {
    return function(dispatch) {
        $.ajax({
                method: 'PATCH',
                url: window.api + '/snippets/' + snippet._id,
                data: {
                    snippet: newSnippet
                },
                headers: {
                    Authorization: 'Token token=' + getUser().token
                }
            }).then(() => {
                let upd = Object.assign(snippet, newSnippet);
                dispatch({
                    type: 'UPDATE_SNIPPET',
                    snippet: upd
                })
            })
            .catch(console.error)
    }
}

export const deleteSnippet = (snippet) => {
    return function(dispatch) {
        $.ajax({
                method: 'DELETE',
                url: window.api + '/snippets/' + snippet._id,
                headers: {
                    Authorization: 'Token token=' + getUser().token
                }
            }).then(() => {
                dispatch({
                    type: 'DELETE_SNIPPET',
                    snippet: snippet
                })
            })
            .catch(console.error)
    }
}
