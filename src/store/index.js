import { combineReducers, createStore } from "redux";
import productReducer from "./slices/Product.js";
import wishListReducer from "./slices/WishList";
import cartReducer from "./slices/Cart";
import { configureStore } from "@reduxjs/toolkit";
import { logger } from "./middleware/logger.js";
import { apiMiddleware } from "./middleware/api.js";
import { func } from "./middleware/func.js";

// const rootReducer = combineReducers({
//   Product: productReducer,
//   Cart: cartReducer,
//   WishList: wishListReducer,
// });

// export const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__?.()
// );

export const store = configureStore({
  reducer: {
    Product: productReducer,
    Cart: cartReducer,
    WishList: wishListReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), func],
});
