import React from "react";

// Import React Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class ViewRelease extends React.Component {
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
            onSelect: props.handleReleaseRowSelect
        };
      }

  render() {
    return (
    <BootstrapTable data={this.props.releaseData}  selectRow={this.selectRow}  options={this.options} bordered={true} pagination={ true } striped hover condensed>
        <TableHeaderColumn dataField="releaseId" isKey hidden>Id</TableHeaderColumn>
        
        <TableHeaderColumn 
            dataField="orderId"
            width="5%"
            dataSort={true}
            columnTitle
        >
            Id
        </TableHeaderColumn>

        <TableHeaderColumn 
            dataField="name"
            width="40%"
            dataSort={false}
            columnTitle
        >
            Name
        </TableHeaderColumn>  

        <TableHeaderColumn 
            dataField="startDate"
            width="12%"
            dataSort={true}
            columnTitle
        >
            Start Date
        </TableHeaderColumn>  

        <TableHeaderColumn 
            dataField="endDate"
            width="12%"
            dataSort={true}
            columnTitle
        >
            End Date
        </TableHeaderColumn>           

        <TableHeaderColumn 
            dataField="description"
            width="40%"
            dataSort={false}
            columnTitle
        >
            Description
        </TableHeaderColumn> 
                        
    </BootstrapTable>
    );
  }
}

export default ViewRelease;