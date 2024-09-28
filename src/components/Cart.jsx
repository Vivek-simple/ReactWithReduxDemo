import React from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { getAllCart, getCartError, getCartLoading } from "../store/slices/Cart";
function Cart() {
  const cartItems = useSelector(getAllCart);
  const isLoading = useSelector(getCartLoading);
  const error = useSelector(getCartError);
  return (
    <div className="cart-container">
      <h2>Items in Your Cart</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Total</div>
        </div>

        {isLoading ? (
          <h1 style={{ textAlign: "center" }}>Loading...</h1>
        ) : error ? (
          <h1 style={{ textAlign: "center" }}>{error}</h1>
        ) : (
          cartItems.map(({ id, title, rating, price, image, quantity }) => (
            <CartItem
              key={id}
              productId={id}
              title={title}
              price={price}
              quantity={quantity}
              imageUrl={image}
              rating={rating.rate}
            />
          ))
        )}

        {!isLoading ||
          (error && (
            <div className="cart-header cart-item-container">
              <div></div>
              <div></div>
              <div></div>
              <div className="total">
                $
                {cartItems.reduce(
                  (acc, curr) => acc + curr.price * curr.quantity,
                  0
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Cart;
