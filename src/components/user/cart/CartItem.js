import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./Checkout.css";

export default class ExpenseTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
    this.deletecart = this.deletecart;
    this.onIncrease = this.onIncrease;
    this.onDecrease = this.onDecrease;
  }

  deletecart(itemId) {
    axios
      .delete("http://queen-party-be.herokuapp.com/api/deletecart/" + itemId)
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onIncrease(itemId) {
    let product_id = localStorage.getItem("product_id");
    fetch(
      "http://queen-party-be.herokuapp.com/api/product/increase/" + itemId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods":
            "POST, PUT, GET, OPTIONS, DELETE, PATCH",
          Authorization: product_id,
        },
      }
    ).then((response) => {
      response.json().then((data) => {
        window.location.reload();
      });
    });
  }
  onDecrease(itemId) {
    let product_id = localStorage.getItem("product_id");
    fetch(
      "http://queen-party-be.herokuapp.com/api/product/decrease/" + itemId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods":
            "POST, PUT, GET, OPTIONS, DELETE, PATCH",
          Authorization: product_id,
        },
      }
    ).then((response) => {
      response.json().then((data) => {
        window.location.reload();
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
                            paddingLeft: "20px",
                            width: "150px",
                          }}
                        >
                          {item.name}
                        </td>
                        <td className="quantity-style">
                          {" "}
                          &ensp;
                          <button
                            onClick={function () {
                              this.onDecrease(items.id);
                            }.bind(this)}
                          >
                            -
                          </button>
                          &ensp;<span>{items.quantity}</span>&ensp;
                          <button
                            onClick={function () {
                              this.onIncrease(items.id);
                            }.bind(this)}
                          >
                            +
                          </button>
                        </td>
                        <td style={{ paddingLeft: "40px" }}>
                          {new Intl.NumberFormat("ar-US").format(
                            item.price * items.quantity
                          )}
                          &ensp;<span>VNĐ</span>
                        </td>
                        <td style={{ paddingLeft: "25px" }}>
                          <Button
                            onClick={function () {
                              this.deletecart(items.id);
                            }.bind(this)}
                            size="sm"
                            variant="danger"
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </Button>
                        </td>
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
