import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import {getBasketTotal} from './reducer'
import { useStateValue } from './StateProvider'
function Subtotal() {
    
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="subtotal">
        <CurrencyFormat
            renderText={(value) =>(
                <>
                    <p>
                        {/*Finish*/}
                        Subtotal ({basket?.length} items): <strong>{value}</strong>
                    </p>
                    <small className='subtotal__gift'>
                        <input type="checkbox" /> This order contain a gift
                    </small>
                </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)} //Finish
            displayType={"text"}
            thousandSeparator={true}
            prefix={'$'}
        />
        <button>Procees to Checkout</button>
    </div>
  )
}

export default Subtotal