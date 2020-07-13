import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";

export default class Product extends Component {
  render() {
    const { id, title, img, price, inCart } = this.props.product;
    return (
      <ProductWrapper classname="col-9 mx-auto col-md-6 col-lg-3">
        <div className="card">
          <div
            className="img-container p-5"
            onClick={() => console.log("you clicked me on the image container")}
          >
            <Link to="/details">
              <img src={img} alt="product" className="card-img-top"></img>
            </Link>
            <button
              className="cart-btn"
              onClick={() => {
                console.log("added to the cart");
              }}
              disabled={inCart ? true : false}
            >
              {inCart ? (
                <p className="text-capitalize mb-0" disabled>
                  in inCart
                </p>
              ) : (
                <i className="fas fa-cart-plus" />
              )}
            </button>
          </div>
        </div>
      </ProductWrapper>
    );
  }
}

const ProductWrapper = styled.div``;
