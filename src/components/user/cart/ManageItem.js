import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./Checkout.css";

export default class ManageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.ReviewSubmit = this.ReviewSubmit.bind(this);
  }

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value,
    });
  }
  ReviewSubmit(event) {
    event.preventDefault();
    let user_id = localStorage.getItem("idUser");
    let product_id = localStorage.getItem("product_id");
    // var id = this.props.match.params.id;

    let quantity = this.state.selectedOption;
    let review = {
      quantity: quantity,
      user_id: user_id,
      product_id: product_id,
    };
    let postInJson = JSON.stringify(review);
    fetch("http://127.0.0.1:8000/api/product/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: postInJson,
    }).then((response) => {
      response.json().then((review) => {
        alert("Cảm ơn bạn đã đánh giá sản phẩm");
        this.props.history.push("/");
      });
    });
  }
  render() {
    return (
      <div>
        <h3>
          <span>{this.props.obj.name}</span>
        </h3>
        <div className="product-flex">
          <table>
            {this.props.obj.productOrder.map((items) => {
              return (
                <div>
                  {items.product.map((item) => {
                    return (
                      <tr>
                        <td style={{ paddingLeft: "5px" }}>
                          <img className="imageCheck" src={item.picture} />
                        </td>
                        <td
                          style={{
                            paddingLeft: "80px",
                            width: "400px",
                          }}
                        >
                          {item.name}
                        </td>

                        <td style={{ paddingLeft: "40px" }}>
                          {new Intl.NumberFormat("ar-US").format(
                            item.price * items.quantity
                          )}
                          &ensp;<span>VNĐ</span>
                        </td>
                        <td>
                          <button
                            style={{
                              float: "right",
                              marginLeft: "200px",
                              marginTop: "20px",
                            }}
                            type="button"
                            className="btn btn-primary"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                          >
                            Đánh giá
                          </button>
                        </td>
                        {/* <!-- Modal --> */}
                        <div
                          className="modal fade"
                          id="exampleModalCenter"
                          tabindex="-1"
                          role="dialog"
                          aria-labelledby="exampleModalCenterTitle"
                          aria-hidden="true"
                        >
                          <div
                            className="modal-dialog modal-dialog-centered"
                            role="document"
                          >
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalCenterTitle"
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                  }}
                                >
                                  <img
                                    style={{ width: "70px" }}
                                    src={item.picture}
                                  />
                                  <div>
                                    <h4
                                      style={{
                                        fontStyle: "italic",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {item.ProdName}
                                    </h4>
                                    <h6
                                      style={{
                                        fontStyle: "italic",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {item.name}
                                    </h6>
                                  </div>
                                </h5>
                                <button
                                  type="button"
                                  class="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <div style={{ textAlign: "center" }}>
                                  <h4 style={{ marginLeft: "130px" }}>
                                    Vui lòng đánh giá
                                  </h4>
                                  <div style={{ marginLeft: "10px" }}>
                                    <div className="stars" id="review">
                                      <form
                                        action=""
                                        onSubmit={this.ReviewSubmit}
                                      >
                                        <input
                                          className="star star-5"
                                          id="star-5"
                                          type="radio"
                                          name="star"
                                          value="5"
                                          checked={
                                            this.state.selectedOption === "5"
                                          }
                                          onChange={this.onValueChange}
                                        />
                                        <label
                                          className="star star-5"
                                          for="star-5"
                                        ></label>
                                        <input
                                          className="star star-4"
                                          id="star-4"
                                          type="radio"
                                          name="star"
                                          value="4"
                                          checked={
                                            this.state.selectedOption === "4"
                                          }
                                          onChange={this.onValueChange}
                                        />
                                        <label
                                          className="star star-4"
                                          for="star-4"
                                        ></label>
                                        <input
                                          className="star star-3"
                                          id="star-3"
                                          type="radio"
                                          name="star"
                                          value="3"
                                          checked={
                                            this.state.selectedOption === "3"
                                          }
                                          onChange={this.onValueChange}
                                        />
                                        <label
                                          className="star star-3"
                                          for="star-3"
                                        ></label>
                                        <input
                                          className="star star-2"
                                          id="star-2"
                                          type="radio"
                                          name="star"
                                          value="2"
                                          checked={
                                            this.state.selectedOption === "2"
                                          }
                                          onChange={this.onValueChange}
                                        />
                                        <label
                                          className="star star-2"
                                          for="star-2"
                                        ></label>
                                        <input
                                          className="star star-1"
                                          id="star-1"
                                          type="radio"
                                          name="star"
                                          value="1"
                                          checked={
                                            this.state.selectedOption === "1"
                                          }
                                          onChange={this.onValueChange}
                                        />
                                        <label
                                          className="star star-1"
                                          for="star-1"
                                        ></label>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-dismiss="modal"
                                >
                                  Thoát
                                </button>
                                <form
                                  method="POST"
                                  onSubmit={this.ReviewSubmit}
                                  action=""
                                >
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    Gửi đánh giá
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </tr>
                    );
                  })}
                </div>
              );
            })}
          </table>{" "}
        </div>
        <hr className="hr-payment" />
      </div>
    );
  }
}
