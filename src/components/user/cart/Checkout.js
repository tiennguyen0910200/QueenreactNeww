import React, { Component } from "react";
import "./Checkout.css";
import axios from "axios";
import { withRouter } from "react-router";
import UserRow from "./CartItem";
import ExpenseTableRow from "./CartItem";
import { Link } from "react-router-dom";
class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carts: [],
      total: [],
      totalPrice: [],
      order: [],
      carts: [],
      userInfor: [],
      errormessage: "",
      name: "",
      phone: "",
      address: "",
    };
    var id = props.match.params.id;
    // let product_id= localStorage.getItem('product_id');
    // this.getData(product_id);
    // this.getAllProducts();
    this.getTotalPrice();
    this.getTotalProduct();
    this.getUserToFillForm();
    this.onOrderSubmit = this.onOrderSubmit.bind(this);
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
  getTotalPrice() {
    fetch("http://127.0.0.1:8000/api/totalPrice").then((response) => {
      response.json().then((data) => {
        localStorage.setItem("priceBill", JSON.stringify(data[0].sumPrice));
        console.log(data);
        this.setState({
          totalPrice: data,
        });
      });
    });
  }
  getTotalProduct() {
    fetch("http://127.0.0.1:8000/api/totalProduct").then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({
          total: data,
        });
      });
    });
  }
  onTodoChange(value) {
    this.setState({
      name: value,
    });
  }
  onOrderSubmit(event) {
    event.preventDefault();
    let err = "";
    let user = localStorage.getItem("idUser");
    let name = event.target["name"].value;
    let phone = event.target["phone"].value;
    let address = event.target["address"].value;
    let order_time = new Date(event.target["order_time"].value);
    let today = new Date();
    if (order_time.getTime() < today.getTime()) {
      err = (
        <p style={{ color: "red", fontSize: "15px", marginLeft: "15px" }}>
          Th???i gian ?????t h??ng ph???i tr?????c 2 ng??y
        </p>
      );
    }
    this.setState({ errormessage: err });
    let note = event.target["note"].value;
    let order = {
      name: name,
      phone: phone,
      address: address,
      order_time: order_time,
      note: note,
      status: "??H m???i",
      user: user,
      orderlist_id: 1,
    };
    let postInJson = JSON.stringify(order);
    localStorage.setItem("order_id", order.id);
    console.log(order);
    fetch("http://127.0.0.1:8000/api/product/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
      },
      body: postInJson,
    }).then((response) => {
      localStorage.setItem("order_id", order.id);
      response.json().then((order) => {
        alert("X??c nh???n ????n h??ng");
        this.props.history.push("/home/payment");
      });
    });
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/test/")
      .then((res) => {
        this.setState({
          carts: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  DataTable() {
    return this.state.carts.map((res, i) => {
      return <ExpenseTableRow obj={res} key={i} />;
    });
  }
  getUserToFillForm() {
    fetch("http://127.0.0.1:8000/api/getLastUser").then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({
          userInfor: data,
        });
      });
    });
  }
  render() {
    let totalProduct = this.state.total;
    let totals = totalProduct.length;
    let totalPrice = this.state.totalPrice;
    return (
      <div>
        <div className="wrapper">
          <div className="container">
            <div className="flexKhung">
              <div className="khungInfo">
                <div className="panel-info">
                  <div className="panel-heading1">
                    <h3 className="title-Checkout">
                      <b>????n h??ng</b>
                    </h3>
                  </div>
                  <div className="product-flex">
                    <div>
                      <strong></strong>
                    </div>
                    <div>
                      <strong>
                        {/* {totals} <span>????n</span> */}
                        <a
                          className="pull-right link "
                          style={{ color: "rgb(26, 156, 183)" }}
                        >
                          Th??m m??n
                          <Link to="/">
                            <button
                              style={{
                                border: "none",
                                height: "30px",
                                marginTop: "17px",
                                marginLeft: "5px",
                              }}
                            >
                              <i
                                className="fa fa-cart-plus"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </Link>
                        </a>
                        <div className="clear" />
                      </strong>
                    </div>
                  </div>
                  <hr className="hr-payment" />
                  {this.DataTable()}

                  <br />
                  <div className="product-flex">
                    <div>
                      <strong>Th??nh ti???n:</strong>
                    </div>
                    <div>
                      {this.state.totalPrice.map((total, index) => (
                        <strong>
                          <b>
                            {new Intl.NumberFormat("ar-US").format(
                              total.sumPrice
                            )}
                            &ensp;<span>VN??</span>
                          </b>
                        </strong>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* ?????a ch??? giao h??ng */}
              <div className="khungInfo">
                <div className="panel-info">
                  <div className="panel-heading1">
                    <h3 className="title-Checkout">
                      <b>?????a ch???</b>
                    </h3>
                  </div>
                  <h4 className="strong-titleCheck">
                    {" "}
                    <b>?????a ch??? giao h??ng </b>
                  </h4>
                  <div className="panel-body">
                    <form method="POST" onSubmit={this.onOrderSubmit} action="">
                      <div>
                        <div>
                          <strong className="strong-titleCheck">
                            T??n c???a b???n <span className="required">(*)</span>
                          </strong>
                        </div>
                        <div>
                          <input
                            className="form-input-checkout"
                            id="name"
                            type="text"
                            name="name"
                            // value={this.state.userInfor.name}
                            // onChange={(e) => this.onTodoChange(e.target.value)}
                            placeholder="T??n c???a b???n.."
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <div>
                          <strong className="strong-titleCheck">
                            S??? ??i???n tho???i <span className="required">(*)</span>
                          </strong>
                        </div>
                        <div>
                          <input
                            className="form-input-checkout"
                            id="phone"
                            name="phone"
                            type="number"
                            // value={this.state.userInfor.phone}
                            // onChange={(e) => this.onTodoChange(e.target.value)}
                            placeholder="S??? ??i???n tho???i c???a b???n.."
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <div>
                          <strong className="strong-titleCheck">
                            ?????a ch??? <span className="required">(*)</span>
                          </strong>
                        </div>
                        <div>
                          <input
                            className="form-input-checkout"
                            id="address"
                            name="address"
                            type="text"
                            // value={this.state.userInfor.address}
                            // onChange={(e) => this.onTodoChange(e.target.value)}
                            placeholder="?????a ch??? c???a b???n.."
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <div>
                          <strong className="strong-titleCheck">
                            Th???i gian giao h??ng{" "}
                            <span className="required">(*)</span>
                          </strong>
                        </div>
                        <div>
                          <input
                            className="form-input-checkout"
                            type="datetime-local"
                            id="order_time"
                            name="order_time"
                            required
                          />
                          <br></br>
                          {this.state.errormessage}
                        </div>
                      </div>
                      <div>
                        <div>
                          <strong className="strong-titleCheck">Ghi ch??</strong>
                        </div>
                        <div>
                          <textarea
                            className="form-input-checkout"
                            id="note"
                            name="note"
                            type="text"
                            placeholder="Ghi ch??.."
                            style={{ height: "100px" }}
                          />
                        </div>
                      </div>
                      <div>
                        <button className="btn-Checkout" type="submit">
                          <b>Ti???p t???c </b>
                        </button>
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
