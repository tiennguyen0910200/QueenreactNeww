import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "../home/Homebig.css";
import "../home/Homesmall.css";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      allvendor: [],
      vendor: [],
      foodRestaurant: [],
      speakerRestaurant: [],
      cakeRestaurant: [],
      decorRestaurant: [],
      value: "",
    };
    this.getAllVendor();
    this.getVendor();
    this.getFoodRestaurant();
    this.getSpeakerRestaurant();
    this.getCakeRestaurant();
    this.getDeCorRestaurant();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getAllVendor() {
    fetch("http://queen-party-be.herokuapp.com/api/allvendor").then(
      (response) => {
        response.json().then((data) => {
          console.log(data);
          this.setState({
            allvendor: data,
          });
        });
      }
    );
  }
  getVendor() {
    fetch("http://queen-party-be.herokuapp.com/api/vendor").then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({
          vendor: data,
        });
      });
    });
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
  handleChange(id) {
    this.setState({ value: id.target.value });
  }
  handleSubmit(id) {
    id.preventDefault();
    this.props.history.push("/home/vendor/detail/" + this.state.value);
  }
  render() {
    console.log("home", this.state.vendor);
    return (
      <React.Fragment>
        <Header />

        <div>
          <img src="./img/main4.PNG" width="100%" height="auto" alt="" />

          <div class="container">
            <div className="search">
              <form onSubmit={this.handleSubmit}>
                <select
                  class="form-control"
                  id="sel1"
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                  <option selected>Chọn nhà hàng bạn muốn tìm kiếm!</option>
                  {this.state.allvendor.map((vendor) => (
                    <option value={vendor.id}>{vendor.name}</option>
                  ))}
                </select>
                <button type="submit" value="Submit">
                  Search
                </button>
              </form>
            </div>
            <br />
            <div class="jumbotron text-center">
              <h1>QUEEN PARTY</h1>
              <p>
                <b>Website đặt tiệc tại nhà</b>
              </p>
              <p>
                Là trang web hàng đầu tại Việt Nam tích hợp nhiều cửa hàng & nhà
                hàng cung cấp dịch vụ nấu nướng và phục vụ tiệc như sinh nhật,
                tân gia, ngày kỷ niệm... tại gia.Khách hàng có thể đặt các món
                ăn và dịch vụ có sẵn trong cửa hàng hoặc tự tạo kế hoạch cho
                mình, sau đó gửi yêu cầu đến các nhà hàng, cửa hàng.
              </p>
            </div>
            <div class="row">
              {this.state.vendor.map((item) => (
                <div class="col-sm-4">
                  <div className="img-container">
                    <Link to={"/home/vendor/detail/" + item.id}>
                      {" "}
                      <img src={item.avatar} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <br />
            <hr />
          </div>
          <br />
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
          <br />
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
          <br />
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
          <br />
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
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(Home);
