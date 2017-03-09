import React from 'react';
import { connect } from 'react-redux';
import { getSnippets, postSnippet, deleteSnippet, updateSnippet } from '../actions/snippets'
import { SnippetsTable } from '../components/SnippetTable'
import { SnippetItem } from '../components/SnippetTableItem'
import SnippetModal from '../components/SnippetModal'


class Snippets extends React.Component {
  constructor(props) {
    super(props);
    this.cool = "fun";
    this.props.dispatch(getSnippets())
    this.state = {
      selected: null,
      newSnippet: false,

    }
    this.newText = ' '
    this.newTitle = ' '
  }

  componentWillUpdate() {
    this.newText = ' '
    this.newTitle = ' '
  }

  componentWillReceiveProps() {
    this.setState({
      selected: null,
      newSnippet: null
    })
  }

  handleMoreClick=(snippet) => {
    this.setState({
      selected: snippet
    })
  }

  handleNewClick=() => {
    this.setState({
      newSnippet: {
        text: '',
        title: '',
        _owner: null
      }
    })
  }

  updateText = (newText) => {
    this.newText = newText
  }

  updateTitle = (newTitle) => {
    this.newTitle = newTitle;
  }

  handleModalClose = () => {
    this.setState({
      selected: null
    })
  }

  handleFreshModalClose = () => {
    this.setState({
      newSnippet: false
    })
  }

  handleFreshModalSubmit = () => {
    this.props.dispatch(postSnippet({
      title: this.newTitle,
      text: this.newText
    }))
  }


  doDeleteSnippet = () => {
    this.props.dispatch(deleteSnippet(this.state.selected))
  }

  deleteFromTable = (snipp) => {
    this.props.dispatch(deleteSnippet(snipp))
  }

  doUpdateSnippet = () => {
    let updSnip = {};
    if (this.newText.length > 3) {
      updSnip.text = this.newText
    }
    if (this.newTitle.length > 2) {
      updSnip.title = this.newTitle
    }

    this.props.dispatch(updateSnippet(this.state.selected, updSnip))
  }



  render() {
    let {snippets, user} = this.props;
    return (
      <div>
      <SnippetsTable handleNewClick={this.handleNewClick}>
        {snippets.map(snip => {
        return (<SnippetItem deleteSnip={this.deleteFromTable} user={user} key={snip.id} clickHandle={this.handleMoreClick} snippet={snip}/>)
      })}
      </SnippetsTable>

    <SnippetModal user={user} onEditorChange={this.updateText} handleClose={this.handleModalClose}  snippet={this.state.selected} deleteSnippet={this.doDeleteSnippet}  updateSnippet={this.doUpdateSnippet}     onTitleChange={this.updateTitle}/>

    <SnippetModal fresh={true} user={user}
      deleteSnippet={this.doDeleteSnippet}
      onEditorChange={this.updateText}
      handleClose={this.handleFreshModalClose}
      handleSubmit={this.handleFreshModalSubmit}
      snippet={this.state.newSnippet}
      onTitleChange={this.updateTitle}
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
    snippets: state.snippets,
    user: state.user
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Snippets)
