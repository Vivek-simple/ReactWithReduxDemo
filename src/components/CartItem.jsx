import React from "react";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeCart,
} from "../store/slices/Cart";

export default function CartItem({
  productId,
  title,
  rating,
  price,
  imageUrl,
  quantity,
}) {
  const dispatch = useDispatch();
  return (
    <div className="cart-item-container">
      <div className="cart-item">
        <img src={imageUrl} alt={title} />
        <div>
          <h3>{title}</h3>
          <p>{rating} ★ ★ ★ ★</p>
        </div>
      </div>
      <div className="item-price">${price}</div>
      <div className="item-quantity">
        <button onClick={() => dispatch(decreaseQuantity({ productId }))}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => dispatch(increaseQuantity({ productId }))}>
          +
        </button>
        <button onClick={() => dispatch(removeCart({ productId }))}>
          remove
        </button>
      </div>
      <div className="item-total">${quantity * price}</div>
    </div>
  );
}
