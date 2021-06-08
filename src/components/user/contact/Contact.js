import React, { Component } from "react";
import swal from "sweetalert";
import "../contact/Contactbig.css";
import "../contact/Contactsmall.css";
import Footer from "../footer/Footer";
import Header from "../header/Header";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.onContact = this.onContact.bind(this);
  }
  onContact(event) {
    event.preventDefault();
    let phone = event.target["phone"].value;
    let email = event.target["email"].value;
    let content = event.target["content"].value;
    let contact = {
      phone: phone,
      email: email,
      content: content,
    };
    let postInJson = JSON.stringify(contact);
    fetch("http://127.0.0.1:8000/api/contact", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: postInJson,
    }).then((response) => {
      console.log(response);
      swal(
        "Tuyệt vời!",
        "Tin nhắn của bạn đã được gửi đến chúng tôi",
        "success"
      );
    });
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <div>
          <div className="flex-container">
            <div style={{ flexGrow: "3" }} className="left-box">
              <div style={{ display: "flex" }}>
                <div>
                  <i class="fas fa-id-badge"></i>
                </div>
                <div className="infor">
                  <h4 style={{ fontWeight: "bold", color: "black" }}>
                    Quản trị viên
                  </h4>
                  <h6>Hồ Văn Quân</h6>
                  <h6>Nguyễn Thị Tiên</h6>
                  <h6>Hoàng Thị Dịu</h6>
                  <h6>Trần Thị Huyền Trang</h6>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="infor">
                  <h4 style={{ fontWeight: "bold", color: "black" }}>
                    Địa chỉ
                  </h4>
                  <h6>101 Lê Hữu Trác, Phước Mỹ, Sơn Trà, Đà Nẵng</h6>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div>
                  <i className="fas fa-envelope-open-text"></i>
                </div>
                <div className="infor">
                  <h4 style={{ fontWeight: "bold", color: "black" }}>Email</h4>
                  <h6>queenparty@gmail.com</h6>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div>
                  <i className="fas fa-phone"></i>
                </div>
                <div className="infor">
                  <h4 style={{ fontWeight: "bold", color: "black" }}>
                    Số điện thoại
                  </h4>
                  <h6>(+84) 657 847 676</h6>
                </div>
              </div>
              <div className="boss">
                <img src="https://lh3.googleusercontent.com/-sKun7aABQdE/YEseCQ2-jiI/AAAAAAAABZk/udrAy-3zx3stECgJoWr-FJU-Ep_Jmc5vACK8BGAsYHg/s512/a.jpg"></img>
              </div>
            </div>
            <div style={{ flexGrow: "7" }}>
              <h3>Liên hệ</h3>
              <form onSubmit={this.onContact}>
                <div className="contact-form">
                  <h4>Số điện thoại</h4>
                  <input name="phone" placeholder="(+84) 509 782 649"></input>
                  <h4>Email</h4>
                  <input
                    name="email"
                    placeholder="nguyenvana@gmail.com"
                  ></input>
                  <h4>Lời nhắn</h4>

                  <textarea
                    className="text-area"
                    name="content"
                    placeholder="Bạn có lời nhắn gì đến chúng tôi?"
                  ></textarea>
                  <button type="submit" className="button-contact">
                    <h4 style={{ textAlign: "center", outline: "none" }}>
                      Gửi
                    </h4>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <br />
          <br />
          <br />
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Contact;
