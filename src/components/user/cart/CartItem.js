import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class ExpenseTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteExpense = this.deleteExpense.bind(this);
    }

    deleteExpense() {
        axios.delete('http://127.0.0.1:8000/api/expenses/' + this.props.obj.id)
            .then((res) => {
                console.log('Expense removed deleted!')
            }).catch((error) => {
                console.log(error)
            })
    }
    render() {
        return (
            <div>
                <div class="product-flex">
                    <table>
                        <tr>
                            <td style={{paddingLeft: "5px", }}><img className="imageCheck" src={'http://127.0.0.1:8000/storage/' + this.props.obj.picture} /></td>
                            <td style={{paddingLeft: "20px", width: "150px"}}>{this.props.obj.ProductName}</td>
                            <td style={{paddingLeft: "10px",}}>{this.props.obj.price} <span>VNĐ</span></td>
                            <td style={{paddingLeft: "20px", fontWeight: 600, fontStyle: "italic", width: "200px"}}>{this.props.obj.VendorName}</td>
                            <td style={{paddingRight: "5px"}}>
                            {/* <Link className="edit-link" to={"/edit-expense/" + this.props.obj.id}>
                                <Button size="sm" variant="info">Edit</Button>
                                </Link> */}
                                <Button onClick={this.deleteExpense} size="sm" variant="danger"><i class="fa fa-trash" aria-hidden="true"></i></Button></td>
                        </tr>
                    </table>

                </div>
                <hr className="hr-payment" />
            </div>
            
        );
    }
}