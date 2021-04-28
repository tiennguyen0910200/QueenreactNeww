import React, { Component } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "../detailRestaurant/DetailRestaurantbig.css";
import "../detailRestaurant/DetailRestaurantsmall.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class DetailRestaurant extends Component {
    constructor(props) {
        super(props);
        let user = localStorage.getItem("user_id");
        this.state = {
            detail: [],
            product: [],
            getdataComment: [],
            btnComment: false,
        };
        var id = props.match.params.id;
        localStorage.setItem("id_vendor", id);
        this.getDetail(id);
        this.getProduct(id);
        this.onAddComment = this.onAddComment.bind(this);
        this.buttonComment = this.buttonComment.bind(this);
    }
    getDetail(id) {
        fetch("http://127.0.0.1:8000/api/vendor/detail/" + id).then((response) => {
            response.json().then((data) => {
                console.log(data);
                this.setState({
                    detail: data,
                });
            });
        });
    }
    getProduct(id) {
        fetch("http://127.0.0.1:8000/api/getproduct/" + id).then((response) => {
            response.json().then((data) => {
                console.log(data);
                this.setState({
                    product: data,
                });
            });
        });
    }

    getAllComment(id) {
        fetch("http://127.0.0.1:8000/api/totalComment/" + id).then((response) => {
            response.json().then((data) => {
                console.log(data);
                this.setState({
                    getdataComment: data,
                });
            });
        });
    }
    onAddComment(event) {
        event.preventDefault();
        let content = event.target["comment"].value;
        let vendor_id = localStorage.getItem("id_vendor");
        // let user_id = event.target['user_id'].value;
        //let user_id = localStorage.getItem('user_id');
        var id = this.props.match.params.id;
        console.log(id);
        let comment = {
            user_id: 2,
            content: content,
        };

        let postInJson = JSON.stringify(comment);
        console.log(vendor_id);
        fetch("http://127.0.0.1:8000/api/addComment/" + vendor_id, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: postInJson,
        }).then((response) => {
            console.log(response);
            window.location.reload();
        });
    }
    myFunction(e) {
        e.preventDefault();
        var x = document.getElementById("myDIV").style;
        if (x.display === "block") {
            x.display = "none";
        } else {
            x.display = "block";
        }
    }
    buttonComment() {
        this.setState({
            btnComment: true,
        });
    }
    render() {
        let detail = this.state.detail;
        return (
            <React.Fragment>
                <Header />
                <div>
                <div style={{ paddingTop: "10px" }}>
                    <div class="container">
                    <div class="row">
                        <div class="col-sm-6">
                        <div className="detail_rtr">

                            <img
                            src={"http://127.0.0.1:8000/storage/" + detail.avatar}
                            alt=""
                            />
                        </div>
                        </div>
                        <div class="col-sm-6">
                        <h1>{detail.name}</h1>
                        <br />
                        <p>Phone:{detail.phone}</p>
                        <p>Email:{detail.email}</p>
                        <p>Address:{detail.address}</p>
                        <p>Description:{detail.description}</p>
                        <div className="detail-button">
                            <button onClick={this.myFunction}>
                            <i class="far fa-comment-dots">Viết đánh giá</i>
                            </button>
                        </div>
                        <div id="myDIV">
                            <form onSubmit={this.onAddComment}>
                            <input
                                placeholder="Viết đánh giá..."
                                name="comment"
                            ></input>
                            <button type="submit">Đăng</button>
                            </form>
                        </div>
                        </div>
                    </div>
                    <hr />
                    </div>

                    <div class="container">
                    <h2 style={{ color: "#eba28c" }}>Welcome</h2>
                    <div class="row">
                        {this.state.product.map((product) => (
                        <div class="col-sm-3">
                            <div className="foodRestaurant">
                            <Link to={"/home/product/detail/" + product.id}>
                                {" "}
                                <img
                                src={
                                    "http://127.0.0.1:8000/storage/" + product.picture
                                }
                                />
                            </Link>
                            <p>{product.name}</p>
                            {this.state.valueSearch && (
                                <h2 className="name_vendor">{product.fullname}</h2>
                            )}
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                    <div class="container">
                    <hr />
                    <div class="row">
                        <div class="col-sm-3">
                        <h1>Đánh giá</h1>
                        <div className="danhGia">
                            {this.state.getdataComment.map((comment) => (
                            <div>
                                <h4>{comment.name}</h4>
                                <p>{comment.content}</p>
                            </div>
                            ))}
                            <br />
                            <form onSubmit={this.onAddComment}>
                            <input
                                placeholder="Viết đánh giá..."
                                name="comment"
                                >

                            </input>
                            <button type="submit">Đăng</button>                      
                            </form>
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

export default withRouter(DetailRestaurant);