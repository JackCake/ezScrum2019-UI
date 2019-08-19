import React from "react";

// Import React Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class ViewRetrospective extends React.Component {
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
      <div>
      <BootstrapTable data={this.props.retrospectiveData}  selectRow={this.selectRow}  options={this.options} bordered={true} pagination={ true } striped hover condensed>
              <TableHeaderColumn dataField="sprintId" isKey hidden>Id</TableHeaderColumn>

               <TableHeaderColumn 
                  dataField="sprintOrderId"
                  width="10%"
                  dataSort={true}
                  columnTitle
              >
                  Sprint
              </TableHeaderColumn>    

              <TableHeaderColumn 
                  dataField="retrospectiveDiscussion"
                  width="90%"
                  dataSort={false}
                  columnTitle
              >
                  Retrospective Discussion
              </TableHeaderColumn>        
        </BootstrapTable>
      </div>
    );
  }
}

export default ViewRetrospective;