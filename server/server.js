const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors())
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let port = parseInt(process.env.PORT);
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.get("/", (req, res) => {
  res.send("hello");
});
app.post("/pay", async (req, res) => {
    console.log(req.body.token);
    await stripe.charges.create({
        source: req.body.token.id,
        amount: req.body.amount,
        currency:"usd"
    })
} )
app.listen(port, () => {
  console.log(`server runs on port ${port}`);
});
