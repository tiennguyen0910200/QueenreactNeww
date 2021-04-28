import React, { Component } from 'react';
// import './style/registerCheck.css';
import { Link, withRouter } from 'react-router-dom';
class RegisterCheck extends Component{
    render(){
        return(
            <div className="khung-re ">
                <h1 className="title"> Đăng kí </h1>
                <hr className ="hr-tag"/>
                <img className="img-logo " src="https://www.linkpicture.com/q/logo2_6.png"/>
                <h5 className="queen"><i>Queen Party</i> </h5>
                <div className="content">
                    <p><b>Bạn là ai? </b></p>
                    <p><input type="radio" name="gender" value="vendor"  /> <b>Người cung cấp dịch vụ</b></p>
                    <p><input type="radio" name="gender" value="user" checked/> <b>Người sử dụng dịch vụ </b></p>
                </div>
                <button className="btn1"><b> <Link to="/home/register" className="text-yellow">Tiếp tục</Link> </b></button>
                <p className="descript-Register">
                    <b>Bạn đã có tài khoản? Đăng nhập ngay</b>{" "}
                </p>
            </div>
        )
    }
}
export default RegisterCheck;