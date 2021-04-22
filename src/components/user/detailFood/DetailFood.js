import React, { Component } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import '../detailFood/DetailFoodbig.css';
import '../detailFood/DetailFoodsmall.css';
import {
  Link
}
  from "react-router-dom";
import { withRouter } from 'react-router';
class DetailFood extends Component {
  constructor(props) {
    super(props);
    let user = localStorage.getItem("idUser");
    this.state = {
      detailProduct: [],
      orders: [],
      id: "",
      product_id: "",
      btnOrder: false,
      login: user
      //cart:[]     
    }
    var id = props.match.params.id;
    this.getDetailProduct(id);
    this.postProductDetail = this.postProductDetail.bind(this);
    this.checkOrder =this.checkOrder.bind(this);
    
  }
  getDetailProduct(id) {
    fetch("http://127.0.0.1:8000/api/product/detail/" + id)
      .then(response => {
        response.json().then((data) => {
          console.log(data);
          this.setState({
            detailProduct: data
          })
        });
      });
  }
  postProductDetail(event) {
    if(this.state.login != null){
    event.preventDefault();
    let user_id = localStorage.getItem('idUser');
    let vendor_id = localStorage.getItem('id_vendor');
    var id = this.props.match.params.id;
    let orders = {
      product_id: id,
      user_id: user_id,
      vendor_id: vendor_id,
    };
    let postInJson = JSON.stringify(orders);
    fetch("http://127.0.0.1:8000/api/product/orderlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: postInJson,
    }).then(response => {
      alert('Sản phẩm đã được thêm vào giỏ hàng của bạn!');
      this.props.history.goBack()

    });
    }
    else{
      alert("Để Order bạn phải đăng nhập/đăng ký");
      this.props.history.push("/home/login");
    }
  }
  checkOrder(){
    this.setState({
        btnOrder: true
    })
}
  render() {
    let detailp = this.state.detailProduct;
    return (
      <React.Fragment>
        <Header />
        <div className="detaillFood">
          <div className="flex">
            <div className="left_dm">
              <div className="danhmuc">
                <ul>
                  <li><a class="active" href="#home">Danh mục</a></li>
                  <li><a href="#news">Nhà hàng & cửa hàng</a></li>
                  <li><a href="#contact">Nhà hàng mới nhất</a></li>
                  <li><a href="#about">Nhà hàng thịnh hành</a></li>
                  <li><a href="#contact">Nhà hàng yêu thích</a></li>
                  <li><a href="#about">Nhà hàng liên quan</a></li>
                </ul>
              </div><br />
              <div className="camket">
                <ul>
                  <li><a class="active" href="#home">Cam kết bền vững</a></li>
                  <li><img src="https://www.linkpicture.com/q/camket.jpg" alt="" width="268px" height="130px" /></li>
                  <li>
                    <label>
                      <input type="checkbox" checked="checked" />&ensp;Đúng nguồn gốc
                </label><br />
                    <label>
                      <input type="checkbox" checked="checked" />&ensp;Đúng chất lượng
                </label><br />
                    <label>
                      <input type="checkbox" checked="checked" />&ensp;Đúng giá sản phẩm
                </label><br />
                    <label>
                      <input type="checkbox" checked="checked" />&ensp;Cam kết hoàn tiền 100%
                </label>
                  </li>
                </ul>
              </div>
            </div>
            <div className="detail_order">
              <h1>{detailp.name_product}</h1>
              <hr />
              <div className="flex">
                <div className="detail_order_name">
                  <div>
                    <img src={'http://127.0.0.1:8000/storage/' + detailp.picture} alt="" width="350px" height="250px" />
                  </div>
                  <div className="detail-content">
                    <p>Mô tả: {detailp.description}</p><br />
                    <p>Giá: {detailp.price}đ</p><br />
                    <p>Giảm giá: {detailp.discount}</p><br />
                    <div className="flex">
                      <i class="far fa-star"></i>&ensp;
                  <i class="far fa-star"></i>&ensp;
                  <i class="far fa-star"></i>
                    </div>


                  </div>

                </div>
              </div>
              
              <div className="dat">
                <button onClick={this.postProductDetail}
                  type="submit">Đặt</button>
              </div>  
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

export default withRouter(DetailFood);