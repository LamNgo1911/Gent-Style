import { FaHeart } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ItemCard.scss";
import { CartItem } from "../../misc/types";
import {
  deleteCartItem,
  getAllCartItemsByUserId,
  updateCartItem,
} from "../../redux/slices/cartSlice";
import { TiTickOutline } from "react-icons/ti";
import { AppDispatch, RootState } from "../../redux/store";

type ItemCardProps = CartItem & {
  item: CartItem;
};

export default function ItemCard({
  id,
  userId,
  product,
  color,
  size,
  image,
  quantity,
  item,
}: ItemCardProps) {
  const navigate = useNavigate();
  const [savedItem, setSavedItem] = useState<boolean>(false);

  const access_token = useSelector(
    (state: RootState) => state.users.access_token
  ) as string;
  const dispatch: AppDispatch = useDispatch();

  const removeCartItemHandler = async () => {
    await dispatch(deleteCartItem({ cartItemId: id, access_token }));
    await dispatch(getAllCartItemsByUserId(access_token));
  };

  const changeQuantityHandler = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    await dispatch(
      updateCartItem({
        access_token,
        cartItemId: id,
        updateInfo: { quantity: Number(event.target.value) },
      })
    );
    await dispatch(getAllCartItemsByUserId(access_token));
  };

  const saveForLaterHandler = () => {
    setSavedItem(true);
  };

  const clickOnImageAndTitleHandler = () => {
    navigate(`/products/${id}`);
  };

  useEffect(() => {
    if (savedItem) {
      setTimeout(() => {
        setSavedItem(false);
      }, 2000);
    }
  }, [savedItem, item, dispatch]);

  return (
    <div className="item-card">
      <div className="item-card__container">
        <div
          className="item-card__image-container"
          onClick={clickOnImageAndTitleHandler}
        >
          <img src={image} alt="item" className="item-card__image" />
        </div>

        <div className="item-card__info">
          <h3
            className="item-card__title"
            onClick={clickOnImageAndTitleHandler}
          >
            {product?.name}
          </h3>
          <p className="item-card__price">{product?.price}$</p>
          <div className="item-card__color-wrapper">
            <div
              className="item-card__color-cirle"
              style={{ background: color }}
            />
            <p className="item-card__color">{color}</p>/{" "}
            <p className="item-card__size">{size}</p>
          </div>

          <div className="item-card__quantity">
            <label htmlFor="qty">Qty</label>
            <select
              name="qty"
              id="qty"
              onChange={changeQuantityHandler}
              value={quantity}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          {savedItem ? (
            <span className="item-card__noti-btn">
              Saved <TiTickOutline />
            </span>
          ) : (
            <span className="item-card__save-btn" onClick={saveForLaterHandler}>
              <FaHeart /> Save for later
            </span>
          )}
        </div>
      </div>

      <IoCloseOutline
        className="item-card__close-btn"
        onClick={removeCartItemHandler}
      />
    </div>
  );
}
