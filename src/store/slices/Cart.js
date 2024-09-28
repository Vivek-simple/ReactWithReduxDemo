import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { produce } from "immer";

// let ADD_IN_CART = "cart/add";
// let INCREASE_QUANTITY = "cart/increaseQuantity";
// let DECREASE_QUANTITY = "cart/decreaseQuantity";
// let CART_REMOVE_ITEM = "cart/removeItem";

// export default function cartReducer(state = [], action) {
//   return produce(state, (State) => {
//     const existingIndex = State.findIndex(
//       (cartItem) => cartItem.productId === action.payload.productId
//     );
//     switch (action.type) {
//       case ADD_IN_CART:
//         if (existingIndex != -1) {
//           State[existingIndex].quantity += 1;
//           break;
//         }
//         State.push({ ...action.payload, quantity: 1 });
//         break;

//       case INCREASE_QUANTITY:
//         State[existingIndex].quantity += 1;
//         break;

//       case DECREASE_QUANTITY:
//         State[existingIndex].quantity -= 1;
//         if (State[existingIndex].quantity == 0) {
//           State.splice(existingIndex, 1);
//         }
//         break;

//       case CART_REMOVE_ITEM:
//         State.splice(existingIndex, 1);
//     }
//     return State;
//   });
// }

// export const addInCart = (productData) => ({
//   type: ADD_IN_CART,
//   payload: productData,
// });

// export const increaseQuantity = (productId) => ({
//   type: INCREASE_QUANTITY,
//   payload: { productId },
// });

// export const decreaseQuantity = (productId) => ({
//   type: DECREASE_QUANTITY,
//   payload: { productId },
// });

// export const removeCart = (productId) => ({
//   type: CART_REMOVE_ITEM,
//   payload: { productId },
// });

const findItemIndex = (state, action) =>
  state.list.findIndex(
    (cartItem) => cartItem.productId === action.payload.productId
  );

export const getAllCartItem = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/carts/5`);
      return response.json();
    } catch (err) {
      throw err;
    }
  }
);

const slice = createSlice({
  name: "cart",
  initialState: {
    list: [],
    loading: false,
    error: "",
  },
  reducers: {
    addInCart(state, action) {
      const existingIndex = findItemIndex(state, action);
      if (existingIndex != -1) {
        state.list[existingIndex].quantity += 1;
      } else {
        state.list.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQuantity(state, action) {
      const existingIndex = findItemIndex(state, action);
      state.list[existingIndex].quantity += 1;
    },
    decreaseQuantity(state, action) {
      const existingIndex = findItemIndex(state, action);
      state.list[existingIndex].quantity -= 1;
      if (state.list[existingIndex].quantity == 0) {
        state.list.splice(existingIndex, 1);
      }
    },
    removeCart(state, action) {
      const existingIndex = findItemIndex(state, action);
      state.list.splice(existingIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.products;
      })
      .addCase(getAllCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong!";
      });
  },
});

export const {
  updateCart,
  addInCart,
  increaseQuantity,
  decreaseQuantity,
  removeCart,
  showCartError,
  showCartLoading,
} = slice.actions;
export default slice.reducer;

const getCart = ({ Product, Cart }) => {
  return Cart.list
    .map(({ productId, quantity }) => {
      const cartProduct = Product.list.find(
        (product) => product.id == productId
      );
      return { ...cartProduct, quantity };
    })
    .filter(({ title }) => title);
};

export const getAllCart = createSelector(getCart, (state) => state);
export const getCartLoading = (state) => state.Cart.loading;
export const getCartError = (state) => state.Cart.error;
