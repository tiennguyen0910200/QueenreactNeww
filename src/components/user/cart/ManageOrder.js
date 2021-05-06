import React, { Component } from 'react';
import "./ManageOrder.css";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
class ManageOrder extends Component{
    constructor(props) {
        super(props);
        this.state = {
            carts: [],
            total: [],
            totalPrice: [],
            order: [],
            orderList: []
        }
        var id = props.match.params.id;
        this.getAllProducts();
        this.getOrderWithUser();
        this.getTotalPrice();
        this.getTotalProduct();

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
    getOrderWithUser() {
        // let user_id = localStorage.getItem('idUser');
        fetch("http://127.0.0.1:8000/api/getOrderWithUser")
            .then(response => {
                response.json().then((data) => {
                    console.log(data);
                    this.setState({
                        orderList: data
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
    
    render(){
        let checkname = localStorage.getItem('nameUser');
        let totalProduct = this.state.total;
        let totals = totalProduct.length;
        let totalPrice = this.state.totalPrice;
        return(
            <div className="lzd-playground">
                <div className="lzd-playground-main">
                    {/* <div className="lzd-playground-nav">
                        <div className="member-info">
                            <p><span>Hello,&nbsp;</span><span id="lzd_current_logon_user_name">{checkname}</span></p>
                        </div>
                        <ul className="nav-container">
                            <li className="item" id="Manage-My-Account">
                                <a href="#" data-spm="Manage-My-Account"><span>Tài khoản của tôi</span></a>
                                <ul className="item-container">
                                    <li className="sub"><a href="#" data-spm="My-profile" style={{ color: "#74829D"}}>Trang cá nhân</a></li>
                                    <li className="sub"><a href="#" data-spm="Address-book" style={{ color: "#74829D"}}>Địa chỉ</a></li>
                                    <li className="sub"><a href="#" data-spm="Payment-methods" style={{ color: "#74829D"}}>Phương thức thanh toán</a></li>
                                </ul>
                            </li>
                            <li className="item" id="My-Orders">
                                <a className="active" href="//my.lazada.vn/customer/order/index/" data-spm="My-Orders"><span>Đơn hàng của tôi</span></a>
                                <ul className="item-container">
                                    <li  className="sub"><a href="#" data-spm="Returns" style={{ color: "#74829D"}}>Thành công</a></li>
                                    <li  className="sub"><a href="#" data-spm="Cancellations"  style={{ color: "#74829D"}}>Đã hủy</a></li>
                                </ul>
                            </li>
                            <li className="item" id="My-Reviews">
                                <a href="#" data-spm="My-Reviews"><span>Đánh giá của tôi</span></a>
                                <ul className="item-container">
                                </ul>
                            </li>
                            <li className="item" id="Sell-On-Lazada">
                                <a href="#" data-spm="Sell-On-Lazada"><span>Trang chủ</span></a>
                                <ul className="item-container">
                                </ul>
                            </li>
                        </ul>
                    </div> */}
                    <div className="lzd-playground-right">
                        {/* <div className="breadcrumb">
                            <a className="first " href="#">Đơn hàng gần đây</a>
                        </div> */}
                        <div style={{ display: "flex"}}>
                            <h3>Các đơn hàng của&ensp;</h3>
                            <h3 style={{color: "#d17675", fontStyle: "italic"}}>{checkname}</h3> 
                        </div>
                        <div id="container" className="container">
                            <div>
                                <div className="order-list">
                                    <div className="order-list-tabs">
                                        <span className="order-tab-item order-tab-item-active">Gần đây</span>
                                        <span className="order-tab-item ">Đang chờ</span>
                                        <span className="order-tab-item ">Đã giao</span>
                                        <span className="order-tab-item ">Đánh giá</span>
                                    </div>
                                    <div className="orders">
                                        <div className="order">
                                            <div className="order-info">
                                                <div className="pull-left">
                                                    {this.state.orderList.map((orderlist, index) => 
                                                        <div>
                                                            <div className="info-order-left-text">Mã ĐH: 
                                                                <a className="link"> {orderlist.id}4575685837</a>
                                                            </div>
                                                            <p className="text info desc">Đặt hàng ngày {orderlist.order_time}</p>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="pull-cont" />
                                                    <a className="pull-right link manage" style={{color: 'rgb(26, 156, 183)'}}>Thêm món</a>
                                                    <Link to="/">
                                                        <button style={{border: "none", height: "30px", marginTop: "17px", marginLeft: "5px"}}><i class="fa fa-cart-plus" aria-hidden="true"></i></button>
                                                    </Link>
                                                    <div className="clear" />
                                                </div>
                                                <div className="order-item">
                                                    {this.state.carts.map((cart, index) =>
                                                        <div>
                                                            <div class="product-flex-order">
                                                                <table>
                                                                    <tr>
                                                                        <td ><img className="imageOrder" src={'http://127.0.0.1:8000/storage/' + cart.picture} /></td>
                                                                        <td >{cart.ProductName}</td>
                                                                        <td >{cart.price} <span>VNĐ</span></td>
                                                                        <td style={{fontWeight: 700}}>{cart.VendorName}</td>
                                                                        <td ><button className="button-delete"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
                                                                    </tr>
                                                                </table>

                                                            </div>
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

        )
    }
}
export default withRouter(ManageOrder);