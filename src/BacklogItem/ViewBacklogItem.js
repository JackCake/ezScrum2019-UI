import React from "react";

// Import React Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class ViewBacklogItem extends React.Component {
  constructor(props) {
    super(props);
    this.options = {
        sortIndicator: true,
        noDataText: 'No data'
    };
    this.selectRow = {
        mode: 'radio',
        bgColor: 'skyblue',
        clickToSelect: true,
        hideSelectColumn: true,
        onSelect: props.handleRowSelect
    };
  }

  render() {

    return (
        <BootstrapTable data={this.props.backlogItemData}  selectRow={this.selectRow}  options={this.options} bordered={true} pagination={ true } striped hover condensed>
        <TableHeaderColumn dataField="backlogItemId" isKey hidden>Id</TableHeaderColumn>
        
        <TableHeaderColumn 
            dataField="orderId"
            width="5%"
            dataSort={true}
            columnTitle
        >
            Id
        </TableHeaderColumn>

        <TableHeaderColumn 
            dataField="description"
            width="40%"
            dataSort={false}
            columnTitle
        >
            Description
        </TableHeaderColumn>

        <TableHeaderColumn 
            dataField="estimate"
            width="10%"
            dataSort={true}
            columnTitle
        >
            Estimate
        </TableHeaderColumn>  

        <TableHeaderColumn 
            dataField="importance"
            width="12%"
            dataSort={true}
            columnTitle
        >
            Importance
        </TableHeaderColumn>   

        <TableHeaderColumn 
            dataField="releaseOrderId"
            width="10%"
            dataSort={true}
            columnTitle
        >
            Release
        </TableHeaderColumn> 

        <TableHeaderColumn 
            dataField="sprintOrderId"
            width="10%"
            dataSort={true}
            columnTitle
        >
            Sprint
        </TableHeaderColumn>  

        <TableHeaderColumn 
            dataField="status"
            width="8%"
            dataSort={true}
            columnTitle
        >
            Status
        </TableHeaderColumn>              

        <TableHeaderColumn 
            dataField="notes"
            width="30%"
            dataSort={false}
            columnTitle
        >
            Notes
        </TableHeaderColumn>                 
    </BootstrapTable>
    );
  }
}

export default ViewBacklogItem;