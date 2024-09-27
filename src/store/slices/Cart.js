let ADD_IN_CART = "cart/add";
let INCREASE_QUANTITY = "cart/increaseQuantity";
let DECREASE_QUANTITY = "cart/decreaseQuantity";
let CART_REMOVE_ITEM = "cart/removeItem";

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case ADD_IN_CART:
      const existData = state.find(
        (cart) => cart.productId == action.payload.productId
      );

      if (existData) {
        return state.map((cartItem) => {
          if (cartItem.productId == existData.productId) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case INCREASE_QUANTITY:
      return state.map((cartItem) => {
        if (cartItem.productId == action.payload.productId) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });

    case DECREASE_QUANTITY:
      return state
        .map((cartItem) => {
          if (cartItem.productId == action.payload.productId) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.quantity > 0);

    case CART_REMOVE_ITEM:
      return state.filter(
        (cartItem) => cartItem.productId != action.payload.productId
      );

    default:
      return state;
  }
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
