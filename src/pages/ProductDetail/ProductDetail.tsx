import { Link, useNavigate, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";

import "./ProductDetail.scss";
import { useFetchASingleProductQuery } from "../../redux/productQuery";
import ImageCard from "../../components/ImageCard";
import Slider from "../../components/Slider";
import { useDispatch, useSelector } from "react-redux";
import { createNewCartItem } from "../../redux/slices/cartSlice";
import { useEffect, useState } from "react";
import { TiTickOutline } from "react-icons/ti";
import {
  addToWishlist,
  fetchAllProducts,
} from "../../redux/slices/productSlice";
import ImageCardSkeleton from "../../components/loading/ImageCardSkeleton";
import LoadingError from "../../components/LoadingError";
import ProductDetailSkeleton from "../../components/loading/ProductDetailSkeleton";
import { ColorOptions, Product, Variant } from "../../misc/types";
import { ColourOptions } from "../../misc/filterOptions";
import { AppDispatch, RootState } from "../../redux/store";

export default function ProductDetail() {
  const productId = useParams().productId;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { data, isLoading, error } = useFetchASingleProductQuery(
    productId as string
  );
  const user = useSelector((state: RootState) => state.users.user);
  const {
    products,
    loading,
    error: productError,
  } = useSelector((state: RootState) => state.products);
  const access_token = useSelector(
    (state: RootState) => state.users.access_token
  ) as string;

  const [addedProduct, setAddedProduct] = useState<boolean>(false);
  const [savedProduct, setSavedProduct] = useState<boolean>(false);
  const [missedSize, setMissedSize] = useState<boolean>(false);
  const [colorArray, setColorArray] = useState<ColorOptions[]>([]);
  const [sizeArray, setSizeArray] = useState<string[]>([]);
  const [activeColorIndex, setActiveColorIndex] = useState<number>(0);
  const [activeSizeIndex, seTActiveSizeIndex] = useState<number>(-1);

  const addedToCartHandler = async () => {
    if (data?.product) {
      const product = data?.product;
      if (!sizeArray[activeSizeIndex]) {
        setMissedSize(true);
      } else {
        if (!access_token) {
          navigate("/login");
        } else {
          // todo: Create cartItem
          setMissedSize(false);
          const newCartItem = {
            userId: user?.id as string,
            product: data?.product?.id,
            color: colorArray[activeColorIndex].label,
            size: sizeArray[activeSizeIndex],
            image: product.images[0],
            quantity: 1,
          };
          console.log(access_token);
          await dispatch(
            createNewCartItem({ access_token, cartItemInput: newCartItem })
          );

          setAddedProduct(true);
        }
      }
    }
  };

  const savedToWishlistHandler = () => {
    if (data?.product) {
      dispatch(addToWishlist(data?.product));
      setSavedProduct(true);
    }
  };

  // Get All products
  useEffect(() => {
    const getAllProducts = async () => {
      await dispatch(fetchAllProducts());
    };
    getAllProducts();
  }, [dispatch]);

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

  // Todo: Get the color array
  useEffect(() => {
    const uniqueColorArray: ColorOptions[] = [];
    let uniqueColor = data?.product?.variants[0]?.color as string;

    const foundColor = ColourOptions?.find(
      (option: ColorOptions) => option?.label === uniqueColor
    );
    if (foundColor) {
      uniqueColorArray.push(foundColor);
    }

    data?.product?.variants?.map((variant: Variant) => {
      if (uniqueColor !== variant?.color) {
        uniqueColor = variant?.color;
        const foundColor = ColourOptions?.find(
          (option: ColorOptions) => option?.label === uniqueColor
        );
        if (foundColor) {
          uniqueColorArray.push(foundColor);
        }
      }
      return null;
    });

    setColorArray(uniqueColorArray);
  }, [data]);

  // todo: Get the size array
  useEffect(() => {
    const uniqueSizeArray: string[] = [];
    let uniqueSize = data?.product?.variants[0]?.size as string;
    uniqueSizeArray.push(uniqueSize);
    data?.product?.variants?.map((variant: Variant) => {
      if (uniqueSize !== variant?.size) {
        uniqueSize = variant?.size;
        uniqueSizeArray.push(uniqueSize);
      }
      return null;
    });
    setSizeArray(uniqueSizeArray);
  }, [data]);

  // handle error
  if (error || productError) {
    return <LoadingError />;
  }

  return (
    <main className="product-detail">
      {/* navigatin links */}
      <section className="navigation-links">
        <Link to="/">home</Link> <span>/</span>
        <Link to={`/products`}>
          {data?.product?.category?.name.toLocaleLowerCase()}
        </Link>
        <span>/</span>
        <p> {data?.product?.name.toLocaleLowerCase()}</p>
      </section>

      <section className="product-detail__container">
        {isLoading ? (
          <>
            <ImageCardSkeleton />
            <ProductDetailSkeleton />
          </>
        ) : (
          <>
            <div className="product-detail_images">
              <ImageCard images={data?.product?.images as string[]} />
            </div>
            <div className="product-detail__infor">
              <h3 className="product-detail__title">{data?.product?.name}</h3>
              <p className="product-detail__price">
                Price: {data?.product?.price}$
              </p>
              <div className="product-detail__color">
                <span>Color: {colorArray[activeColorIndex]?.label}</span>
                <div className="product-detail__color-array">
                  {colorArray?.map((color, index: number) => (
                    <div
                      className={`cirle-color ${
                        index === activeColorIndex && "active"
                      }`}
                      style={{ background: color?.code }}
                      onClick={() => setActiveColorIndex(index)}
                    />
                  ))}
                </div>
              </div>
              <div className="product-detail__size">
                <span>Size: {sizeArray[activeSizeIndex]}</span>

                {missedSize && (
                  <span className="product-detail__size-error">
                    Please choose a size!
                  </span>
                )}

                <div className="product-detail__size-array">
                  {sizeArray?.map((size, index: number) => (
                    <span
                      className={`cirle-size ${
                        index === activeSizeIndex && "active"
                      }`}
                      onClick={() => seTActiveSizeIndex(index)}
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              <div className="product-detail__description">
                <p className="description-btn">Description:</p>

                <p className={`description-content`}>
                  {data?.product?.description}
                </p>
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
        data={products as Product[]}
        isLoading={loading}
        slidesPerViewSm={2}
        slidesPerViewMd={3}
        slidesPerViewLg={4}
        showScrollbar={true}
        showPagination={false}
      />

      {/* recently-viewed section */}
      <Slider
        title="Recently viewed"
        data={products as Product[]}
        isLoading={loading}
        slidesPerViewSm={2}
        slidesPerViewMd={3}
        slidesPerViewLg={4}
        showScrollbar={true}
        showPagination={false}
      />
    </main>
  );
}
