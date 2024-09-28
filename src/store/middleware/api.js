export const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    const BASE_URL = "https://fakestoreapi.com";
    if (action.type === "make/apiCall") {
      next(action);
      const { url, onSuccess, onError, onLoading } = action.payload;
      dispatch({
        type: onLoading,
      });
      fetch(`${BASE_URL}/${url}`)
        .then((res) => res.json())
        .then((data) =>
          dispatch({
            type: onSuccess,
            payload: data,
          })
        )
        .catch(() => {
          dispatch({
            type: onError,
          });
        });
    } else {
      next(action);
    }
  };
