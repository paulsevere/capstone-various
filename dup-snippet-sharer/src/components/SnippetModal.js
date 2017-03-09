import React from 'react';
import Dialog from 'material-ui/Dialog';
import Editor from './EditorComponent'
import FlatButton from 'material-ui/FlatButton'







export default class SnippetModal extends React.Component {
  constructor(props) {
    super(props);
    this.cool = "rad"
    this.state = {
      open: false
    }
  }
  render() {
    let {user, snippet, fresh} = this.props;
    const openActions = [
      <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={this.props.handleClose}
      />,
      <FlatButton
      label="Submit"
      primary={true}
      onTouchTap={this.props.handleSubmit}
      />,
    ];
    const ownerActions = [
      <FlatButton
      label="Delete"
      primary={true}
      onTouchTap={this.props.handleClose}
      />,
      <FlatButton
      label="Update"
      primary={true}
      onTouchTap={this.props.handleClose}
      />,
    ];
    let actions;
    if (snippet && user && user.id && user.id === snippet._owner) {
      actions = openActions.concat(ownerActions)
    } else {
      actions = openActions
    }

    return (
      <Dialog
      open={!!snippet}
      actions={actions}
      onRequestClose={this.props.handleClose}
      >
        <Editor editable={fresh || (snippet && user && user.id === snippet._owner)} onTitleChange={this.props.onTitleChange} onEditorChange={this.props.onEditorChange} snippet={snippet} />
       </Dialog>
    )
  }
}
