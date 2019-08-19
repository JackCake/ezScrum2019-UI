import React from "react";

// Import React Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class ViewProduct extends React.Component {
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
        <BootstrapTable data={this.props.productData}  selectRow={this.selectRow}  options={this.options} bordered={true} pagination={ true } striped hover condensed>
        <TableHeaderColumn dataField="productId" isKey hidden>Id</TableHeaderColumn>
        
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
            width="95%"
            dataSort={false}
            columnTitle
        >
            Name
        </TableHeaderColumn>                
    </BootstrapTable>
    );
  }
}

export default ViewProduct
