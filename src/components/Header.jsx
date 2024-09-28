import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CartIcon from "../assets/cart-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductData } from "../store/slices/Product";
import { getAllCartItem } from "../store/slices/Cart";

export default function Header() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductData());

    dispatch(getAllCartItem());
  }, []);
  const cartItems = useSelector((state) => state.Cart.list);
  return (
    <header>
      <div className="header-contents">
        <h1>
          <Link to="/">Shope</Link>
        </h1>
        <Link className="cart-icon" to="/cart">
          <img src={CartIcon} alt="cart-icon" />
          <div className="cart-items-count">
            {cartItems &&
              cartItems.reduce((acc, curr) => curr.quantity + acc, 0)}
          </div>
        </Link>
      </div>
    </header>
  );
}
