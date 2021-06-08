import React, { Component } from "react";
import "./Payment.css";
import { withRouter } from "react-router";
class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userOrder: [],
      totalPrice: [],
      momoUrl: "",
      check: true,
      checkMomo: false,
    };
    this.getUserOrder();
    this.getTotalPrice();
    this.onPaymentAlert = this.onPaymentAlert.bind(this);
    this.momoPayment = this.momoPayment.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }
  getUserOrder() {
    fetch("http://queen-party-be.herokuapp.com/api/product/getOrder").then(
      (response) => {
        response.json().then((data) => {
          localStorage.setItem("order_id", data.id);
          console.log("order_list");
          console.log(data);
          this.setState({
            userOrder: data,
          });
        });
      }
    );
  }
  // componentDidMount() {
  //     this.setState({ userOrder: this.props.userorder });
  // }
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
  onPaymentAlert(event) {
    event.preventDefault();
    let vendor_id = localStorage.getItem("vendorList1");
    let order_id = localStorage.getItem("order_id");
    let notis = {
      vendor_id: vendor_id,
      order_id: order_id,
    };
    let postInJson = JSON.stringify(notis);
    fetch("http://queen-party-be.herokuapp.com/api/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: postInJson,
    }).then((response) => {
      alert("Đang chờ admin phê duyệt");
      this.props.history.push("/");
    });
  }
  momoPayment() {
    fetch("http://queen-party-be.herokuapp.com/api/paymentOnline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods":
          "POST, PUT, GET, OPTIONS, DELETE, PATCH",
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log("payment", data);
        this.setState({
          momoUrl: data.payUrl,
          check: false,
          checkMomo: true,
        });
        //window.location.reload();
      });
    });
  }
  sendEmail() {
    let emailUser = localStorage.getItem("emailUser");
    fetch("http://127.0.0.1:8000/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods":
          "POST, PUT, GET, OPTIONS, DELETE, PATCH",
      },
      data: {
        id: localStorage.order_id,
        id_user: localStorage.idUser,
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log("payment", data);
        this.setState({
          users: emailUser,
        });
        alert("Đang chờ admin phê duyệt");
        this.props.history.push("/");
      });
    });
  }
  render() {
    let userorder = this.state.userOrder;
    return (
      <div className="container">
        <div className="contain">
          <div className="enter">
            <div className="flex-payment">
              <div>
                <img
                  className="banner"
                  src="https://www.linkpicture.com/q/logo2_6.png"
                />
                <br />
                <i className="queen-payment">Queen Party</i>
                <p className="moTa">
                  ✳️ Giao hàng nhanh chóng <br />
                  ✳️ Dịch vụ đa dạng nhất <br /> ✳️ Đồng hành cùng bạn{" "}
                </p>
                <br />
              </div>
              <div className="khungPayment">
                <div className="flexKhung1">
                  <div>
                    <div className="margin">Tên của bạn</div>
                    <div className="margin">Địa chỉ</div>
                    <div className="margin">Số điện thoại</div>
                    <div className="margin">Thời gian giao</div>
                    <div className="margin">Ghi chú</div>
                    <div className="margin">Tổng tiền</div>
                  </div>
                  <div>
                    <b>
                      <div className="margin">{userorder.name}</div>
                      <div className="margin">{userorder.address}</div>
                      <div className="margin">{userorder.phone}</div>
                      <div className="margin">{userorder.order_time}</div>
                      <div className="margin">{userorder.note}</div>
                      <div className="margin">
                        {this.state.totalPrice.map((total, index) => (
                          <strong>
                            <b>
                              {new Intl.NumberFormat("ar-US").format(
                                total.sumPrice
                              )}
                              &ensp;<span>VNĐ</span>
                            </b>
                          </strong>
                        ))}
                      </div>
                    </b>
                  </div>
                </div>
              </div>
              <div className="payment1">
                <p className="flex-img">
                  <img
                    src="https://i.imgur.com/28akQFX.jpg"
                    width="200px"
                    height="100px"
                  />
                  <img
                    src="https://i.imgur.com/5QFsx7K.jpg"
                    width="200px"
                    height="100px"
                  />
                </p>
                <p className="ma">
                  <b>Phương thức thanh toán</b>
                </p>
                <p className="flexRadio">
                  <input
                    type="radio"
                    id="huey"
                    name="drone"
                    value="tructiep"
                    checked={this.state.check}
                  />{" "}
                  Thanh toán trực tiếp
                  <br />
                </p>
                <p className="flexRadio">
                  <input
                    type="radio"
                    id="huey"
                    name="drone"
                    checked={this.state.checkMomo}
                    value="tindung"
                    onClick={this.momoPayment}
                  />
                  Thanh toán thẻ tín dụng
                  <br />
                </p>
              </div>
            </div>
            {this.state.check ? (
              <form onSubmit={this.sendEmail} action="">
                <button type="submit" className="btn-payment">
                  <b>Hoàn tất</b>
                </button>
              </form>
            ) : (
              <form onSubmit={this.momoPayment} action="">
                <button type="submit" className="btn-payment">
                  <b>
                    <a href={this.state.momoUrl}>Momo</a>
                  </b>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Payment);
