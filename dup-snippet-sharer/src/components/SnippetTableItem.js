import React from 'react';
import { TableRow, TableRowColumn as Col } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon';
const iconStyles = {
  marginRight: 24,
};
export const SnippetItem = (props) => {
  let {text, title} = props.snippet
  let handleClick = () => props.clickHandle(props.snippet)
  return (
    <TableRow>
        <Col style={{
      width: "150px"
    }}>{title}</Col>
        <Col>{text}</Col>
        <Col style={{
      width: "100px"
    }}>
    <IconButton  onTouchTap={handleClick} >
      <FontIcon className="material-icons" style={iconStyles}  color={'#6c9ff7'}>code</FontIcon></IconButton>
          </Col>
  </TableRow>
  )
}
