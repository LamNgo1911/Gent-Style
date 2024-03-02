import { Link, useParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";

import "./ProductDetail.scss";
import {
  useFetchASingleProductQuery,
  useFetchAllCategoriesQuery,
  useFetchProductsbyCategoriesQuery,
} from "../../redux/productQuery";
import ImageCard from "../../components/ImageCard";
import ProductCard from "../../components/ProductCard";
import Slider from "../../components/Slider";

export default function ProductDetail() {
  const productId = useParams().productId;
  const {
    data: product,
    isLoading,
    error,
  } = useFetchASingleProductQuery(Number(productId));
  const {
    data: relevantProducts,
    isLoading: isLoadingRelevantProducts,
    error: errorRelevantProducts,
  } = useFetchProductsbyCategoriesQuery(Number(product?.category?.id));

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
          <h3 className="product-detail__title">{product?.title}</h3>
          <p className="product-detail__price">Price: {product?.price}$</p>
          <div className="product-detail__description">
            <p className="description-btn">
              Description <IoIosArrowDown />
            </p>

            <p className={`description-content`}>{product?.description}</p>
          </div>
          <div className="product-detail__btns">
            <button>Add to cart</button>
            <span>
              <FaHeart className="heart-btn" />
            </span>
          </div>
        </div>
      </section>

      {/* relevant-products section*/}
      <Slider
        title="Relevant products"
        data={relevantProducts || []}
        isLoading={isLoadingRelevantProducts}
        slidesPerViewSm={2}
        slidesPerViewMd={3}
        slidesPerViewLg={4}
        showScrollbar={true}
        showPagination={false}
      />

      {/* recently-viewed section */}
      <Slider
        title="Recently viewed"
        data={relevantProducts || []}
        isLoading={isLoadingRelevantProducts}
        slidesPerViewSm={2}
        slidesPerViewMd={3}
        slidesPerViewLg={4}
        showScrollbar={true}
        showPagination={false}
      />
    </main>
  );
}
