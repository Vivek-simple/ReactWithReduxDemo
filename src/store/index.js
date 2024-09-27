import { combineReducers, createStore } from "redux";
import { addWishList, removeWishlist } from "./slices/WishList";
import {
  addInCart,
  decreaseQuantity,
  increaseQuantity,
  removeCart,
} from "./slices/Cart";
import productReducer from "./slices/Product.js";
import wishListReducer from "./slices/WishList";
import cartReducer from "./slices/Cart";

const rootReducer = combineReducers({
  Product: productReducer,
  Cart: cartReducer,
  WishList: wishListReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__?.()
);
