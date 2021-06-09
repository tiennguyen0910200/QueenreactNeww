import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import "../footer/Footerbig.css";
import "../footer/Footersmall.css";
class Footer extends Component {
  render() {
    return (
      <Router>
        <div
          style={{
            backgroundColor: "#3a3b3a",
            color: "white",
            paddingTop: "10px",
            marginTop: "70px",
          }}
        >
          <div class="container">
            <div class="row">
              <div class="col-sm-4">
                <img
                  src="https://www.linkpicture.com/q/logo2_6.png"
                  alt=""
                  width="150px"
                  height="150px"
                />
                <div>
                  <p>QueenParty</p>
                  <p>Ứng dụng đặt tiệc tại nhà</p>
                </div>
              </div>
              <div class="col-sm-4">
                <div>
                  <i class="fas fa-home">&ensp;Địa chỉ</i>
                  <p>101B Lê Hữu Trác</p>
                  <p>Thành phố Đà Nẵng</p>
                  <p>Việt Nam</p>
                </div>
                <br />
                <div>
                  <i class="fas fa-phone">&ensp;Liên hệ</i>
                  <p>Email:[queenpartycom.vn]</p>
                  <p>Phone:(+84)090567432</p>
                  <p>Fax:(+84)077684219</p>
                </div>
              </div>
              <div class="col-sm-4">
                <div>
                  <i class="fas fa-calculator">&ensp;Hệ thống</i>
                  <p className="p">Giao hàng tận nhà</p>
                  <p className="p">Nhanh chóng& an toàn</p>
                  <p className="p">Đáp ứng mọi yêu cầu</p>
                </div>
                <br />
                <div>
                  <i class="far fa-comment-dots">&ensp;Phản hồi</i>
                  <p>
                    Xin gửi chúng tôi ý tưởng của bạn,báo
                    <br /> cáo lỗi,đề xuất!
                    <br />
                    Bất kì thông tin phản hồi sẽ được đánh giá cao.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default Footer;
