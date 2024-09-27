import { produce } from "immer";

let ADD_IN_CART = "cart/add";
let INCREASE_QUANTITY = "cart/increaseQuantity";
let DECREASE_QUANTITY = "cart/decreaseQuantity";
let CART_REMOVE_ITEM = "cart/removeItem";

export default function cartReducer(state = [], action) {
  return produce(state, (State) => {
    const existingIndex = State.findIndex(
      (cartItem) => cartItem.productId === action.payload.productId
    );
    switch (action.type) {
      case ADD_IN_CART:
        if (existingIndex != -1) {
          State[existingIndex].quantity += 1;
          break;
        }
        State.push({ ...action.payload, quantity: 1 });
        break;

      case INCREASE_QUANTITY:
        State[existingIndex].quantity += 1;
        break;

      case DECREASE_QUANTITY:
        State[existingIndex].quantity -= 1;
        if (State[existingIndex].quantity == 0) {
          State.splice(existingIndex, 1);
        }
        break;

      case CART_REMOVE_ITEM:
        State.splice(existingIndex, 1);
    }
    return State;
  });
}

export const addInCart = (productData) => ({
  type: ADD_IN_CART,
  payload: productData,
});

export const increaseQuantity = (productId) => ({
  type: INCREASE_QUANTITY,
  payload: { productId },
});

export const decreaseQuantity = (productId) => ({
  type: DECREASE_QUANTITY,
  payload: { productId },
});

export const removeCart = (productId) => ({
  type: CART_REMOVE_ITEM,
  payload: { productId },
});
