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
    fetch("http://queen-party-be.herokuapp.com/api/foodrtr").then(
      (response) => {
        response.json().then((data) => {
          console.log(data);
          this.setState({
            foodRestaurant: data,
          });
        });
      }
    );
  }
  getSpeakerRestaurant() {
    fetch("http://queen-party-be.herokuapp.com/api/speakerrtr").then(
      (response) => {
        response.json().then((data) => {
          console.log(data);
          this.setState({
            speakerRestaurant: data,
          });
        });
      }
    );
  }
  getCakeRestaurant() {
    fetch("http://queen-party-be.herokuapp.com/api/cakertr").then(
      (response) => {
        response.json().then((data) => {
          console.log(data);
          this.setState({
            cakeRestaurant: data,
          });
        });
      }
    );
  }
  getDeCorRestaurant() {
    fetch("http://queen-party-be.herokuapp.com/api/decorrtr").then(
      (response) => {
        response.json().then((data) => {
          console.log(data);
          this.setState({
            decorRestaurant: data,
          });
        });
      }
    );
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <div>
          <div class="container">
            <h3 className="title-service">
              Queen Party - Cung cấp hệ thống dịch vụ cao cấp
            </h3>
            <div class="row">
              <div class="col-sm-3">
                <div className="container_cart_content">
                  <a>
                    <img
                      className="imageShow"
                      src="https://firebasestorage.googleapis.com/v0/b/upload-queen.appspot.com/o/Food%2FMemory%2Fcomchien.PNG?alt=media&token=b7026428-c0f6-44d1-a87c-84ef44fc1556"
                      alt=""
                    />
                  </a>
                  <br />
                  <i>
                    Đơn hàng của bạn sẽ được bảo quản như thế nào? Queen Party
                    sẽ bảo quản đơn của bạn bằng túi & thùng để chống nắng mưa,
                    giữ nhiệt... trên đường đi một cách tốt nhất
                  </i>
                </div>
              </div>
              <div class="col-sm-3">
                <div className="container_cart_content">
                  <a>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/upload-queen.appspot.com/o/Speaker%2FDanasound%2FLoa%20Klipsch%20RB%2081II%20(bookshelf).PNG?alt=media&token=1f9b32dd-2e55-4c32-a8c5-b94f02172b78"
                      alt=""
                      className="imageShow"
                    />
                  </a>
                  <br />
                  <i>
                    Loa vi tính, loa có dây đa dạng mẫu mã đến từ các thương
                    hiệu nổi tiếng, âm thanh chất lượng cao. Giao hàng tận nơi
                  </i>
                </div>
              </div>
              <div class="col-sm-3">
                <div className="container_cart_content">
                  <a>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/upload-queen.appspot.com/o/Decor%2FRinDecor%2F4.jpg?alt=media&token=ef60f517-96b6-4559-9056-a5d01b739db0"
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
                <div className="container_cart_content">
                  <a>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/upload-queen.appspot.com/o/Cake%2FdongTien%2Fcake6.jpg?alt=media&token=9b1ad92c-47b9-44c5-920c-ab1f7303cefb"
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
                    <img src={foodr.avatar} class="image" />
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
                    <img src={speakerr.avatar} class="image" />
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
                    <img src={cake.avatar} class="image" />
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
                    <img src={decor.avatar} class="image" />
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
