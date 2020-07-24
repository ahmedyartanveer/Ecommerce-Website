import React from "react";
import StripeCheckout from "react-stripe-checkout";

export default class stripe extends React.Component {
  onToken = (token) => {
    const body = {
      token,
      product: this.props.products,
      total: this.props.total,
    };

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    fetch("http://localhost:8282/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE", response);
        const { status } = response;
        console.log("STATUS", status);
      })
      .catch((error) => console.log(error));

    this.props.clearCart();
    this.props.history.push("/");
  };

  // ...

  render() {
    const { total } = this.props;
    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
        name="Check Out"
        amount={Math.round(total * 100)}
        shippingAddress
      >
        <button className="btn btn-primary">pay ${total} with card</button>
      </StripeCheckout>
    );
  }
}
