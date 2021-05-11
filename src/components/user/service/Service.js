import React, { Component } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "../service/Servicebig.css";
import "../service/Servicesmall.css";
import { Link } from "react-router-dom";
class Service extends Component {
  constructor() {
    super();
    this.state = {
      foodRestaurant: [],
      speakerRestaurant: [],
      cakeRestaurant: [],
      decorRestaurant: [],
    };
    this.getFoodRestaurant();
    this.getSpeakerRestaurant();
    this.getCakeRestaurant();
    this.getDeCorRestaurant();
  }
  getFoodRestaurant() {
    fetch("http://127.0.0.1:8000/api/foodrtr").then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({
          foodRestaurant: data,
        });
      });
    });
  }
  getSpeakerRestaurant() {
    fetch("http://127.0.0.1:8000/api/speakerrtr").then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({
          speakerRestaurant: data,
        });
      });
    });
  }
  getCakeRestaurant() {
    fetch("http://127.0.0.1:8000/api/cakertr").then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({
          cakeRestaurant: data,
        });
      });
    });
  }
  getDeCorRestaurant() {
    fetch("http://127.0.0.1:8000/api/decorrtr").then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({
          decorRestaurant: data,
        });
      });
    });
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <div>
          <div class="container">
          <h2 className="title-service">
            Queen Party - Cung cấp hệ thống dịch vụ cao cấp
          </h2>
            <div class="row">
              <div class="col-sm-3">
              <div
                className="container_cart_content"
               
              >
                <a>
                  <img
                    className="imageShow"
                    src="../img/food_content/comchien.jpg"
                    alt=""
                  />
                </a>
                <br />
                <i>
                  Đơn hàng của bạn sẽ được bảo quản như thế nào? Queen Party sẽ
                  bảo quản đơn của bạn bằng túi & thùng để chống nắng mưa, giữ
                  nhiệt... trên đường đi một cách tốt nhất
                </i>
              </div>
              </div>
              <div class="col-sm-3">
              <div
                className="container_cart_content"
                
              >
                <a>
                  <img
                    src="../img/Speaker/loa2.jpg"
                    alt=""
                    className="imageShow"
                  />
                </a>
                <br />
                <i>
                  Loa vi tính, loa có dây đa dạng mẫu mã đến từ các thương hiệu
                  nổi tiếng, âm thanh chất lượng cao. Giao hàng tận nơi
                </i>
              </div>
              </div>
              <div class="col-sm-3">
              <div
                className="container_cart_content"
                
              >
                <a>
                  <img
                    src="../img/Table/ban1.jpeg"
                    alt=""
                    className="imageShow"
                  />
                </a>
                <br />
                <i>
                  Đồ trang trí nội thất trong nhà, shop bán đồ trang trí decor
                  phòng khách, phòng ngủ, giá rẻ nhất thị trường, sản phẩm đa
                  dạng độc đáo
                </i>
              </div>
              </div>
              <div class="col-sm-3">
              <div
                className="container_cart_content"
               
              >
                <a>
                  <img
                    src="../img/Cake/cake4.jpg"
                    alt=""
                    className="imageShow"
                  />
                </a>
                <br />
                <i>
                  Tổng hợp loại bánh làm bằng bột mì hay bột gạo có hương vị
                  ngọt, mặn, béo...có thể hấp, nướng, chiên
                </i>
              </div>
              </div>
            </div>
          </div>
          
          
          <br></br>
          {/* Line1 */}
          <div class="container">
            <h3 style={{ textAlign: "center" }}>THỨC ĂN</h3>
            <div class="row">
              {this.state.foodRestaurant.map((foodr) => (
                <div class="col-sm-3">
                  <div className="foodRestaurant">
                    <img
                      src={"http://127.0.0.1:8000/storage/" + foodr.avatar}
                      class="image"
                    />
                    <Link to={"/home/vendor/detail/" + foodr.id}>
                      {" "}
                      <div class="middle">
                        <div class="text">Xem</div>
                      </div>
                    </Link>
                    <p>{foodr.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <hr />
          </div>
          <div class="container">
            <h3 style={{ textAlign: "center" }}>LOA MÁY</h3>
            <div class="row">
              {this.state.speakerRestaurant.map((speakerr) => (
                <div class="col-sm-3">
                  <div className="foodRestaurant">
                    <img
                      src={"http://127.0.0.1:8000/storage/" + speakerr.avatar}
                      class="image"
                    />
                    <Link to={"/home/vendor/detail/" + speakerr.id}>
                      {" "}
                      <div class="middle">
                        <div class="text">Xem</div>
                      </div>
                    </Link>
                    <p>{speakerr.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <hr />
          </div>
          <div class="container">
            <h3 style={{ textAlign: "center" }}>BÁNH KEM</h3>
            <div class="row">
              {this.state.cakeRestaurant.map((cake) => (
                <div class="col-sm-3">
                  <div className="foodRestaurant">
                    <img src={"http://127.0.0.1:8000/storage/" + cake.avatar} class="image" />
                    <Link to={"/home/vendor/detail/" + cake.id}>
                      {" "}
                      <div class="middle">
                        <div class="text">Xem</div>
                      </div>
                    </Link>
                    <p>{cake.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <hr />
          </div>
          <div class="container">
            <h3 style={{ textAlign: "center" }}>TRANG TRÍ</h3>
            <div class="row">
              {this.state.decorRestaurant.map((decor) => (
                <div class="col-sm-3">
                  <div className="foodRestaurant">
                    <img
                      src={"http://127.0.0.1:8000/storage/" + decor.avatar}
                      class="image"
                    />
                    <Link to={"/home/vendor/detail/" + decor.id}>
                      {" "}
                      <div class="middle">
                        <div class="text">Xem</div>
                      </div>
                    </Link>
                    <p>{decor.name}</p>
                  </div>
                </div>
              ))}
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
export default Service;
