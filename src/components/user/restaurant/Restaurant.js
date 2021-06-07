import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "../restaurant/Restaurantbig.css";
import "../restaurant/Restaurantsmall.css";
class Restaurant extends Component {
  constructor() {
    super();
    this.state = {
      foodrestaurant: [],
      cakerestaurant: [],
      speakerrestaurant: [],
      decorrestaurant: [],
    };
    this.getFoodRestaurant();
    this.getCakeRestaurant();
    this.getSpeakerRestaurant();
    this.getDecorRestaurant();
  }
  getFoodRestaurant() {
    fetch("http://queen-party-be.herokuapp.com/api/allfoodrtr").then(
      (response) => {
        response.json().then((data) => {
          console.log(data);
          this.setState({
            foodrestaurant: data,
          });
        });
      }
    );
  }
  getCakeRestaurant() {
    fetch("http://queen-party-be.herokuapp.com/api/allcakertr").then(
      (response) => {
        response.json().then((data) => {
          console.log(data);
          this.setState({
            cakerestaurant: data,
          });
        });
      }
    );
  }
  getSpeakerRestaurant() {
    fetch("http://queen-party-be.herokuapp.com/api/allspeakerrtr").then(
      (response) => {
        response.json().then((data) => {
          console.log(data);
          this.setState({
            speakerrestaurant: data,
          });
        });
      }
    );
  }
  getDecorRestaurant() {
    fetch("http://queen-party-be.herokuapp.com/api/alldecorrtr").then(
      (response) => {
        response.json().then((data) => {
          console.log(data);
          this.setState({
            decorrestaurant: data,
          });
        });
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
          <div class="container">
            <div class="row">
              <div class="col-sm-3">
                <div className="left_dm">
                  <div className="danhmuc">
                    <ul>
                      <li>
                        <a class="active" href="#home">
                          Danh mục
                        </a>
                      </li>
                      <li>
                        <a href="#news">Nhà hàng & cửa hàng</a>
                      </li>
                      <li>
                        <a href="#contact">Nhà hàng mới nhất</a>
                      </li>
                      <li>
                        <a href="#about">Nhà hàng thịnh hành</a>
                      </li>
                      <li>
                        <a href="#contact">Nhà hàng yêu thích</a>
                      </li>
                      <li>
                        <a href="#about">Nhà hàng liên quan</a>
                      </li>
                      <li>
                        <a href="#about">Dịch vụ thức ăn</a>
                      </li>
                      <li>
                        <a href="#about">Dịch vụ bánh kem</a>
                      </li>
                      <li>
                        <a href="#about">Dịch vụ trang trí</a>
                      </li>
                      <li>
                        <a href="#about">Dịch vụ loa máy</a>
                      </li>
                    </ul>
                  </div>
                  <br />
                  <div className="camket">
                    <ul>
                      <li>
                        <a class="active" href="#home">
                          Cam kết bền vững
                        </a>
                      </li>
                      <li>
                        <img
                          src="https://www.linkpicture.com/q/camket.jpg"
                          alt=""
                          width="268px"
                          height="130px"
                        />
                      </li>
                      <li>
                        <label>
                          <input type="checkbox" checked="checked" />
                          &ensp;Cam kết nguồn gốc
                        </label>
                        <br />
                        <label>
                          <input type="checkbox" checked="checked" />
                          &ensp;Cam kết chất lượng
                        </label>
                        <br />
                        <label>
                          <input type="checkbox" checked="checked" />
                          &ensp;Cam kết giá sản phẩm
                        </label>
                        <br />
                        <label>
                          <input type="checkbox" checked="checked" />
                          &ensp;Cam kết thời gian
                        </label>
                        <br />
                        <label>
                          <input type="checkbox" checked="checked" />
                          &ensp;Cam kết nguyên vẹn
                        </label>
                        <br />
                        <label>
                          <input type="checkbox" checked="checked" />
                          &ensp;Cam kết giá cả
                        </label>
                        <br />
                        <label>
                          <input type="checkbox" checked="checked" />
                          &ensp;Cam kết hoàn tiền 100%
                        </label>
                      </li>
                    </ul>
                  </div>
                  <br />
                  <div className="giatri">
                    <ul>
                      <li>
                        <a class="active" href="#home">
                          Giá trị bền vững
                        </a>
                      </li>
                      <li>
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/upload-queen.appspot.com/o/giatri.jpg?alt=media&token=86c08712-ceee-4f87-9865-2d4dda8addb5"
                          alt=""
                          width="268px"
                          height="130px"
                        />
                      </li>
                      <li>
                        <i class="fas fa-tags">&ensp;Ưu đãi tốt nhất</i>
                      </li>
                      <li>
                        <i class="fas fa-truck">&ensp;Đáp ứng mọi yêu cầu</i>
                      </li>
                      <li>
                        <i class="fas fa-home">&ensp;Phục vụ tận nhà</i>
                      </li>
                      <li>
                        <i class="far fa-money-bill-alt">&ensp;Giá cả hợp lí</i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="container">
                  <h3>Dịch Vụ Thức Ăn</h3>
                  <div class="row">
                    {this.state.foodrestaurant.map((food) => (
                      <div class="col-sm-4">
                        <div>
                          <div className="allfoodRestaurant">
                            <img src={food.avatar} className="image" />
                            <Link to={"/home/vendor/detail/" + food.id}>
                              <div class="middle">
                                <div class="text">Xem</div>
                              </div>
                            </Link>
                          </div>
                          <p>{food.name}</p>
                        </div>
                      </div>
                    ))}
                    <hr />
                  </div>
                </div>
                <div class="container">
                  <h3>Dịch Vụ Bánh Kem</h3>
                  <div class="row">
                    {this.state.cakerestaurant.map((cake) => (
                      <div class="col-sm-4">
                        <div>
                          <div className="allfoodRestaurant">
                            <img src={cake.avatar} className="image" />
                            <Link to={"/home/vendor/detail/" + cake.id}>
                              <div class="middle">
                                <div class="text">Xem</div>
                              </div>
                            </Link>
                          </div>
                          <p>{cake.name}</p>
                        </div>
                      </div>
                    ))}
                    <hr />
                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <h3>Dịch Vụ Loa Máy</h3>
              <div class="row">
                {this.state.speakerrestaurant.map((speaker) => (
                  <div class="col-sm-3">
                    <div>
                      <div className="allfoodRestaurant">
                        <img src={speaker.avatar} className="image" />
                        <Link to={"/home/vendor/detail/" + speaker.id}>
                          <div class="middle">
                            <div class="text">Xem</div>
                          </div>
                        </Link>
                      </div>
                      <p>{speaker.name}</p>
                    </div>
                  </div>
                ))}
                <hr />
              </div>
            </div>
            <div class="container">
              <h3>Dịch Vụ Trang Trí</h3>
              <div class="row">
                {this.state.decorrestaurant.map((decor) => (
                  <div class="col-sm-3">
                    <div>
                      <div className="allfoodRestaurant">
                        <img src={decor.avatar} className="image" />
                        <Link to={"/home/vendor/detail/" + decor.id}>
                          <div class="middle">
                            <div class="text">Xem</div>
                          </div>
                        </Link>
                      </div>
                      <p>{decor.name}</p>
                    </div>
                  </div>
                ))}
                <hr />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(Restaurant);
