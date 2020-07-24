const cors = require("cors");
const express = require("express");
require("dotenv").config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

const uuid = require("uuid/v4");

var bodyParser = require("body-parser");

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("It is working now");
});

app.post("/payment", async (req, res) => {
  const { product, token, total } = req.body;
  console.log("req.body", req.body);
  console.log("PRODUCT", product);
  console.log("PRICE", total);
  const idempontencykey = uuid();

  const allProduct = product.map((item) => {
    return `${item.count} ${item.title}`;
  });

  allProduct.map((i) => i.item).join(",");
  console.log(allProduct);

  return await stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create({
        amount: Math.round(total * 100),
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `purchase of ${allProduct} `,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            city: token.card.address_city,
            state: token.card.address_state,
            postal_code: token.card.address_zip,
            country: token.card.country,
          },
        },
      });
      {
        idempontencykey;
      }
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

//listen
app.listen(8282, () => console.log("listening at port 8282"));
