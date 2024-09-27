let ADD_IN_WISHLIST = "wishList/add";
let CART_REMOVE_ITEM_WISHLIST = "wishList/removeItem";

export default function wishListReducer(state = [], action) {
  switch (action.type) {
    case ADD_IN_WISHLIST:
      return [...state, action.payload];

    case CART_REMOVE_ITEM_WISHLIST:
      return state.filter(
        (wishListItem) => wishListItem.productId != action.payload.productId
      );

    default:
      return state;
  }
}

export const addWishList = (productId) => ({
  type: ADD_IN_WISHLIST,
  payload: { productId },
});

export const removeWishlist = (productId) => ({
  type: CART_REMOVE_ITEM_WISHLIST,
  payload: { productId },
});
