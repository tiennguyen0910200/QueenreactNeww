import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../header/Headerbig.css";
import "../header/Headersmall.css";
class Header extends Component {
  // 1.1
  constructor(props) {
    super(props);
    let checkLogin = localStorage.getItem("idUser");
    console.log(checkLogin);

    let check = checkLogin ? "on" : "off";
    this.state = {
      checkLogin: check,
    };
    this.onLogout = this.onLogout.bind(this);
  }
  onLogout() {
    localStorage.removeItem("idUser");
    this.setState({
      checkLogin: "off",
    });
  }
  // 1.3
  render() {
    const aStyle = {
      cursor: "pointer",
    };
    let checkname = localStorage.getItem("nameUser");
    return (
      <div>
        <nav className="mb-1 navbar navbar-expand-lg navbar-dark default-color">
          <Link to="/">
            <a className="navbar-brand">Giới thiệu</a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent-333"
            aria-controls="navbarSupportedContent-333"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent-333"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/home/restaurant" id="item">
                  <a className="nav-link">Nhà hàng & Cửa hàng</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/home/service">
                  <a className="nav-link" href="#">
                    Dịch vụ
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/home/contact">
                  <a className="nav-link" href="#">
                    Liên hệ
                  </a>
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto nav-flex-icons">
              <li className="nav-item">
                <a className="nav-link waves-effect waves-light">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link waves-effect waves-light">
                  <i className="fab fa-google-plus-g" />
                </a>
              </li>
              <li className="nav-item">
                <Link to="/home/checkout">
                  <a className="nav-link waves-effect waves-light">
                    <i class="fas fa-cart-plus" />
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                {this.state.login ? (
                  <div className="user">
                    <Link to="/" onClick={this.logOut}>
                      Logout
                    </Link>
                  </div>
                ) : (
                  <div className="user">
                    {this.state.checkLogin === "off" ? (
                      <Link to="/home/login">
                        <a className="nav-link">Đăng nhập</a>
                      </Link>
                    ) : (
                      <Link to="/">
                        <a
                          className="nav-link dropdown-toggle"
                          id="navbarDropdownMenuLink-333"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <b>{checkname}</b>
                        </a>
                        <div
                          className="dropdown-menu dropdown-menu-right dropdown-default"
                          aria-labelledby="navbarDropdownMenuLink-333"
                        >
                          <a className="dropdown-item" href="#">
                            <Link to="/home/user-manageOrder">
                              Xem lại đơn hàng
                            </Link>
                          </a>
                          <a className="dropdown-item" href="#">
                            <Link to="/home/register">Đăng ký</Link>
                          </a>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={this.onLogout}
                          >
                            <Link to="/home/login">Đăng xuất</Link>
                          </a>
                          <a className="dropdown-item" href="#">
                            <Link to="/">Quay lại</Link>
                          </a>
                        </div>
                      </Link>
                    )}
                  </div>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default Header;
