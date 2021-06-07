import React, { Component } from "react";
import "./ManageOrder.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import HoverRating from "./Review";
class ManageOrder extends Component {
  constructor(props) {
    super(props);
    let checkOrder = localStorage.getItem("order_list");
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
      orderList: [],
      statusOrder: false,
    };
    var id = props.match.params.id;
    this.getAllProducts();
    this.getOrderWithUser();
    this.getTotalPrice();
    this.getTotalProduct();
    // this.onCancelOrder();
    this.onReviewSubmit = this.onReviewSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.ReviewSubmit = this.ReviewSubmit.bind(this);
  }
  getAllProducts() {
    fetch("http://queen-party-be.herokuapp.com/api/cart").then((response) => {
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
    // let user_id = localStorage.getItem('idUser');
    fetch("http://queen-party-be.herokuapp.com/api/getOrderWithUser").then(
      (response) => {
        response.json().then((data) => {
          console.log(data);
          this.setState({
            orderList: data,
          });
        });
      }
    );
  }
  getTotalPrice() {
    fetch("http://queen-party-be.herokuapp.com/api/totalPrice").then(
      (response) => {
        response.json().then((data) => {
          console.log(data);
          this.setState({
            totalPrice: data,
          });
        });
      }
    );
  }
  getTotalProduct() {
    fetch("http://queen-party-be.herokuapp.com/api/totalProduct").then(
      (response) => {
        response.json().then((data) => {
          console.log(data);
          this.setState({
            total: data,
          });
        });
      }
    );
  }
  onCancelOrder() {
    fetch("http://queen-party-be.herokuapp.com/api/order/cancel", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        alert("Đơn hàng cua bạn đã bị hủy");
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
    fetch("http://queen-party-be.herokuapp.com/api/product/review", {
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
  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value,
    });
  }

  ReviewSubmit(event) {
    event.preventDefault();
    let user_id = localStorage.getItem("idUser");
    let product_id = localStorage.getItem("product_id");
    // var id = this.props.match.params.id;

    let quantity = this.state.selectedOption;
    let review = {
      quantity: quantity,
      user_id: user_id,
      product_id: product_id,
    };
    let postInJson = JSON.stringify(review);
    fetch("http://queen-party-be.herokuapp.com/api/product/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: postInJson,
    }).then((response) => {
      response.json().then((review) => {
        console.log(review);
        console.log(review.quantity);
        alert("Cảm ơn bạn đã đánh giá sản phẩm");
        this.props.history.push("/");
      });
    });
    // console.log(this.state.selectedOption)
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
                          {this.state.statusOrder ? (
                            <p>
                              <Link to="/home/checkout">Đặt hàng</Link>
                            </p>
                          ) : (
                            <div className="pull-left">
                              {this.state.orderList.map((orderlist, index) => (
                                <div>
                                  <div className="info-order-left-text">
                                    Mã ĐH:
                                    <Link to="/home/checkout">
                                      <a className="link"> ĐH{orderlist.id}</a>
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
                                      {this.formatter.format(
                                        Date.parse(orderlist.created_at)
                                      )}
                                    </span>
                                    &ensp; --- &ensp; Giao hàng ngày{" "}
                                    <span
                                      style={{
                                        fontWeight: 600,
                                        color: "#dc3545",
                                      }}
                                    >
                                      {this.formatter.format(
                                        Date.parse(orderlist.order_time)
                                      )}
                                    </span>
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
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
                      <div className="order-item">
                        {this.state.carts.map((cart, index) => (
                          <div>
                            <div class="product-flex-order">
                              <table>
                                <tr>
                                  <td>
                                    <img
                                      className="imageOrder"
                                      src={cart.picture}
                                    />
                                  </td>
                                  <td>{cart.ProdName}</td>
                                  <td>
                                    {cart.price} <span>VNĐ</span>
                                  </td>
                                  <td style={{ fontWeight: 700 }}>
                                    {cart.name}
                                  </td>
                                  <td>
                                    <button
                                      style={{ float: "right" }}
                                      type="button"
                                      className="btn btn-primary"
                                      data-toggle="modal"
                                      data-target="#exampleModalCenter"
                                    >
                                      Đánh giá
                                    </button>
                                  </td>
                                  {/* <!-- Modal --> */}
                                  <div
                                    className="modal fade"
                                    id="exampleModalCenter"
                                    tabindex="-1"
                                    role="dialog"
                                    aria-labelledby="exampleModalCenterTitle"
                                    aria-hidden="true"
                                  >
                                    <div
                                      className="modal-dialog modal-dialog-centered"
                                      role="document"
                                    >
                                      <div className="modal-content">
                                        <div className="modal-header">
                                          <h5
                                            className="modal-title"
                                            id="exampleModalCenterTitle"
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-around",
                                            }}
                                          >
                                            <img
                                              style={{ width: "70px" }}
                                              src={cart.picture}
                                            />
                                            <div>
                                              <h4
                                                style={{
                                                  fontStyle: "italic",
                                                  marginLeft: "10px",
                                                }}
                                              >
                                                {cart.ProdName}
                                              </h4>
                                              <h6
                                                style={{
                                                  fontStyle: "italic",
                                                  marginLeft: "10px",
                                                }}
                                              >
                                                {cart.name}
                                              </h6>
                                            </div>
                                          </h5>
                                          <button
                                            type="button"
                                            class="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                          >
                                            <span aria-hidden="true">
                                              &times;
                                            </span>
                                          </button>
                                        </div>
                                        <div className="modal-body">
                                          <div style={{ textAlign: "center" }}>
                                            <h4 style={{ marginLeft: "130px" }}>
                                              Vui lòng đánh giá
                                            </h4>
                                            <div style={{ marginLeft: "10px" }}>
                                              <div
                                                className="stars"
                                                id="review"
                                              >
                                                <form
                                                  action=""
                                                  onSubmit={this.ReviewSubmit}
                                                >
                                                  <input
                                                    className="star star-5"
                                                    id="star-5"
                                                    type="radio"
                                                    name="star"
                                                    value="5"
                                                    checked={
                                                      this.state
                                                        .selectedOption === "5"
                                                    }
                                                    onChange={
                                                      this.onValueChange
                                                    }
                                                  />
                                                  <label
                                                    className="star star-5"
                                                    for="star-5"
                                                  ></label>
                                                  <input
                                                    className="star star-4"
                                                    id="star-4"
                                                    type="radio"
                                                    name="star"
                                                    value="4"
                                                    checked={
                                                      this.state
                                                        .selectedOption === "4"
                                                    }
                                                    onChange={
                                                      this.onValueChange
                                                    }
                                                  />
                                                  <label
                                                    className="star star-4"
                                                    for="star-4"
                                                  ></label>
                                                  <input
                                                    className="star star-3"
                                                    id="star-3"
                                                    type="radio"
                                                    name="star"
                                                    value="3"
                                                    checked={
                                                      this.state
                                                        .selectedOption === "3"
                                                    }
                                                    onChange={
                                                      this.onValueChange
                                                    }
                                                  />
                                                  <label
                                                    className="star star-3"
                                                    for="star-3"
                                                  ></label>
                                                  <input
                                                    className="star star-2"
                                                    id="star-2"
                                                    type="radio"
                                                    name="star"
                                                    value="2"
                                                    checked={
                                                      this.state
                                                        .selectedOption === "2"
                                                    }
                                                    onChange={
                                                      this.onValueChange
                                                    }
                                                  />
                                                  <label
                                                    className="star star-2"
                                                    for="star-2"
                                                  ></label>
                                                  <input
                                                    className="star star-1"
                                                    id="star-1"
                                                    type="radio"
                                                    name="star"
                                                    value="1"
                                                    checked={
                                                      this.state
                                                        .selectedOption === "1"
                                                    }
                                                    onChange={
                                                      this.onValueChange
                                                    }
                                                  />
                                                  <label
                                                    className="star star-1"
                                                    for="star-1"
                                                  ></label>
                                                </form>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="modal-footer">
                                          <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-dismiss="modal"
                                          >
                                            Thoát
                                          </button>
                                          <form
                                            method="POST"
                                            onSubmit={this.ReviewSubmit}
                                            action=""
                                          >
                                            <button
                                              type="submit"
                                              className="btn btn-primary"
                                            >
                                              Gửi đánh giá
                                            </button>
                                          </form>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </tr>
                              </table>
                            </div>
                          </div>
                        ))}
                      </div>
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
                                  {total.sumPrice} <span>VNĐ</span>
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
