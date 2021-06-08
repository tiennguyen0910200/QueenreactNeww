import React, { Component } from "react";
import "./ManageOrder.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import HoverRating from "./Review";
import axios from "axios";
import ManageItem from "./ManageItem";
class ManageOrder extends Component {
  constructor(props) {
    super(props);
    let checkOrder = localStorage.getItem("order_list");

    this.state = {
      carts: [],
      total: [],
      totalPrice: [],
      order: [],
      orderList: {},
      statusOrder: false,
      cart: [],
    };
    var id = props.match.params.id;
    this.getAllProducts();
    this.getOrderWithUser();
    this.getTotalPrice();
    this.onReviewSubmit = this.onReviewSubmit.bind(this);
  }
  getAllProducts() {
    fetch("http://127.0.0.1:8000/api/cart").then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({
          carts: data,
        });
      });
    });
  }
  getOrderWithUser() {
    this.setState({ statusOrder: true });
    fetch("http://127.0.0.1:8000/api/getOrderWithUser").then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({
          orderList: data,
        });
      });
    });
  }
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/test/")
      .then((res) => {
        this.setState({
          cart: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  DataTable() {
    return this.state.cart.map((res, i) => {
      return <ManageItem obj={res} key={i} />;
    });
  }
  getTotalPrice() {
    fetch("http://127.0.0.1:8000/api/totalPrice").then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({
          totalPrice: data,
        });
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
      product_id: product_id,
    };
    let postInJson = JSON.stringify(review);
    fetch("http://127.0.0.1:8000/api/product/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: postInJson,
    }).then((response) => {
      response.json().then((review) => {
        console.log(review);
        alert("Cảm ơn bạn đã đánh giá sản phẩm");
        this.props.history.push("/home/user-manageOrder");
      });
    });
  }

  formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  render() {
    let checkname = localStorage.getItem("nameUser");
    let totalProduct = this.state.total;
    let totals = totalProduct.length;
    let totalPrice = this.state.totalPrice;
    return (
      <div className="lzd-playground">
        <div className="lzd-playground-main">
          <div className="lzd-playground-right">
            <div style={{ display: "flex" }}>
              <h3>Các đơn hàng của&ensp;</h3>
              <h3 style={{ color: "#d17675", fontStyle: "italic" }}>
                {checkname}
              </h3>
            </div>
            <div id="container" className="container">
              <div>
                <div className="order-list">
                  <div className="order-list-tabs">
                    <span className="order-tab-item order-tab-item-active">
                      Gần đây
                    </span>
                    <span className="order-tab-item ">Đã hủy</span>
                    <span className="order-tab-item ">Đã giao</span>
                    <span className="order-tab-item ">Đánh giá</span>
                  </div>
                  <div className="orders">
                    <div className="order">
                      <div
                        className="order-info"
                        disabled={this.state.statusOrder}
                      >
                        <div>
                          <div className="pull-left">
                            <div>
                              <div className="info-order-left-text">
                                Mã ĐH:
                                <Link to="/home/checkout">
                                  <a className="link">
                                    {" "}
                                    ĐH{this.state.orderList.id}
                                  </a>
                                </Link>
                              </div>
                              <p>
                                Đặt hàng ngày:{" "}
                                <span
                                  style={{
                                    fontWeight: 600,
                                    color: "#dc3545",
                                  }}
                                >
                                  {new Date().toLocaleDateString(
                                    "en-US",
                                    this.state.orderList.created_at
                                  )}
                                </span>
                                &ensp; --- &ensp; Giao hàng ngày - giờ{" "}
                                <span
                                  style={{
                                    fontWeight: 600,
                                    color: "#dc3545",
                                  }}
                                >
                                  {this.state.orderList.order_time}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* {this.state.checkOrder == null ?
                                                <p className="text info desc">Bạn chưa xác nhận đơn hàng <Link to="/home/checkout">Đặt hàng</Link></p> : */}

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
                      </div>
                      {/* show order list */}
                      {this.DataTable()}
                      {/* ////end show */}
                      <div style={{ borderBottom: "1px solid #dadada" }}>
                        {/*  */}
                        <div class="product-flex">
                          <div>
                            <strong>Thành tiền: </strong>
                          </div>
                          <div>
                            {this.state.totalPrice.map((total, index) => (
                              <strong>
                                <b>
                                  {new Intl.NumberFormat("ar-US").format(
                                    total.sumPrice
                                  )}{" "}
                                  <span>VNĐ</span>
                                </b>
                              </strong>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* <form method="POST" onSubmit={this.onCancelOrder} action="">
                                                <button style={{float: "right", marginTop: "20px"}} type="submit" className="btn btn-danger" >Hủy đơn</button>
                                            </form> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ManageOrder);
