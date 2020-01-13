import React from 'react';
import { Badge } from 'react-bootstrap';

class ViewAssignedTag extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            tags : []
        };

        this.composeTags = this.composeTags.bind(this);
    }

    composeTags(){
        let tags = [];
        for(var i = 0; i < this.props.tags.length; i++){
            let tag = this.props.tags[i];
            if(i > 0){
                tags.push("、");
            }
            tags.push(<Badge key={"tag_" + tag.orderId}><h5>{tag.name}</h5></Badge>);
        }
        return tags;
    }

    render(){
        let tags = this.composeTags();
        return (
            <div>
                {tags}
            </div>
        );
    }
}

export default ViewAssignedTag;