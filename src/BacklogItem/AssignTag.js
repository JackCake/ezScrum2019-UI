import React from 'react';
import axios from 'axios';
import { Button, Modal, Col, ControlLabel } from 'react-bootstrap';
import ViewAssignedTag from './ViewAssignedTag';

// Import React Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class AssignTag extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false, 
            tagData : []
        };

        this.options = {
            sortIndicator: true,
            noDataText: 'No data'
        };
        this.selectRow = {
            mode: 'checkbox',
            bgColor: 'skyblue',
            clickToSelect: true,
            hideSelectColumn: true,
            onSelect: props.handleRowSelect
        };

        this.getAllTag = this.getAllTag.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.updateSelectedTagRow = this.updateSelectedTagRow.bind(this);
    }

    getAllTag(){
        let self =this;
        axios.get('http://localhost:8080/ezScrum/products/' + this.props.selectedProduct.productId + '/tags')
        .then(function (response) {
            let tagList = response.data.tagList;
            self.setState({tagData : tagList});
        })
        .catch(function (error){
            console.log(error);
        });
    }

    handleShow(){
        this.setState({show : true});
        this.getAllTag();
    }

    handleClose(){
        this.setState({
            show : false,
            tagData : []
        });
    }

    updateSelectedTagRow(){
        this.selectRow.selected = this.props.tags.map(tag => tag.tagId);
    }

    render(){
        this.updateSelectedTagRow();
        return (
            <div>
                <Col componentClass={ControlLabel} sm={2}>
                    *Tags:
                </Col>
                <Col sm={8}>
                    <ViewAssignedTag tags={this.props.tags}/>
                </Col>
                <Col sm={2}>
                    <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.handleShow}>
                        <img src="../add.gif" alt="Assign Tag"/>
                    </Button>
                </Col>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Assign Tag</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <BootstrapTable data={this.state.tagData}  selectRow={this.selectRow}  options={this.options} bordered={true} pagination={ true } striped hover condensed>
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
                            width="90%"
                            dataSort={false}
                            columnTitle
                        >
                            Name
                        </TableHeaderColumn>
                    </BootstrapTable>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default AssignTag;