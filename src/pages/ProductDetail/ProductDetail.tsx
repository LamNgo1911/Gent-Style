import { Link, useParams } from "react-router-dom";
import "./ProductDetail.scss";
import {
  useFetchASingleProductQuery,
  useFetchAllCategoriesQuery,
} from "../../redux/productQuery";
import ImageCard from "../../components/ImageCard";

export default function ProductDetail() {
  const productId = useParams().productId;
  const {
    data: product,
    isLoading,
    error,
  } = useFetchASingleProductQuery(Number(productId));
  console.log(productId);
  return (
    <main className="product-detail">
      {/* navigatin links */}
      <section className="navigation-links">
        <Link to="/">home</Link> <span>/</span>
        <Link to="/products">
          {product?.category?.name.toLocaleLowerCase()}
        </Link>
        <span>/</span>
        <p> {product?.title.toLocaleLowerCase()}</p>
      </section>

      <section className="product-detail__container">
        <ImageCard images={product?.images || []} />

        <div className="product-detail__infor">
          <h3>{product?.title}</h3>
          <p>Price: {product?.title}$</p>
          <p>Description: {product?.description}</p>
        </div>
      </section>

      <section></section>
    </main>
  );
}
