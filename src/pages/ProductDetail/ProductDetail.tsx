import { Link, useParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";

import "./ProductDetail.scss";
import {
  useFetchASingleProductQuery,
  useFetchProductsByCategoriesQuery,
} from "../../redux/productQuery";
import ImageCard from "../../components/ImageCard";
import Slider from "../../components/Slider";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { useEffect, useState } from "react";
import { TiTickOutline } from "react-icons/ti";
import { addToWishlist } from "../../redux/slices/productSlice";
import ImageCardSkeleton from "../../components/loading/ImageCardSkeleton";
import LoadingError from "../../components/LoadingError";
import ProductDetailSkeleton from "../../components/loading/ProductDetailSkeleton";

export default function ProductDetail() {
  const productId = useParams().productId;
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    error,
  } = useFetchASingleProductQuery(Number(productId));
  const {
    data: relevantProducts,
    isLoading: isLoadingRelevantProducts,
    error: errorRelevantProducts,
  } = useFetchProductsByCategoriesQuery(Number(product?.category?.id));

  const [addedProduct, setAddedProduct] = useState<boolean>(false);
  const [savedProduct, setSavedProduct] = useState<boolean>(false);

  const addedToCartHandler = () => {
    if (product) {
      dispatch(addToCart(product));
      setAddedProduct(true);
    }
  };

  const savedToWishlistHandler = () => {
    if (product) {
      dispatch(addToWishlist(product));
      setSavedProduct(true);
    }
  };

  // send added and saved message in 3s
  useEffect(() => {
    if (addedProduct) {
      setTimeout(() => {
        setAddedProduct(false);
      }, 2000);
    }

    if (savedProduct) {
      setTimeout(() => {
        setSavedProduct(false);
      }, 2000);
    }
  }, [addedProduct, savedProduct]);

  // handle error
  if (error || errorRelevantProducts) {
    return <LoadingError />;
  }

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
        {isLoading ? (
          <>
            <ImageCardSkeleton />
            <ProductDetailSkeleton />
          </>
        ) : (
          <>
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
                {addedProduct ? (
                  <button>
                    Added <TiTickOutline className="tick-icon" />
                  </button>
                ) : (
                  <button onClick={addedToCartHandler}>Add to cart</button>
                )}

                <span
                  aria-label="Add to Wishlist"
                  onClick={savedToWishlistHandler}
                >
                  <FaHeart
                    className={`heart-btn ${savedProduct && "save-animation"}`}
                  />
                </span>
              </div>
            </div>
          </>
        )}
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
