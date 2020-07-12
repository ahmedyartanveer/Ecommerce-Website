import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/NavBar";
import ProductList from "./Components/ProductList";
import Default from "./Components/Default";
import Cart from "./Components/Cart";
import Details from "./Components/Details";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <ProductList />
        <Details />
        <Cart />
        <Default />
      </React.Fragment>
    );
  }
}

export default App;
