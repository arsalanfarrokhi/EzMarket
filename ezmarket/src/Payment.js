import React, {useEffect, useState} from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import { useNavigate } from "react-router-dom";
import axios from './axios';

function Payment() {

  
  const navigate = useNavigate();
  
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(null);
  const [succeeded, setSucceeded] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [clientSecret, setClientSecret] = useState(true);
  
  
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret().catch(err =>{console.log(err)});
  }, [basket]);

  const handleSubmit = async (event) =>{
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({paymentIntent}) =>{
      //paymentIntent = payment confirmation
      
      setSucceeded(true);
      setError(null);
      setProcessing(false);
      navigate('/orders');
    })
  }
  console.log("The secret is >>>", clientSecret)

  const handleChange = event =>{
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  console.log(getBasketTotal(basket));
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>Checkout (<Link to='/checkout'>{basket?.length} items</Link>)</h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery address: </h3>
          </div>
          <div className="payment__address">
            <p>{user ? user.email : "Guest"}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, Ca</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
            <div className="payment__title">
                <h3>Payment Method</h3>
            </div>
            <div className="payment__details">
                {/* Stripe*/}
                <form onSubmit={handleSubmit}>
                  <CardElement onChange={handleChange}/>
                  <div className="payment__priceContainer">
                    <CurrencyFormat
                      renderText={(value) => (
                        <>
                          <h3>Order Total: {value}</h3>
                        </>
                      )}
                      decimalScale={2}
                      value={getBasketTotal(basket)} //Finish
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                    <button disabled={processing || disabled ||succeeded}>
                      <span> {processing ? <p>Processing</p>: "Buy now"}
                      </span>
                    </button>
                    {error && <div>{error}</div>}
                  </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
