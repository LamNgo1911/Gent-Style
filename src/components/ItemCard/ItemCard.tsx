import { FaHeart } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import "./ItemCard.scss";
import { CartItem } from "../../misc/types";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/slices/cartSlice";
import { useEffect, useState } from "react";
import { TiTickOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

export default function ItemCard({
  id,
  name,
  price,
  description,
  category,
  variants,
  images,
  quantity,
}: CartItem) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [savedItem, setSavedItem] = useState<boolean>(false);

  const removeCartItemHandler = () => {
    dispatch(removeFromCart(id));
  };

  const changeQuantityHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(
      updateQuantity({ productId: id, quantity: Number(event?.target?.value) })
    );
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
        dispatch(removeFromCart(id));
      }, 2000);
    }
  }, [savedItem]);

  return (
    <div className="item-card">
      <div className="item-card__container">
        <div
          className="item-card__image-container"
          onClick={clickOnImageAndTitleHandler}
        >
          <img src={images[0]} alt="item" className="item-card__image" />
        </div>

        <div className="item-card__info">
          <h3
            className="item-card__title"
            onClick={clickOnImageAndTitleHandler}
          >
            {name}
          </h3>
          <p className="item-card__price">{price}$</p>
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
