import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class ExpenseTableRow extends Component {
    constructor(props) {
        super(props);
        this.deletecart = this.deletecart.bind(this);
        this.onIncrease = this.onIncrease.bind(this);
        this.onDecrease = this.onDecrease.bind(this);
    }
    deletecart() {
        axios.delete('http://127.0.0.1:8000/api/deletecart/' + this.props.obj.id)
            .then((res) => {
                console.log('Expense removed deleted!');
                window.location.reload();
            }).catch((error) => {
                console.log(error)
        })
    }
    onIncrease(){
        let product_id =localStorage.getItem('product_id');
        fetch("http://127.0.0.1:8000/api/product/increase/" + this.props.obj.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS, DELETE, PATCH',
            'Authorization': product_id,
        },
        body: this.props.obj.id       
        }).then(response => {
        response.json().then((data) => {
            console.log(data);
            window.location.reload();
        });
        });
    }
    onDecrease(){
        let product_id =localStorage.getItem('product_id');
        fetch("http://127.0.0.1:8000/api/product/decrease/" + this.props.obj.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS, DELETE, PATCH',
            'Authorization': product_id,
        },
        body: this.props.obj.id       
        }).then(response => {
        response.json().then((data) => {
            console.log(data);
            window.location.reload();
        });
        });
    }
    render() {
        return (
            <div>
                <div class="product-flex">
                    <table>
                        <tr>
                            <td style={{paddingLeft: "5px", }}><img className="imageCheck" src={'http://127.0.0.1:8000/storage/' + this.props.obj.picture} /></td>
                            <td style={{paddingLeft: "20px", width: "150px"}}>{this.props.obj.ProductName}</td>
                            <td className="quantity-style"> &ensp;
                                <button onClick={this.onDecrease}>-</button>
                                &ensp;<span>{this.props.obj.CartQty}</span>&ensp;
                                <button onClick={this.onIncrease}>+</button>
                            </td>
                            <td style={{paddingLeft: "10px",}}>{this.props.obj.CartPrice} <span>VNĐ</span></td>
                            <td style={{paddingLeft: "20px", fontWeight: 600, fontStyle: "italic", width: "200px", paddingRight: "20px"}}>{this.props.obj.VendorName}</td>
                            <td style={{paddingRight: "5px"}}>
                            <Button onClick={this.deletecart} size="sm" variant="danger"><i class="fa fa-trash" aria-hidden="true"></i></Button></td>
                        </tr>
                    </table>
                </div>
                <hr className="hr-payment" />
            </div>
        );
    }
}