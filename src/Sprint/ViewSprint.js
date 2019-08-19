import React from "react";

// Import React Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class ViewSprint extends React.Component {
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
    <BootstrapTable data={this.props.sprintData}  selectRow={this.selectRow}  options={this.options} bordered={true} pagination={ true } striped hover condensed>
        <TableHeaderColumn dataField="sprintId" isKey hidden>Id</TableHeaderColumn>
        
        <TableHeaderColumn 
            dataField="orderId"
            width="5%"
            dataSort={true}
            columnTitle
        >
            Id
        </TableHeaderColumn>

        <TableHeaderColumn 
            dataField="goal"
            width="40%"
            dataSort={false}
            columnTitle
        >
            Goal
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
            dataField="interval"
            width="10%"
            dataSort={true}
            columnTitle
        >
            Interval
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
            dataField="demoDate"
            width="12%"
            dataSort={true}
            columnTitle
        >
            Demo Date
        </TableHeaderColumn>              

        <TableHeaderColumn 
            dataField="demoPlace"
            width="15%"
            dataSort={false}
            columnTitle
        >
            Demo Place
        </TableHeaderColumn> 

        <TableHeaderColumn 
            dataField="daily"
            width="15%"
            dataSort={false}
            columnTitle
        >
           Daily Meeting
        </TableHeaderColumn>  
                        
    </BootstrapTable>
    );
  }
}

export default ViewSprint;