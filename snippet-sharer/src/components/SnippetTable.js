import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon';
const iconStyles = {
  marginRight: 24,
};

export const SnippetsTable = (props) => (
  <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
                <TableHeaderColumn style={{
    width: "150px"
  }}>Title</TableHeaderColumn>
                <TableHeaderColumn>Text</TableHeaderColumn>
                  <TableHeaderColumn style={{
    width: "100px"
  }}>
  <IconButton  onTouchTap={props.handleNewClick} >
    <FontIcon className="material-icons" style={iconStyles}  color={'#4ccb83'}>add_box</FontIcon>

  </IconButton>

                  </TableHeaderColumn>

            </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={true}>
            {props.children}
        </TableBody>
    </Table>
);
