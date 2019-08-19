import React from 'react';
import axios from 'axios';
import AddProduct from './AddProduct.js';
import EditProduct from './EditProduct.js';
import ViewProduct from './ViewProduct.js';
import DeleteProduct from './DeleteProduct';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class Product extends React.Component {
  constructor(){
    super();
    this.state = {
      selectedProduct : undefined,
      productData : []
    };
    this.getProductsByUserId = this.getProductsByUserId.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.goIntoProduct = this.goIntoProduct.bind(this);
    this.getProductsByUserId();
  }

  getProductsByUserId(){
    let self =this;
    axios.get('http://localhost:8080/ezScrum/products')
    .then(function (response) {
      let productList = response.data.productList;

      let selectedProduct = self.state.selectedProduct;
      if(selectedProduct !== undefined){
          let selectedProductList = productList.filter(function(product){
            return product.productId === selectedProduct.productId;
          });
          if(selectedProductList === []){
            self.setState({selectedProduct : undefined});
          }else{
            self.setState({selectedProduct : selectedProductList[0]});
          }
      }
      self.setState({productData : productList});
    })
    .catch(function (error){
        console.log(error);
    });
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
        this.setState({selectedProduct: row});
    } else {
      this.setState({selectedProduct: undefined});
    }
  }

  goIntoProduct() {
    if(this.state.selectedProduct){
      let data = {selectedProduct: this.state.selectedProduct};
      let path = {
        pathname: '/ViewProduct', 
        state: data
      }
      this.props.history.push(path);
      return <Redirect to={path}/>
    }
  }

  render() {
    return (
      <div>
        <div style = {{display : 'flex'}}>
          <AddProduct getProductsByUserId={this.getProductsByUserId}/>
          <EditProduct getProductsByUserId={this.getProductsByUserId} selectedProduct={this.state.selectedProduct}/>
          <DeleteProduct getProductsByUserId={this.getProductsByUserId} selectedProduct={this.state.selectedProduct}/>
          <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.goIntoProduct}>Go Into Product</Button>
        </div>
        <ViewProduct productData={this.state.productData} handleRowSelect={this.handleRowSelect}/>
      </div>
    );
  }
}

export default Product;
