const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51NV9s1IuBn9r9vpn8rYpDLFgMWb0U6kSdNtXH0s4noDhwHEJbO5l3mWdqm7nHUjdeUoOPnC61j4tn1BZtUS1bkdw00lrbXiyIP"
);
//API
//App config
const app = express();
//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get("/", (request, response) => response.status(200).send("Hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment Request Received. Total amount: ", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
exports.api = functions.https.onRequest(app);

