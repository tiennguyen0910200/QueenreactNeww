import React, { Component } from "react";
import "../restaurant/Restaurantbig.css";
import "../restaurant/Restaurantsmall.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
class Restaurant extends Component {
  constructor() {
    super();
    this.state = {
      foodrestaurant: [],
      cakerestaurant: [],
      speakerrestaurant: [],
      decorrestaurant: []   
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
                          &ensp;Đúng nguồn gốc
                        </label>
                        <br />
                        <label>
                          <input type="checkbox" checked="checked" />
                          &ensp;Đúng chất lượng
                        </label>
                        <br />
                        <label>
                          <input type="checkbox" checked="checked" />
                          &ensp;Đúng giá sản phẩm
                        </label>
                        <br />
                        <label>
                          <input type="checkbox" checked="checked" />
                          &ensp;Cam kết hoàn tiền 100%
                        </label>
                      </li>
                    </ul>
                  </div>
                  <br/>
                  <div className="giatri">
                    <ul>
                      <li><a class="active" href="#home">Giá trị bền vững</a></li>
                      <li><img src="https://i.imgur.com/dsPRDTv.jpg" alt="" width="268px" height="130px"/></li>
                      <li><i class="fas fa-tags">&ensp;Ưu đãi tốt nhất</i></li>
                      <li><i class="fas fa-truck">&ensp;Đáp ứng mọi yêu cầu</i></li>
                      <li><i class="fas fa-home">&ensp;Phục vụ tận nhà</i></li>
                      <li><i class="far fa-money-bill-alt">&ensp;Giá cả hợp lí</i></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-sm-8">
               <div class="container">
               <h3>Dịch Vụ Thức Ăn</h3>
                 <div class="row">
                   
                   {this.state.foodrestaurant.map((food)=>
                   <div class="col-sm-4">
                    <div>
                      <div className="allfoodRestaurant">
                      <Link to ={'/home/vendor/detail/'+food.id}><img src={'http://127.0.0.1:8000/storage/'+ food.avatar }/> </Link>
                      </div>
                      <p >{food.name}</p>  
                      </div>                         
                    </div>
                  )}
                  <hr/>
                 </div>
                 
               </div>
               <div class="container">
               <h3>Dịch Vụ Bánh Kem</h3>
                 <div class="row">
                   
                   {this.state.cakerestaurant.map((cake)=>
                   <div class="col-sm-4">
                    <div>
                      <div className="allfoodRestaurant">
                      <Link to ={'/home/vendor/detail/'+cake.id}><img src={'http://127.0.0.1:8000/storage/'+ cake.avatar }/> </Link>
                      </div>
                      <p >{cake.name}</p>  
                      </div>                         
                    </div>
                  )}
                  <hr/>
                 </div>
                 
               </div>
               <div class="container">
               <h3>Dịch Vụ Loa Máy</h3>
                 <div class="row">
                   
                   {this.state.speakerrestaurant.map((speaker)=>
                   <div class="col-sm-4">
                    <div>
                      <div className="allfoodRestaurant">
                      <Link to ={'/home/vendor/detail/'+speaker.id}><img src={'http://127.0.0.1:8000/storage/'+ speaker.avatar }/> </Link>
                      </div>
                      <p >{speaker.name}</p>  
                      </div>                         
                    </div>
                  )}
                  <hr/>
                 </div>
                 
               </div>
               <div class="container">
               <h3>Dịch Vụ Trang Trí</h3>
                 <div class="row">
                   
                   {this.state.decorrestaurant.map((decor)=>
                   <div class="col-sm-4">
                    <div>
                      <div className="allfoodRestaurant">
                      <Link to ={'/home/vendor/detail/'+decor.id}><img src={'http://127.0.0.1:8000/storage/'+ decor.avatar }/> </Link>
                      </div>
                      <p >{decor.name}</p>  
                      </div>                         
                    </div>
                  )}
                  <hr/>
                 </div>
                 
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

export default withRouter(Restaurant);
