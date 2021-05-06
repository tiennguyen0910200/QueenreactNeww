import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import "../header/Headerbig.css";
import "../header/Headersmall.css";
class Header extends Component {
  // 1.1
  constructor(props) {
    super(props);
    this.state = {
      allvendor: [],
    }
    //   this.state = {
    //     account: props.userData,
    //     isLoggedIn: props.userIsLoggedIn
    //   };
    //   this.logOut = this.logOut.bind(this);
    // }
    // // 1.2
    // logOut() {
    //   let appState = {
    //     isLoggedIn: false,
    //     account: {}
    //   };
    //   localStorage["appState"] = JSON.stringify(appState);
    //   this.setState(appState);
    //   this.props.history.push('/home/login');
    // }
    this.getAllVendor();
    let checkLogin = localStorage.getItem("idUser");
    console.log(checkLogin);

    let check = checkLogin ? "on" : "off";
    this.state = {
      checkLogin: check,
    };
    this.onLogout = this.onLogout.bind(this);
  }
  getAllVendor() {
    fetch("http://127.0.0.1:8000/api/allvendor").then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({
          allvendor: data,
        });
      });
    });
  }
  
  onLogout() {
    localStorage.removeItem("idUser");
    this.setState({
      checkLogin: "off",
    });
  }
  // 1.3
  render(props) {
    //console.log("list",this.state.allvendor);
    const aStyle = {
      cursor: "pointer",
    };
    let checkname = localStorage.getItem("nameUser");
    console.log(checkname);
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
                <Link to="/home/restaurant">
                  <a className="nav-link">Nhà hàng & Cửa hàng</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/home/service"><a className="nav-link" href="#">
                  Dịch vụ
                </a></Link>
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
                <a className="nav-link waves-effect waves-light">
                  <i class="fas fa-cart-plus" />
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink-333"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-user" />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right dropdown-default"
                  aria-labelledby="navbarDropdownMenuLink-333"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        {/* <div className="header_bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
              <Link to="/"><img
                  src="https://www.linkpicture.com/q/logo2_6.png"
                  alt=""
                  width="100px"
                  height="100px"
                  className="logo"
                />
                </Link>
              </div>
              <div className="col-sm-6">
                <div className="search">               
                  <select class="form-control" id="sel1">
                    <option selected>Chọn nhà hàng bạn muốn tìm kiếm!</option>                                     
                    {this.state.allvendor.map((vendor) => (                      
                      <option>{vendor.name}</option>                                                                             
                    ))} 
                                       
                  </select>
                  <button type="submit">
                    <i class="fa fa-search"></i>
                  </button>
                </div> 
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}
export default Header;
