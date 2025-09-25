import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  //  1. Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const cost = parseFloat(item.cost.substring(1)); // remove "$" and convert to number
      total += cost * item.quantity;
    });
    return total.toFixed(2); // show with 2 decimal places
  };

  //  2. Continue shopping
  const handleContinueShopping = (e) => {
    onContinueShopping(e); // call parent function
  };

  //  3. Increment quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  //  4. Decrement quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // if quantity becomes 0, remove item
      dispatch(removeItem(item.name));
    }
  };

  //  5. Remove item completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  //  6. Calculate total cost per item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.substring(1)); // convert "$10" -> 10
    return (cost * item.quantity).toFixed(2);
  };

  //  7. (Optional future) Checkout handler
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>

              {/* Quantity Controls */}
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              {/* Item Subtotal */}
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>

              {/* Remove Button */}
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{ marginTop: '20px', color: 'black' }}
        className="total_cart_amount"
      >
        Total Amount: ${calculateTotalAmount()}
      </div>

      {/* Continue + Checkout Buttons */}
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={(e) => handleCheckoutShopping(e)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
