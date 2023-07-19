import React, { useEffect } from "react";
import "./App.css";
import "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Payment from "./Payment";
import Login from "./Login";
import { auth } from "./firebase";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useStateValue } from "./StateProvider";
import {loadStripe} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe(
  'pk_test_51NV9s1IuBn9r9vpnSRSJZYeEhZ9ZPAh4FIXERYURo3sUUSo01K1KH9ZfbFgc5vew2FfyaIXixhFViLuvrvkAMJyY00oebepRlK'
  );

function App() {
  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
        <Route
          path="/payment"
          element={
            <>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Header />
              <Orders/>
            </>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
