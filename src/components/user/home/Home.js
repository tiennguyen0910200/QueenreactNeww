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
    fetch("http://127.0.0.1:8000/api/allvendor").then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({
          allvendor: data,
        });
      });
    });
  }
  getVendor() {
    fetch("http://127.0.0.1:8000/api/vendor").then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({
          vendor: data,
        });
      });
    });
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
                  <option selected>Ch???n nh?? h??ng b???n mu???n t??m ki???m!</option>
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
                <b>Website ?????t ti???c t???i nh??</b>
              </p>
              <p>
                L?? trang web h??ng ?????u t???i Vi???t Nam t??ch h???p nhi???u c???a h??ng & nh??
                h??ng cung c???p d???ch v??? n???u n?????ng v?? ph???c v??? ti???c nh?? sinh nh???t,
                t??n gia, ng??y k??? ni???m... t???i gia.Kh??ch h??ng c?? th??? ?????t c??c m??n
                ??n v?? d???ch v??? c?? s???n trong c???a h??ng ho???c t??? t???o k??? ho???ch cho
                m??nh, sau ???? g???i y??u c???u ?????n c??c nh?? h??ng, c???a h??ng.
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
            <h3 style={{ textAlign: "center" }}>TH???C ??N</h3>
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
            <h3 style={{ textAlign: "center" }}>LOA M??Y</h3>
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
            <h3 style={{ textAlign: "center" }}>B??NH KEM</h3>
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
            <h3 style={{ textAlign: "center" }}>TRANG TR??</h3>
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
