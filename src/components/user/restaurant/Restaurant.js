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
    fetch("http://127.0.0.1:8000/api/allfoodrtr").then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({
          foodrestaurant: data,
        });
      });
    });
  }
  getCakeRestaurant() {
    fetch("http://127.0.0.1:8000/api/allcakertr").then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({
          cakerestaurant: data,
        });
      });
    });
  }
  getSpeakerRestaurant() {
    fetch("http://127.0.0.1:8000/api/allspeakerrtr").then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({
          speakerrestaurant: data,
        });
      });
    });
  }
  getDecorRestaurant() {
    fetch("http://127.0.0.1:8000/api/alldecorrtr").then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({
          decorrestaurant: data,
        });
      });
    });
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
                          Danh m???c
                        </a>
                      </li>
                      <li>
                        <a href="#news">Nh?? h??ng & c???a h??ng</a>
                      </li>
                      <li>
                        <a href="#contact">Nh?? h??ng m???i nh???t</a>
                      </li>
                      <li>
                        <a href="#about">Nh?? h??ng th???nh h??nh</a>
                      </li>
                      <li>
                        <a href="#contact">Nh?? h??ng y??u th??ch</a>
                      </li>
                      <li>
                        <a href="#about">Nh?? h??ng li??n quan</a>
                      </li>
                      <li>
                        <a href="#about">D???ch v??? th???c ??n</a>
                      </li>
                      <li>
                        <a href="#about">D???ch v??? b??nh kem</a>
                      </li>
                      <li>
                        <a href="#about">D???ch v??? trang tr??</a>
                      </li>
                      <li>
                        <a href="#about">D???ch v??? loa m??y</a>
                      </li>
                    </ul>
                  </div>
                  <br />
                  <div className="camket">
                    <ul>
                      <li>
                        <a class="active" href="#home">
                          Cam k???t b???n v???ng
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
                          &ensp;Cam k???t ngu???n g???c
                        </label>
                        <br />
                        <label>
                          <input type="checkbox" checked="checked" />
                          &ensp;Cam k???t ch???t l?????ng
                        </label>
                        <br />
                        <label>
                          <input type="checkbox" checked="checked" />
                          &ensp;Cam k???t gi?? s???n ph???m
                        </label>
                        <br />
                        <label>
                          <input type="checkbox" checked="checked" />
                          &ensp;Cam k???t th???i gian
                        </label>
                        <br />
                        <label>
                          <input type="checkbox" checked="checked" />
                          &ensp;Cam k???t nguy??n v???n
                        </label>
                        <br />
                        <label>
                          <input type="checkbox" checked="checked" />
                          &ensp;Cam k???t gi?? c???
                        </label>
                        <br />
                        <label>
                          <input type="checkbox" checked="checked" />
                          &ensp;Cam k???t ho??n ti???n 100%
                        </label>
                      </li>
                    </ul>
                  </div>
                  <br />
                  <div className="giatri">
                    <ul>
                      <li>
                        <a class="active" href="#home">
                          Gi?? tr??? b???n v???ng
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
                        <i class="fas fa-tags">&ensp;??u ????i t???t nh???t</i>
                      </li>
                      <li>
                        <i class="fas fa-truck">&ensp;????p ???ng m???i y??u c???u</i>
                      </li>
                      <li>
                        <i class="fas fa-home">&ensp;Ph???c v??? t???n nh??</i>
                      </li>
                      <li>
                        <i class="far fa-money-bill-alt">&ensp;Gi?? c??? h???p l??</i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="container">
                  <h3>D???ch V??? Th???c ??n</h3>
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
                  <h3>D???ch V??? B??nh Kem</h3>
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
              <h3>D???ch V??? Loa M??y</h3>
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
              <h3>D???ch V??? Trang Tr??</h3>
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
