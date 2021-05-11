import React, { Component } from 'react';
import "./Checkout.css";
import axios from 'axios';
import ReactDOM from 'react-dom';
import CartItem from './CartItem';
import { withRouter } from 'react-router';

class Checkout2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carts: [],
            total: [],
            totalPrice: [],
            order: [],
            isOrdered: false,
            formSubmitting: false,
            orders: {
                name: '',
                phone: '',
                address: '',
                order_time: '',
                note: '',
                user_id: ''
            },
            redirect: props.redirect,
        }
        // var id = props.match.params.id;
        this.getAllProducts();
        this.getTotalPrice();
        this.getTotalProduct();
        this.onOrderSubmit = this.onOrderSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleOrderTime = this.handleOrderTime.bind(this);
        this.handleNote = this.handleNote.bind(this);

        // this.deleteItem = this.deleteItem.bind(this);

    }
    componentWillMount() {
        let state = localStorage["orderState"];
        if (state) {
            let OrderState = JSON.parse(state);
            this.setState({ isOrder: OrderState.isOrder, orders: OrderState });
        }
        if (this.state.isOrdered) {
            return this.props.history.push("/");
        }
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
    onOrderSubmit(e) {
        e.preventDefault();
        this.setState({ formSubmitting: true });
        ReactDOM.findDOMNode(this).scrollIntoView();
        let orderData = this.state.orders;
        axios.post("http://127.0.0.1:8000/api/product/order", orderData
            )
            .then(response => {
                return response;
            }).then(json => {
                if (json.data.success) {
                    let user_id = localStorage.getItem("idUser");
                    let orderData = {
                        id: json.data.id,
                        name: json.data.name,
                        phone: json.data.phone,
                        address: json.data.address,
                        order_time: json.data.order_time,
                        note: json.data.note,
                        user_id: json.data.user_id
                    };
                    let orderState = {
                        isOrdered: true,
                        orders: orderData
                    };
                    localStorage["orderState"] = JSON.stringify(orderState);
                    this.setState({
                        isOrdered: orderState.isOrdered,
                        orders: orderState.orders,
                    });
                    alert('Xác nhận đơn hàng');
                    this.props.history.push('/home/payment');
                } 
            })
            
    }
    handleName(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            orders: {
                ...prevState.orders, name: value
            }
        }));
    }
    handleNumber(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            orders: {
                ...prevState.orders, phone: value
            }
        }));
    }
    // 2.5
    handleAddress(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            orders: {
                ...prevState.orders, address: value
            }
        }));
    }
    handleOrderTime(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            orders: {
                ...prevState.orders, order_time: value
            }
        }));
    }
    handleNote(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            orders: {
                ...prevState.orders, note: value
            }
        }));
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
                                    {this.state.carts.map((cart, index) =>
                                        <div>
                                            <div class="product-flex">
                                                {/* <div>
                                                    <img className="imageCheck" src={'http://127.0.0.1:8000/storage/' + cart.picture} />
                                                </div>
                                                <div style={{float: "left", margin: "10px"}}>{cart.ProductName}</div>
                                                <div style={{float: "left" , margin: "10px"}}>
                                                    {cart.price} <span>VNĐ</span>
                                                </div>
                                                <div style={{float: "left", margin: "10px"}}>{cart.VendorName}</div>
                                                <div>
                                                    <button className="button-delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                                </div> */}
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
                                    )}
                                                           
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
                                                        placeholder="Tên của bạn.." required onChange={this.handleName} 
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
                                                        placeholder="Số điện thoại của bạn.." required type="number" onChange={this.handleNumber}
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
                                                        placeholder="Địa chỉ của bạn.." required onChange={this.handleAddress}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <strong className="strong-titleCheck">Thời gian giao hàng  <span className="required">(*)</span></strong>
                                                </div>
                                                <div>
                                                    <input className="form-input-checkout" type="date" id="order_time" name="order_time"  onChange={this.handleOrderTime} required />
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <strong className="strong-titleCheck">Ghi chú</strong>
                                                </div>
                                                <div>
                                                    <textarea
                                                        className="form-input-checkout" id="note" name="note" type="text"
                                                        placeholder="Ghi chú.." onChange={this.handleNote}
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
export default Checkout2;