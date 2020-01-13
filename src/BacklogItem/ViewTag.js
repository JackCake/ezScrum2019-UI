import React from "react";

// Import React Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import EditTag from './EditTag';

class ViewTag extends React.Component {
  constructor(props) {
    super(props);
    this.options = {
        sortIndicator: true,
        noDataText: 'No data'
    };
    this.selectRow = {
      mode: 'radio',
      onSelect: props.handleRowSelect
    };
    this.cellEdit = {
      mode: 'click'
    }
  }

  render() {

    return (
        <BootstrapTable data={this.props.tagData}  selectRow={this.selectRow}  options={this.options} bordered={true} pagination={ true } cellEdit={this.cellEdit} striped hover condensed>
        <TableHeaderColumn dataField="tagId" isKey hidden>Id</TableHeaderColumn>

        <TableHeaderColumn 
            dataField="orderId"
            width="10%"
            dataSort={true}
            columnTitle
        >
            Id
        </TableHeaderColumn>

        <TableHeaderColumn 
            dataField="name"
            customEditor={{ getElement: (onUpdate, props) => (<EditTag getAllTag={this.props.getAllTag} onUpdate={onUpdate} {...props}/>)}}
            width="90%"
            dataSort={false}
            columnTitle
        >
            Name
        </TableHeaderColumn>
    </BootstrapTable>
    );
  }
}

export default ViewTag;