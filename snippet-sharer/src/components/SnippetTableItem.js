import React from 'react';
import { TableRow, TableRowColumn as Col } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon';
const iconStyles = {
  marginRight: 24
};
export const SnippetItem = (props) => {
  let {text, title, _owner} = props.snippet;
  let isOwned = props.user && _owner === props.user._id
  let handleClick = () => props.clickHandle(props.snippet);
  let handleDelete = () => {
    props.deleteSnip(props.snippet)
  }
  return (
    <TableRow>
            <Col style={{
      width: "150px"
    }}>{title}</Col>
            <Col>{text}</Col>
            <Col style={{
      width: "120px"
    }}>
                <IconButton onTouchTap={handleClick}>
                    <FontIcon className="material-icons" style={iconStyles} color={'#6c9ff7'}>code</FontIcon>
                </IconButton>
                {isOwned ? <IconButton onTouchTap={handleDelete}>
                      <FontIcon className="material-icons" style={iconStyles} color={'#e86363'}>delete</FontIcon>
                  </IconButton> : null}
                  {isOwned ? <IconButton onTouchTap={handleClick}>
                        <FontIcon className="material-icons" style={iconStyles} color={'#6c9ff7'}>mode_edit</FontIcon>
                    </IconButton> : null}

            </Col>
        </TableRow>
  )
}
