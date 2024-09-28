import { useSelector } from "react-redux";
import Product from "../components/Product";
import { getCartProduct, getProductLoading } from "../store/slices/Product";

export default function Home() {
  const productsList = useSelector(getCartProduct);
  const isLoading = useSelector(getProductLoading);
  const isError = useSelector(getProductLoading);
  return isLoading ? (
    <h1 style={{ textAlign: "center" }}>Loading...</h1>
  ) : isError ? (
    <h1 style={{ textAlign: "center" }}>{isError}</h1>
  ) : (
    <div className="products-container">
      {productsList.map(({ id, title, rating, price, image }) => (
        <Product
          key={id}
          productId={id}
          title={title}
          rating={rating.rate}
          price={price}
          image={image}
        />
      ))}
    </div>
  );
}
