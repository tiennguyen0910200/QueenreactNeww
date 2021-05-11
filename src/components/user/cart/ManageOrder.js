import React, { Component } from 'react';
import "./ManageOrder.css";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import HoverRating from './Review';
class ManageOrder extends Component{
    constructor(props) {
        super(props);
        let checkOrder = localStorage.getItem('order_list');
        console.log(checkOrder);

        // let check = checkOrder ? "on" : "off";
        // this.state = {
        //     checkOrder: check

        // }
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
        // this.onCancelOrder();
        this.onReviewSubmit = this.onReviewSubmit.bind(this);

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
    onCancelOrder() {
        fetch("http://127.0.0.1:8000/api/order/cancel", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                response.json().then((data) => {
                    console.log(data);
                    alert('Đơn hàng cua bạn đã bị hủy');
                });
            });
    }
    onReviewSubmit(event) {
        event.preventDefault();
        let user_id = localStorage.getItem("idUser");
        let product_id = localStorage.getItem("product_id");
        // var id = this.props.match.params.id;

        let quantity = event.target["quantity"].value;
        let review = {
            quantity: quantity,
            user_id: user_id,
            product_id: product_id
        }
        let postInJson = JSON.stringify(review);
        fetch("http://127.0.0.1:8000/api/product/review", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: postInJson
        })
            .then(response => {
                response.json().then((review) => {
                    console.log(review);
                    alert('Cảm ơn bạn đã đánh giá sản phẩm');
                    this.props.history.push('/home/user-manageOrder');
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
                                        <span className="order-tab-item ">Đã hủy</span>
                                        <span className="order-tab-item ">Đã giao</span>
                                        <span className="order-tab-item ">Đánh giá</span>
                                    </div>
                                    <div className="orders">
                                        <div className="order">
                                            <div className="order-info">
                                                {/* {this.state.checkOrder == null ?
                                                <p className="text info desc">Bạn chưa xác nhận đơn hàng <Link to="/home/checkout">Đặt hàng</Link></p> : */}
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
                                                {/* } */}
                                                {/* {this.state.checkOrder != null ?
                                                <p className="text info desc">Bạn chưa xác nhận đơn hàng <Link to="/home/checkout">Đặt hàng</Link></p> :
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
                                                } */}
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
                                                                        <td ><button style={{float: "right"}} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Đánh giá</button></td>
                                                                        {/* <!-- Modal --> */}
                                                                            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                                                    <div className="modal-content">
                                                                                    <div className="modal-header">
                                                                                        <h5 className="modal-title" id="exampleModalCenterTitle" style={{display: "flex", justifyContent: "space-around"}}>
                                                                                            <img style={{width: "70px"}} src={'http://127.0.0.1:8000/storage/' + cart.picture} />
                                                                                            <div>
                                                                                                <h4 style={{fontStyle: "italic", marginLeft: "10px"}}>{cart.ProductName}</h4>
                                                                                                <h6 style={{fontStyle: "italic", marginLeft: "10px"}}>{cart.VendorName}</h6>
                                                                                            </div>
                                                                                            </h5>
                                                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                                        <span aria-hidden="true">&times;</span>
                                                                                        </button>
                                                                                    </div>
                                                                                    <div className="modal-body">
                                                                                        <div style={{textAlign: "center"}}>
                                                                                            <h4>Vui lòng đánh giá</h4>
                                                                                            <div style={{marginLeft: "140px"}}>
                                                                                                <div className="stars" id="review">
                                                                                                    <form action=""> 
                                                                                                        <input className="star star-5" id="star-5" type="radio" name="star" /> 
                                                                                                        <label className="star star-5" for="star-5"></label> 
                                                                                                        <input className="star star-4" id="star-4" type="radio" name="star" /> 
                                                                                                        <label className="star star-4" for="star-4"></label> 
                                                                                                        <input className="star star-3" id="star-3" type="radio" name="star" /> 
                                                                                                        <label className="star star-3" for="star-3"></label>
                                                                                                        <input className="star star-2" id="star-2" type="radio" name="star" />
                                                                                                        <label className="star star-2" for="star-2"></label>
                                                                                                        <input className="star star-1" id="star-1" type="radio" name="star" /> 
                                                                                                        <label className="star star-1" for="star-1"></label> 
                                                                                                        
                                                                                                    </form>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="modal-footer">
                                                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Thoát</button>
                                                                                        <form method="POST" onSubmit={this.onReviewSubmit} action="">
                                                                                            <button type="submit" className="btn btn-primary">Gửi đánh giá</button>
                                                                                        </form>
                                                                                    </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                    </tr>
                                                                </table>

                                                            </div>
                                                        </div>
                                                    )}
                                            </div>
                                            <div style={{borderBottom: "1px solid #dadada"}}>
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
                                            <form method="POST" onSubmit={this.onCancelOrder} action="">
                                                <button style={{float: "right", marginTop: "20px"}} type="submit" className="btn btn-danger" >Hủy đơn</button>
                                            </form>
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