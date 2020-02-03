import React from 'react';
import axios from 'axios';
import { Button, Modal, Row, ControlLabel } from 'react-bootstrap';
import Config from '../config.js';
import AddTag from './AddTag.js';
import DeleteTag from './DeleteTag.js'
import ViewTag from './ViewTag.js';

class Tag extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false, 
            selectedTag : undefined, 
            tagData : []
        };

        this.getAllTag = this.getAllTag.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
    }

    getAllTag(){
        let self =this;
        axios.get(Config.back_end_host + Config.ezScrum_api + '/products/' + this.props.selectedProduct.productId + '/tags')
        .then(function (response) {
            let tagList = response.data.tagList;
            let selectedTag = self.state.selectedTag;
            if(selectedTag !== undefined){
                let selectedTagList = tagList.filter(function(tag){
                    return tag.tagId === selectedTag.tagId;
                });
                if(selectedTagList.length === 0){
                    self.setState({selectedTag : undefined});
                }else{
                    self.setState({selectedTag : selectedTagList[0]});
                }
            }
            self.setState({tagData : tagList});
        })
        .catch(function (error){
            console.log(error);
            window.location.href = Config.front_end_host;
        });
    }

    handleShow(){
        this.setState({show : true});
        this.getAllTag();
    }

    handleClose(){
        this.setState({
            show : false, 
            tagList : []
        });
    }

    handleRowSelect(row, isSelected) {
        if (isSelected) {
            this.setState({selectedTag: row});
        } else {
          this.setState({selectedTag: undefined});
        }
    }

    render(){
        return (
            <div>
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.handleShow}>
                    <img src="../magic-wand.png" alt="Manage Tag"/>Manage Tag
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Manage Tag</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <AddTag getAllTag={this.getAllTag} tagData={this.state.tagData} selectedProduct={this.props.selectedProduct}/>
                        </Row>
                        <Row componentClass={ControlLabel}>
                            (Hint: click the name of the tag in the table to edit)
                        </Row>
                        <Row>
                            <DeleteTag getAllTag={this.getAllTag} selectedTag={this.state.selectedTag}/>
                        </Row>
                        <Row>
                            <ViewTag getAllTag={this.getAllTag} tagData={this.state.tagData} handleRowSelect={this.handleRowSelect}/>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Tag;