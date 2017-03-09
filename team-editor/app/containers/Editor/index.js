/*
 *
 * Editor
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectEditor from './selectors';
import TextEditor from '../../components/TextEditor'
export class Editor extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <TextEditor/>
      </div>
      );
  }
}

const mapStateToProps = selectEditor();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
