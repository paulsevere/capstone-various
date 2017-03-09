
/**
*
* TextEditor
*
*/

import React from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, push } from 'draft-js';
import { BlockStyleControls, InlineStyleControls } from './subcomponents/RichStyles'
import io from 'socket.io-client'
import './TextEditor.scss'
window.EditorState = EditorState
class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    window.edit = () => this.state;
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.socket = io('http://localhost:3001')
    this.socket.on('new-content-state', state => {
      let nstate = EditorState.push(this.state.editorState, convertFromRaw(state.contentState), state.changeType)
      this.setState({
        editorState: nstate
      })
    })
    this.focus = () => this.refs.editor.focus()

    this.onChange = (editorState) => {
      // this.socket.emit('test', {
      //   contentState: editorState.getCurrentContent(),
      //   changeType: editorState.getLastChangeType()
      // })
      this.socket.emit('push-content-state', {
        contentState: convertToRaw(editorState.getCurrentContent()),
        changeType: editorState.getLastChangeType()
      })


      // console.log(convertToRaw(editorState.getCurrentContent()))
      this.setState({
        editorState
      })
    };



  }
  blockStyleToggle = (blockType) => {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }
  inlineStyleToggle = (inlineStyle) => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }
  render() {
    return (
      <div onClick = {this.focus} className="editor-holder">
        <div className="editor-inner">
          <BlockStyleControls {...this.state} onToggle={this.blockStyleToggle}/>
            <InlineStyleControls {...this.state} onToggle={this.inlineStyleToggle}/>

        <Editor
      placeholder="Tell a story..."
      ref="editor" editorState={this.state.editorState} onChange={this.onChange} />
        </div>
      </div>
      );
  }
}

export default TextEditor;
