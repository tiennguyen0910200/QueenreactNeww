import React, { Component } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "../detailFood/DetailFoodbig.css";
import "../detailFood/DetailFoodsmall.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
class DetailFood extends Component {
  constructor(props) {
    super(props);
    let user = localStorage.getItem("idUser");
    this.state = {
      detailProduct: [],
      getdataComment: [],
      orders: [],
      id: "",
      product_id: "",
      btnOrder: false,
      login: user,
      btnComment: false,
      //cart:[]
    };
    var id = props.match.params.id;
    localStorage.setItem("id_product", id);
    // localStorage.setItem("id_vendor", id);
    this.getDetailProduct(id);
    this.getAllComment(id);
    this.onAddComment = this.onAddComment.bind(this);
    this.buttonComment = this.buttonComment.bind(this);
    this.postProductDetail = this.postProductDetail.bind(this);
    this.checkOrder = this.checkOrder.bind(this);
  }
  getDetailProduct(id) {
    fetch("http://127.0.0.1:8000/api/product/detail/" + id).then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({
          detailProduct: data,
        });
      });
    });
  }
  onAddComment(event) {
    event.preventDefault();
    let content = event.target['comment'].value;
    let vendor_id = localStorage.getItem("id_vendor");
    let product_id = localStorage.getItem("id_product");
    // let user_id = event.target['user_id'].value;
    //let user_id = localStorage.getItem('user_id');
    var id = this.props.match.params.id;
    console.log(id);
    console.log(content);
    let comment = {
      user_id: 2,
      content: content,
      vendor_id: vendor_id,
      product_id: product_id
    };

    let postInJson = JSON.stringify(comment);
    console.log(vendor_id);
    fetch("http://127.0.0.1:8000/api/addComment/" + vendor_id, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: postInJson
    })
    .then((response) => {
      console.log(response);
      window.location.reload();
    });
  }
  buttonComment() {
    this.setState({
      btnComment: true,
    });
  }
  myFunction(e) {
    e.preventDefault();
    var x = document.getElementById("myDIV").style;
    if (x.display === "block") {
      x.display = "none";
    } else {
      x.display = "block";
    }
  }
  getAllComment(id) {
    fetch("http://127.0.0.1:8000/api/totalCommentp/" + id).then((response) => {
      console.log(response);
      response.json().then((data) => {
        console.log(data);
        this.setState({
          getdataComment: data,
        });
      });
    });
  }
  postProductDetail(event) {
    if (this.state.login != null) {
      event.preventDefault();
      let user_id = localStorage.getItem("idUser");
      let vendor_id = localStorage.getItem("id_vendor");
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
      }).then((response) => {
        alert("Sản phẩm đã được thêm vào giỏ hàng của bạn!");
        this.props.history.goBack();
      });
    } else {
      alert("Để Order bạn phải đăng nhập/đăng ký");
      this.props.history.push("/home/login");
    }
  }
  checkOrder() {
    this.setState({
      btnOrder: true,
    });
  }
  render() {
    let detailp = this.state.detailProduct;
    return (
      <React.Fragment>
        <Header />
        <div style={{ paddingTop: "10px" }}>
          <div class="container">
            <div class="row">
              <div class="col-sm-6">
                <div className="detail_rtr">
                  <img
                    src={"http://127.0.0.1:8000/storage/" + detailp.picture}
                    alt=""
                  />
                </div>
              </div>
              <div class="col-sm-6">
                <h4>{detailp.name}</h4>
                <br />
                <p>Mô tả: {detailp.description}</p>
                <p>Giá: {detailp.price}đ</p>
                <p>Giảm giá: {detailp.discount}</p>
                <div className="flex">
                  <i class="far fa-star"></i>&ensp;
                  <i class="far fa-star"></i>&ensp;
                  <i class="far fa-star"></i>
                </div>

                <div className="detail-button">
                  <button onClick={this.myFunction}>
                    <i class="far fa-comment-dots">Viết đánh giá</i>
                  </button>
                  &emsp;
                  <button onClick={this.postProductDetail} type="submit">
                    <i class="fas fa-cart-plus">Đặt</i>                   
                  </button>
                </div>
                <div id="myDIV">
                  <form onSubmit={this.onAddComment}>
                    <input
                      placeholder="Viết đánh giá..."
                      name="comment"
                    ></input>
                    <button type="submit">Đăng</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="container">
            <hr />
            <div class="row">
              <div class="col-sm-12">
                <h1>Đánh giá</h1>
                <div className="danhGia">
                  {this.state.getdataComment.map((comment) => (
                    <div>
                      <h6>{comment.name}</h6>
                      <p>{comment.content}</p>
                    </div>
                  ))}
                  <br />
                  <form onSubmit={this.onAddComment}>
                    <input
                      placeholder="Viết đánh giá..."
                      name="comment"
                    ></input>
                    <button type="submit">Đăng</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(DetailFood);
