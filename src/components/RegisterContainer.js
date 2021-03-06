import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import ReactDOM from "react-dom";
import "./style/register2.css";
class RegisterContainer extends Component {
  // 2.1
  constructor(props) {
    super(props);
    this.state = {
      isRegistered: false,
      error: "",
      errorMessage: "",
      formSubmitting: false,
      user: {
        name: "",
        phone: "",
        email: "",
        address: "",
        password: "",
        password_confirmation: "",
      },
      redirect: props.redirect,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
  }
  // 2.2
  // componentWillMount, componentDidMount etc etc that have //componentStuffStuff are known as React Lifecycles which of course //you already know
  componentWillMount() {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState });
    }
    if (this.state.isRegistered) {
      return this.props.history.push("/");
    }
  }
  // 2.3
  // componentDidMount() {
  //     const { prevLocation } = this.state.redirect.state || { prevLocation: { pathname: '/dashboard' } };
  //     if (prevLocation && this.state.isLoggedIn) {
  //         return this.props.history.push(prevLocation);
  //     }
  // }
  // 2.4
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ formSubmitting: true });
    ReactDOM.findDOMNode(this).scrollIntoView();
    let userData = this.state.user;
    axios
      .post("http://127.0.0.1:8000/api/auth/register", userData)
      .then((response) => {
        return response;
      })
      .then((json) => {
        if (json.data.success) {
          let userData = {
            id: json.data.id,
            name: json.data.name,
            phone: json.data.phone,
            email: json.data.email,
            address: json.data.address,
            activation_token: json.data.activation_token,
          };
          let appState = {
            isRegistered: true,
            user: userData,
          };
          localStorage["appState"] = JSON.stringify(appState);
          this.setState({
            isRegistered: appState.isRegistered,
            user: appState.user,
          });
          alert("????ng k?? th??nh c??ng! ????ng nh???p ngay");
          this.props.history.push("/home/login");
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
  handleName(e) {
    let value = e.target.value;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        name: value,
      },
    }));
  }
  handleNumber(e) {
    let value = e.target.value;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        phone: value,
      },
    }));
  }
  // 2.5
  handleEmail(e) {
    let value = e.target.value;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        email: value,
      },
    }));
  }
  handleAddress(e) {
    let value = e.target.value;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        address: value,
      },
    }));
  }
  handlePassword(e) {
    let value = e.target.value;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        password: value,
      },
    }));
  }
  handlePasswordConfirm(e) {
    let value = e.target.value;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        password_confirmation: value,
      },
    }));
  }
  render() {
    // 2.6
    let errorMessage = this.state.errorMessage;
    let arr = [];

    Object.keys({ key: errorMessage }).forEach((value) => arr.push(value));
    // Object.values(errorMessage).forEach((value) => (
    //     arr.push(value)
    // ));
    return (
      <div className="khungRegisUser">
        <h1 className="title-Login"> ????ng k?? </h1>
        <hr className="hr-Login" />
        <div className="logo-login">
          <img
            className="img-logo"
            src="https://www.linkpicture.com/q/logo2_6.png"
          />
        </div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              <div>
                <strong className="strong-titleUser">
                  T??n c???a b???n <span className="required">(*)</span>
                </strong>
              </div>
              <div>
                <input
                  className="form-input-registerUser"
                  placeholder="T??n c???a b???n.."
                  id="name"
                  type="text"
                  name="name"
                  onChange={this.handleName}
                  required
                />
              </div>
            </div>
            <br />
            <div>
              <div>
                <strong className="strong-titleUser">
                  S??? ??i???n tho???i <span className="required">(*)</span>
                </strong>
              </div>
              <div>
                <input
                  className="form-input-registerUser"
                  placeholder="S??? ??i???n tho???i.."
                  id="phone"
                  type="number"
                  name="phone"
                  onChange={this.handleNumber}
                  required
                />
              </div>
            </div>
            <br />
            <div>
              <div>
                <strong className="strong-titleUser">
                  Email<span className="required">(*)</span>
                </strong>
              </div>
              <div>
                <input
                  className="form-input-registerUser"
                  placeholder="Email c???a b???n..."
                  id="email"
                  type="email"
                  name="email"
                  onChange={this.handleEmail}
                  required
                />
              </div>
            </div>
            <br />
            <div>
              <div>
                <strong className="strong-titleUser">
                  ?????a ch???<span className="required">(*)</span>
                </strong>
              </div>
              <div>
                <input
                  className="form-input-registerUser"
                  placeholder="?????a ch??? c???a b???n..."
                  id="address"
                  type="text"
                  name="address"
                  onChange={this.handleAddress}
                  required
                />
              </div>
            </div>
            <br />
            <div>
              <div>
                <strong className="strong-titleUser">
                  M???t kh???u<span className="required">(*)</span>
                </strong>
              </div>
              <div>
                <input
                  className="form-input-registerUser"
                  placeholder="Nh???p m???t kh???u.."
                  id="password"
                  type="password"
                  name="password"
                  onChange={this.handlePassword}
                  required
                />
              </div>
            </div>
            <br />
            <div>
              <div>
                <strong className="strong-titleUser">
                  X??c nh???n m???t kh???u <span className="required">(*)</span>
                </strong>
              </div>
              <div>
                <input
                  className="form-input-registerUser"
                  required
                  id="password_confirm"
                  type="password"
                  name="password_confirm"
                  placeholder="X??c nh???n m???t kh???u.."
                  onChange={this.handlePasswordConfirm}
                />
              </div>
            </div>
            <br />
          </div>
          <button
            className="btn-RegisterUser"
            type="submit"
            disabled={this.state.formSubmitting ? "disabled" : ""}
          >
            <b>????ng k??</b>
          </button>
        </form>
        <br />
        <p className="description">
          <b>
            {" "}
            <Link to="/home/login" className="text-yellow">
              {" "}
              B???n ???? c?? t??i kho???n? ????ng nh???p ngay
            </Link>
          </b>{" "}
        </p>
      </div>
    );
  }
}
// 2.8
export default withRouter(RegisterContainer);
