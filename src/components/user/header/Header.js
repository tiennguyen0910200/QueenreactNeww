import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from "react-router-dom";
import '../header/Headerbig.css';
import '../header/Headersmall.css';
class Header extends Component {
    // 1.1
    constructor(props) {
        super(props);
        let checkLogin = localStorage.getItem('idUser');
        console.log(checkLogin);

        let check = checkLogin ? "on" : "off";
        this.state = {
            checkLogin: check

        }
        this.onLogout = this.onLogout.bind(this);
    }
    onLogout() {
            localStorage.removeItem('idUser');
            this.setState({
                checkLogin: "off"
            });

        }
        // 1.3
    render() {
        const aStyle = {
            cursor: 'pointer'
        };
        let checkname = localStorage.getItem('nameUser');
        console.log(checkname);
        return (
            // <div  >
            //   <header className="header">
            //     <ul className="nameWeb">
            //       <li><a href="#"><i class="fa fa-phone" aria-hidden="true">07045228766</i></a></li>
            //       <li><a href="#"><i class="fas fa-envelope">QueenParty@gmail.com</i></a></li>
            //     </ul>
            //     <div className="right_contain">
            //       <div className="icon">
            //         <i class="fab fa-facebook-square"></i>&ensp;
            //               <i class="fab fa-skype"></i>&ensp;
            //               <i class="fab fa-pinterest-square"></i>
            //       </div>
            //       {/* <div className="user">
            //           <Link to="/cart"><i class="fa fa-shopping-cart" aria-hidden="true" ></i></Link>&ensp;                   
            //           <Link to="/home/login"><a>Đăng nhập</a></Link>
            //           </div> */}

            //       {
            //         this.state.login ? (<div className="user">
            //           <Link to="/" onClick={this.logOut}>Logout</Link>
            //         </div>) : (<div className="user">
            //           <Link to="/home/checkout"><i class="fa fa-shopping-cart" aria-hidden="true" ></i></Link>&ensp;
            //           {this.state.checkLogin === "off"?
            //           <Link to="/home/login"><a>Đăng nhập</a></Link> : 
            //             <Link to="/"><button >Xin chào <b>{checkname}</b></button>&ensp;<a onClick={this.onLogout}>Đăng xuất</a></Link>
            //           }

            //         </div>)
            //       }
            //     </div>
            //   </header>

            //   <div className="navi" >
            //     <div className="small">
            //       <Link to="/"><img src="https://www.linkpicture.com/q/logo2_6.png" alt="" /></Link>
            //       <div className="flex2">
            //         <div className="dn">
            //           <div ><i class="fa fa-home">&ensp;Đà Nẵng</i></div>&ensp;&ensp;
            //         <div><i class="fa fa-truck" aria-hidden="true">&ensp;24/24</i></div>&ensp;
            //         </div>
            //         <div className="flex">
            //          {/* ------------------------------------------ */}
            //           {/* <form onSubmit={this.onchange}>
            //             <input className="input-Search" id="inputsearch" name='txtSearch' type='text' placeholder='Nhập từ khóa...'></input>
            //             {this.state.sear === true ? (<a className='link' href='/image'>X</a>) : ''}
            //             <Link to="/search"><button id="icon" onClick={this.search} ><i class="fas fa-search"></i></button></Link>
            //           </form> */}
            //         </div>

            //       </div>
            //     </div>
            //     <ul>
            //       <li><Link to="/">Giới thiệu</Link></li>
            //       <li><Link to="/home/restaurant" >Nhà hàng & Cửa hàng</Link></li>
            //       <li><Link to="/home/service">Dịch vụ</Link></li>
            //       <li><Link to="/home/contact">Liên hệ</Link></li>
            //     </ul>
            //   </div>

            // </div>
            <div>
                <nav className="mb-1 navbar navbar-expand-lg navbar-dark default-color">
                    <Link to="/"><a className="navbar-brand" >Giới thiệu</a></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-333" aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent-333">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to="/home/restaurant"><a className="nav-link" >Nhà hàng & Cửa hàng</a></Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Dịch vụ</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Liên hệ</a>
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
                                    <i class="fas fa-cart-plus"/>
                                </a>
                            </li>
                            <li className="nav-item">
                                
                                {this.state.login ? (<div className="user">
                                    <Link to="/" onClick={this.logOut}>Logout</Link>
                                    </div>) : (<div className="user">
                                    
                                    {this.state.checkLogin === "off"?
                                    <Link to="/home/login"><a className="nav-link" >Đăng nhập</a></Link> : 
                                        <Link to="/">
                                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-333" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <b>{checkname}</b>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right dropdown-default" aria-labelledby="navbarDropdownMenuLink-333">
                                                <a className="dropdown-item" href="#" onClick={this.onLogout}><Link to="/home/login">Đăng xuất</Link></a>
                                                <a className="dropdown-item" href="#"><Link to="/home/register">Đăng ký</Link></a>
                                                <a className="dropdown-item" href="#"><Link to="/">Quay lại</Link></a>
                                            </div>
                                        </Link>
                                    }
                                    </div>)
                                }
                                
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

        );
    }
}
export default Header;