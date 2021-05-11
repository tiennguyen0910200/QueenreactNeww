import React, { Component } from 'react';
import "./Checkout.css";
import axios from 'axios';
import CartItem from './CartItem';
import { withRouter } from 'react-router';
import UserRow from './CartItem';
import ExpenseTableRow from './CartItem';
class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carts: [],
            total: [],
            totalPrice: [],
            order: [],
            expenses: []
        }
        var id = props.match.params.id;
        // let product_id= localStorage.getItem('product_id');
        // this.getData(product_id);
        this.getAllProducts();
        this.getTotalPrice();
        this.getTotalProduct();
        this.onOrderSubmit = this.onOrderSubmit.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

    }
    getAllProducts() {
        fetch("http://127.0.0.1:8000/api/cart")
            .then(response => {
                response.json().then((data) => {
                    console.log(data);
                    this.setState({
                        carts: data
                    })
                });
            });
    }
    getTotalPrice() {
        fetch("http://127.0.0.1:8000/api/totalPrice")
            .then(response => {
                response.json().then((data) => {
                    console.log(data);
                    this.setState({
                        totalPrice: data
                    })
                });
            });
    }
    getTotalProduct() {
        fetch("http://127.0.0.1:8000/api/totalProduct")
            .then(response => {
                response.json().then((data) => {
                    console.log(data);
                    this.setState({
                        total: data
                    })
                });
            });
    }
    onOrderSubmit(event) {
        event.preventDefault();
        let user_id = localStorage.getItem("idUser");
        // var id = this.props.match.params.id;

        let name = event.target["name"].value;
        let phone = event.target["phone"].value;
        let address = event.target["address"].value;
        let order_time = event.target["order_time"].value;
        let note = event.target["note"].value;

        let order = {
            // id: id,
            name: name,
            phone: phone,
            address: address,
            order_time: order_time,
            note: note,
            user_id: user_id
        }
        let postInJson = JSON.stringify(order);
        // localStorage.setItem("order_list", order.id);
        // console.log("order_list");
        fetch("http://127.0.0.1:8000/api/product/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: postInJson
        })
            .then(response => {
                localStorage.setItem("order_list",order.name);
                console.log("order_list");
                // console.log(order);
                // // window.location.reload();
                // alert('Xác nhận đơn hàng');
                // this.props.history.push('/home/payment');
                response.json().then((order) => {
                    console.log(order);
                    alert('Xác nhận đơn hàng');
                    this.props.history.push('/home/payment');
                });
            });
    }
    deleteItem(item) {
        return (event) => {
          let product_id =localStorage.getItem('product_id');
          fetch("http://127.0.0.1:8000/api/deletecart/" + item, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': product_id,
            }
          }).then(response => {
            response.json().then((data) => {
            //   this.getData(product_id);
            });
          });
        }
      }
      componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/expenses/')
          .then(res => {
            this.setState({
              expenses: res.data
            });
          })
          .catch((error) => {
            console.log(error);
          })
      }
    
      DataTable() {
        return this.state.expenses.map((res, i) => {
          return <ExpenseTableRow obj={res} key={i} />;
        });
      }
    render() {
        let totalProduct = this.state.total;
        let totals = totalProduct.length;
        let totalPrice = this.state.totalPrice;
        return (
            <div>
                <div className="wrapper">
                    <div classNameName="container">
                        <div className="flexKhung">
                            <div className="khungInfo">
                                <div class="panel-info">
                                    <div className="panel-heading1">
                                        <h3 className="title-Checkout">
                                            <b>Đơn hàng</b>
                                        </h3>
                                    </div>
                                    <h4 className="strong-titleCheck"><b> Danh sách dịch vụ </b></h4>
                                    <hr className="hr-payment" />
                                    {/* {this.state.carts.map((cart, index) =>
                                        <div>
                                            <div class="product-flex">
                                                <table>
                                                    <tr>
                                                        <td style={{paddingLeft: "5px", }}><img className="imageCheck" src={'http://127.0.0.1:8000/storage/' + cart.picture} /></td>
                                                        <td style={{paddingLeft: "20px", width: "150px"}}>{cart.ProductName}</td>
                                                        <td style={{paddingLeft: "10px",}}>{cart.price} <span>VNĐ</span></td>
                                                        <td style={{paddingLeft: "20px", fontWeight: 600, fontStyle: "italic", width: "200px"}}>{cart.VendorName}</td>
                                                        <td style={{paddingRight: "5px"}}><button className="button-delete"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
                                                    </tr>
                                                </table>

                                            </div>
                                            <hr className="hr-payment" />
                                        </div>
                                    )} */}
                                     {this.DataTable()}
                                                           
                                    <div class="product-flex">
                                        <div>
                                            <strong>Số đơn hàng</strong>
                                        </div>
                                        <div>
                                            <strong>
                                                <b>
                                                    {totals} <span>Đơn</span>
                                                </b>
                                            </strong>
                                        </div>
                                    </div><br />
                                    <div class="product-flex">
                                        <div>
                                            <strong>Tổng đơn hàng</strong>
                                        </div>
                                        <div>{this.state.totalPrice.map((total, index) =>
                                            <strong>
                                                <b>
                                                    {total.sumPrice} <span>VNĐ</span>
                                                </b>
                                            </strong>)}
                                        </div>
                                    </div>

                                </div>

                            </div>
                            {/* Địa chỉ giao hàng */}
                            <div className="khungInfo">
                                <div className="panel-info">
                                    <div className="panel-heading1">
                                        <h3 className="title-Checkout">
                                            <b>Địa chỉ</b>
                                        </h3>
                                    </div>
                                    <h4 className="strong-titleCheck"> <b>Địa chỉ giao hàng </b></h4>
                                    <div className="panel-body">
                                        <form method="POST" onSubmit={this.onOrderSubmit} action="">
                                            <div>
                                                <div>
                                                    <strong className="strong-titleCheck">Tên của bạn <span className="required">(*)</span></strong>
                                                </div>
                                                <div>
                                                    <input
                                                        className="form-input-checkout" id="name" type="text" name="name"
                                                        placeholder="Tên của bạn.." required
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <strong className="strong-titleCheck">Số điện thoại <span className="required">(*)</span></strong>
                                                </div>
                                                <div>
                                                    <input
                                                        className="form-input-checkout" id="phone" name="phone" type="number"
                                                        placeholder="Số điện thoại của bạn.." required type="number"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <strong className="strong-titleCheck">Địa chỉ  <span className="required">(*)</span></strong>
                                                </div>
                                                <div>
                                                    <input
                                                        className="form-input-checkout" id="address" name="address" type="text"
                                                        placeholder="Địa chỉ của bạn.." required
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <strong className="strong-titleCheck">Thời gian giao hàng  <span className="required">(*)</span></strong>
                                                </div>
                                                <div>
                                                    <input className="form-input-checkout" type="date" id="order_time" name="order_time" required />
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <strong className="strong-titleCheck">Ghi chú</strong>
                                                </div>
                                                <div>
                                                    <textarea
                                                        className="form-input-checkout" id="note" name="note" type="text"
                                                        placeholder="Ghi chú.."
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <button className="btn-Checkout" type="submit"><b>Tiếp tục </b></button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Checkout);