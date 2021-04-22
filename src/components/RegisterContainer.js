import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import ReactDOM from 'react-dom';
import FlashMessage from 'react-flash-message';
import './style/register2.css';
class RegisterContainer extends Component {
    // 2.1
    constructor(props) {
        super(props);
        this.state = {
            isRegistered: false,
            error: '',
            errorMessage: '',
            formSubmitting: false,
            user: {
                name: '',
                phone: '',
                email: '',
                address: '',
                password: '',
                password_confirmation: '',
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
        axios.post("http://127.0.0.1:8000/api/auth/register", userData
            )
            .then(response => {
                return response;
            }).then(json => {
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
                        user: userData
                    };
                    localStorage["appState"] = JSON.stringify(appState);
                    this.setState({
                        isRegistered: appState.isRegistered,
                        user: appState.user,
                    });
                    alert('Đăng kí thành công! Đăng nhập ngay');
                    this.props.history.push('/home/login');
                } else {
                    alert(`Our System Failed To Register Your Account!`);
                }
            }).catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code that falls out of the range of 2xx
                    let err = error.response.data;
                    this.setState({
                        error: err.message,
                        errorMessage: err.errors,
                        formSubmitting: false
                    })
                }
                else if (error.request) {
                    // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
                    let err = error.request;
                    this.setState({
                        error: err,
                        formSubmitting: false
                    })
                } else {
                    // Something happened in setting up the request that triggered an Error
                    let err = error.message;
                    this.setState({
                        error: err,
                        formSubmitting: false
                    })
                }
            }).finally(this.setState({ error: '' }));
    }
    handleName(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user, name: value
            }
        }));
    }
    handleNumber(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user, phone: value
            }
        }));
    }
    // 2.5
    handleEmail(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user, email: value
            }
        }));
    }
    handleAddress(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user, address: value
            }
        }));
    }
    handlePassword(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user, password: value
            }
        }));
    }
    handlePasswordConfirm(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user, password_confirmation: value
            }
        }));
    }
    render() {
        // 2.6
        let errorMessage = this.state.errorMessage;
        let arr = [];

        Object.keys({ 'key': errorMessage }).forEach((value) => (
            arr.push(value)
        ));
        // Object.values(errorMessage).forEach((value) => (
        //     arr.push(value)
        // ));
        return (
            <div className="khungRegisUser">
                <h1 className="title"> Đăng kí </h1>
                <hr className="hr-Register" />
                <br />
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div>
                        <div>
                            <strong className="strong-titleUser">
                            Tên của bạn <span className="required">(*)</span>
                            </strong>
                        </div>
                        <div>
                            <input
                            className="form-input-registerUser"
                            placeholder="Tên của bạn.." id="name" type="text" name="name" onChange={this.handleName} 
                            required
                            />
                        </div>
                        </div>
                        <br />
                        <div>
                        <div>
                            <strong className="strong-titleUser">
                            Số điện thoại <span className="required">(*)</span>
                            </strong>
                        </div>
                        <div>
                            <input
                            className="form-input-registerUser"
                            placeholder="Số điện thoại.." id="phone" type="number" name="phone" onChange={this.handleNumber}
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
                            placeholder="Email của bạn..." id="email" type="email" name="email" onChange={this.handleEmail}
                            required
                            />
                        </div>
                        </div>
                        <br />
                        <div>
                        <div>
                            <strong className="strong-titleUser">
                            Địa chỉ<span className="required">(*)</span>
                            </strong>
                        </div>
                        <div>
                            <input
                            className="form-input-registerUser"
                            placeholder="Địa chỉ của bạn..." id="address" type="text" name="address" onChange={this.handleAddress}
                            required
                            />
                        </div>
                        </div>
                        <br />
                        <div>
                        <div>
                            <strong className="strong-titleUser">
                            Mật khẩu<span className="required">(*)</span>
                            </strong>
                        </div>
                        <div>
                            <input
                            className="form-input-registerUser"
                            placeholder="Nhập mật khẩu.." id="password" type="password" name="password" onChange={this.handlePassword}
                            required 
                            />
                        </div>
                        </div>
                        <br />
                        <div>
                        <div>
                            <strong className="strong-titleUser">
                            Xác nhận mật khẩu <span className="required">(*)</span>
                            </strong>
                        </div>
                        <div>
                            <input
                            className="form-input-registerUser"
                            required id="password_confirm" type="password" name="password_confirm"
                            placeholder="Xác nhận mật khẩu.." onChange={this.handlePasswordConfirm}
                            />
                        </div>
                        </div>
                        <br />
                    </div>
                    <button className="btn-RegisterUser" type="submit" disabled={this.state.formSubmitting ? "disabled" : ""}><b>Đăng kí</b></button>
                </form>
                <br />
                <p className="description">
                    <b> <Link to="/home/login" className="text-yellow">  Bạn đã có tài khoản? Đăng nhập ngay</Link></b>{" "}
                </p>
            </div>
        )
    }
}
// 2.8
export default withRouter(RegisterContainer);