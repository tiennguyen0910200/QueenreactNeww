import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import FlashMessage from "react-flash-message";
import axios from "axios";
import "./style/Login.css";
class VendorLoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      error: "",
      formSubmitting: false,
      vendor: {
        email: "",
        password: "",
      },
      redirect: props.redirect,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }
  componentWillMount() {
    let state = localStorage["vendorState"];
    if (state) {
      let VendorState = JSON.parse(state);
      this.setState({
        isLoggedIn: VendorState.isLoggedIn,
        vendor: VendorState,
      });
    }
  }
  componentDidMount() {
    const { prevLocation } = this.state.redirect.state || {
      prevLocation: { pathname: "/" },
    };
    if (prevLocation && this.state.isLoggedIn) {
      return this.props.history.push(prevLocation);
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ formSubmitting: true });
    let vendorData = this.state.vendor;
    axios
      .post("http://127.0.0.1:8000/api/auth/login", vendorData)
      .then((response) => {
        return response;
      })
      .then((json) => {
        if (json.data.success) {
          let vendorData = {
            id: json.data.id,
            name: json.data.name,
            email: json.data.email,
            access_token: json.data.access_token,
          };
          let vendorData = {
            isLoggedIn: true,
            vendor: vendorData,
          };
          localStorage["vendorState"] = JSON.stringify(vendorState);
          localStorage.setItem("vendorId", vendorData.id);
          console.log("vendorId");
          localStorage.setItem("vendorName", vendorData.name);
          console.log("vendorName");
          this.setState({
            isLoggedIn: vendorState.isLoggedIn,
            vendor: vendorState.vendor,
            error: "",
          });
          // window.location.reload()
          alert("Đăng nhập thành công");
          this.props.history.push("/");
        } else {
          alert(`Our System Failed To Register Your Account!`);
        }
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          let err = error.response.data;
          this.setState({
            error: err.message,
            errorMessage: err.errors,
            formSubmitting: false,
          });
        } else if (error.request) {
          // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
          let err = error.request;
          this.setState({
            error: err,
            formSubmitting: false,
          });
        } else {
          // Something happened in setting up the request that triggered an Error
          let err = error.message;
          this.setState({
            error: err,
            formSubmitting: false,
          });
        }
      })
      .finally(this.setState({ error: "" }));
  }
  handleEmail(e) {
    let value = e.target.value;
    this.setState((prevState) => ({
      vendor: {
        ...prevState.vendor,
        email: value,
      },
    }));
  }
  handlePassword(e) {
    let value = e.target.value;
    this.setState((prevState) => ({
      vendor: {
        ...prevState.vendor,
        password: value,
      },
    }));
  }
  render() {
    const { state = {} } = this.state.redirect;
    const { error } = state;
    return (
      <div className="container">
        <div className="row">
          {/* <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
                        {this.state.isLoggedIn ? <FlashMessage duration={60000} persistOnHover={true}>
                            <h5 className={"alert alert-success"}>Login successful, redirecting...</h5></FlashMessage> : ''}
                        {this.state.error ? <FlashMessage duration={100000} persistOnHover={true}>
                            <h5 className={"alert alert-danger"}>Error: {this.state.error}</h5></FlashMessage> : ''}
                        {error && !this.state.isLoggedIn ? <FlashMessage duration={100000} persistOnHover={true}>
                            <h5 className={"alert alert-danger"}>Error: {error}</h5></FlashMessage> : ''}
                        
                    </div> */}
          <form className="khungLogin" onSubmit={this.handleSubmit}>
            <h1 className="title-Login"> Đăng nhập </h1>
            <hr className="hr-Login" />
            <div className="logo-login">
              <img
                className="img-logo"
                src="https://www.linkpicture.com/q/logo2_6.png"
              />
            </div>
            <div className="contentLogin">
              <div>
                <div>
                  <strong className="strong-title-Login">
                    Email <span className="required">(*)</span>
                  </strong>
                </div>
                <div>
                  <input
                    className="form-inputLogin"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Nhập email.."
                    required
                    onChange={this.handleEmail}
                  />
                </div>
              </div>
              <br />
              <div>
                <div>
                  <strong className="strong-title-Login">
                    Mật khẩu<span className="required">(*)</span>
                  </strong>
                </div>
                <div>
                  <input
                    className="form-inputLogin"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu.."
                    required
                    name="password"
                    onChange={this.handlePassword}
                  />
                </div>
              </div>
            </div>
            <br />
            <button
              className="btn-Login"
              disabled={this.state.formSubmitting}
              type="submit"
              name="singlebutton"
            >
              <b>
                {this.state.formSubmitting
                  ? "Bạn đang đăng nhập vào..."
                  : "Đăng nhập"}
              </b>
            </button>
            <br />
            <p className="description-Login">
              <b>
                Bạn chưa có tài khoản?{" "}
                <Link to="/home/register" className="text-yellow">
                  {" "}
                  Đăng kí ngay
                </Link>
              </b>
            </p>
          </form>
          {/* <p className="text-white">Don't have an account? <Link to="/register" className="text-yellow"> Register</Link> |
          <span className="pull-right">
                            <Link to="/" className="text-white">Back to Index</Link>
                        </span>
                    </p> */}
        </div>
      </div>
    );
  }
}
export default withRouter(VendorLoginContainer);
