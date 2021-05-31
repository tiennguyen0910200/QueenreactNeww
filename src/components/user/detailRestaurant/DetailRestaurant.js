import React, { Component } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "../detailRestaurant/DetailRestaurantbig.css";
import "../detailRestaurant/DetailRestaurantsmall.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class DetailRestaurant extends Component {
  constructor(props) {
    super(props);
    let user = localStorage.getItem("idUser");
    this.state = {
      detail: [],
      product: [],
      login: user,
      getdataComment: [],
      btnComment: false,
    };
    var id = props.match.params.id;
    localStorage.setItem("vendor_id", id);
    //localStorage.setItem("id_product", id);
    this.getDetail(id);
    this.getProduct(id);
    this.getAllComment(id);
    this.onAddComment = this.onAddComment.bind(this);
    this.buttonComment = this.buttonComment.bind(this);
  }
  getDetail(id) {
    fetch("http://127.0.0.1:8000/api/vendor/detail/" + id).then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({
          detail: data,
        });
      });
    });
  }
  getProduct(id) {
    fetch("http://127.0.0.1:8000/api/getproduct/" + id).then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({
          product: data,
        });
      });
    });
  }
  getAllComment(id) {
    fetch("http://127.0.0.1:8000/api/totalComment/" + id).then((response) => {
      console.log(response);
      response.json().then((data) => {
        console.log(data);
        this.setState({
          getdataComment: data,
        });
      });
    });
  }
  onAddComment(event) {
    if (this.state.login != null) {
      event.preventDefault();
      let content = event.target["comment"].value;
      let vendor_id = localStorage.getItem("vendor_id");
      //let user_id = event.target['user_id'].value;
      let user_id = localStorage.getItem("idUser");
      var id = this.props.match.params.id;
      console.log(id);
      console.log(content);
      let comment = {
        user_id: user_id,
        content: content,
        vendor_id: id,
      };
      let postInJson = JSON.stringify(comment);
      console.log(vendor_id);
      fetch("http://127.0.0.1:8000/api/addCommentvendor/" + vendor_id, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: postInJson,
      }).then((response) => {
        console.log(response);
        window.location.reload();
      });
    } else {
      alert("Để đánh giá bạn phải đăng nhập/đăng ký");
      this.props.history.push("/home/login");
    }
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
  buttonComment() {
    this.setState({
      btnComment: true,
    });
  }
  render() {
    let detail = this.state.detail;
    return (
      <React.Fragment>
        <Header />
        <div>
          <div style={{ paddingTop: "10px" }}>
            <div class="container">
              <div class="row">
                <div class="col-sm-6">
                  <div className="detail_rtr">
                    <img src={detail.avatar} alt="" />
                  </div>
                </div>
                <div class="col-sm-6">
                  <h1>{detail.name}</h1>
                  <br />
                  <p>Phone:{detail.phone}</p>
                  <p>Email:{detail.email}</p>
                  <p>Address:{detail.address}</p>
                  <p>Description:{detail.description}</p>
                  <div className="detail-button">
                    <button onClick={this.myFunction}>
                      <i class="far fa-comment-dots">Viết đánh giá</i>
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
              <hr />
            </div>
            <div class="container">
              <h2 style={{ color: "#eba28c" }}>Welcome</h2>
              <div class="row">
                {this.state.product.map((product) => (
                  <div class="col-sm-3">
                    <div className="foodRestaurant">
                      <Link to={"/home/product/detail/" + product.id}>
                        {" "}
                        <img src={product.picture} className="image" />
                        <div class="middle">
                          <div class="text">
                            <p>{product.price}</p>
                          </div>
                        </div>
                      </Link>
                      <p>{product.name}</p>
                    </div>
                  </div>
                ))}
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
          <br />
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
export default withRouter(DetailRestaurant);
