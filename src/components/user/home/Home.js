import React, { Component } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "../home/Homebig.css";
import "../home/Homesmall.css";
import { get } from "../../services/api.service";
import Search from "../search/Search";
import { Link } from "react-router-dom";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      vendor: [],
      foodRestaurant: [],
      speakerRestaurant: [],
      cakeRestaurant:[],
      decorRestaurant:[]

      // service: [],
      // newVendor: [],
      // topVendor: [],
    };
    this.getVendor();
    this.getFoodRestaurant();
    this.getSpeakerRestaurant();
    this.getCakeRestaurant();
    this.getDeCorRestaurant();
    
    // this.getService();
    // this.getNewVendor();
    // this.getTopVendor();
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
  handleSearch = (search) => {
    var vendorpro = [];
    let oldVendor = JSON.parse(localStorage.getItem("vendor"));
    if (!oldVendor) {
      oldVendor = [];
    }
    if (search.length <= 0 || search === "") {
      this.setState({
        vendor: oldVendor,
        valueSearch: search,
      });
    } else {
      let searchValue = search.toLowerCase();
      console.log("searchValue");
      console.log(searchValue);
      for (var i = 0; i < oldVendor.length; i++) {
        // console.log(oldVendor[i].category.name.toLowerCase().indexOf(searchValue)!= -1)
        if (oldVendor[i].fullname.toLowerCase().indexOf(searchValue) != -1) {
          vendorpro.push(oldVendor[i]);
          // laconsole.log("ccg");
          console.log(vendorpro);
        }
      }
      this.setState({
        vendor: vendorpro,
        valueSearch: search,
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <Header />

        <div>
          <img src="./img/main4.PNG" width="100%" height="auto" alt="" />
          <div class="jumbotron text-center">
            <h1>QUEEN PARTY</h1>
            <p>
              <b>Website đặt tiệc tại nhà</b>
            </p>
            <p>
              Là trang web hàng đầu tại Việt Nam tích hợp nhiều cửa hàng & nhà
              hàng cung cấp dịch vụ nấu nướng và phục vụ tiệc như sinh nhật, tân
              gia, ngày kỷ niệm... tại gia.Khách hàng có thể đặt các món ăn và
              dịch vụ có sẵn trong cửa hàng hoặc tự tạo kế hoạch cho mình, sau
              đó gửi yêu cầu đến các nhà hàng, cửa hàng.
            </p>
          </div>

          <div class="container">
            <div class="row">
              
                {this.state.vendor.map((item) => (
                  <div class="col-sm-4">
                  <div className="img-container">
                    <Link to={"/home/vendor/detail/" + item.id}>
                      {" "}
                      <img
                        src={"http://127.0.0.1:8000/storage/" + item.avatar}
                      />
                    </Link>
                    {this.state.valueSearch && (
                      <h2 className="name_vendor">{item.fullname}</h2>
                    )}
                  </div>
                  </div>
                ))}
            </div><hr/>
          </div>
          
          <div class="container">
            <h3 style={{textAlign:"center"}}>THỨC ĂN</h3>
            <div class="row">             
                {this.state.foodRestaurant.map((foodr) => (
                  <div class="col-sm-3">
                  <div className="foodRestaurant">
                    <Link to={"/home/vendor/detail/" + foodr.id}>
                      {" "}
                      <img
                        src={"http://127.0.0.1:8000/storage/" + foodr.avatar}
                      />
                    </Link>
                    <p >{foodr.name}</p>          
                    {this.state.valueSearch && (
                      <h2 className="name_vendor">{foodr.fullname}</h2>
                    )}
                  </div>
                  </div>
                ))}
            </div><hr/>
          </div>

          <div class="container">
            <h3 style={{textAlign:"center"}}>LOA MÁY</h3>
            <div class="row">             
                {this.state.speakerRestaurant.map((speakerr) => (
                  <div class="col-sm-3">
                  <div className="foodRestaurant">
                    <Link to={"/home/vendor/detail/" + speakerr.id}>
                      {" "}
                      <img
                        src={"http://127.0.0.1:8000/storage/" + speakerr.avatar}
                      />
                    </Link>
                    <p >{speakerr.name}</p>          
                    {this.state.valueSearch && (
                      <h2 className="name_vendor">{speakerr.fullname}</h2>
                    )}
                  </div>
                  </div>
                ))}
            </div><hr/>
          </div>
          <div class="container">
            <h3 style={{textAlign:"center"}}>BÁNH KEM</h3>
            <div class="row">             
                {this.state.cakeRestaurant.map((cake) => (
                  <div class="col-sm-3">
                  <div className="foodRestaurant">
                    <Link to={"/home/vendor/detail/" + cake.id}>
                      {" "}
                      <img
                        src={"http://127.0.0.1:8000/storage/" + cake.avatar}
                      />
                    </Link>
                    <p >{cake.name}</p>          
                    {this.state.valueSearch && (
                      <h2 className="name_vendor">{cake.fullname}</h2>
                    )}
                  </div>
                  </div>
                ))}
            </div><hr/>
          </div>
          <div class="container">
            <h3 style={{textAlign:"center"}}>TRANG TRÍ</h3>
            <div class="row">             
                {this.state.decorRestaurant.map((decor) => (
                  <div class="col-sm-3">
                  <div className="foodRestaurant">
                    <Link to={"/home/vendor/detail/" + decor.id}>
                      {" "}
                      <img
                        src={"http://127.0.0.1:8000/storage/" + decor.avatar}
                      />
                    </Link>
                    <p >{decor.name}</p>          
                    {this.state.valueSearch && (
                      <h2 className="name_vendor">{decor.fullname}</h2>
                    )}
                  </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
