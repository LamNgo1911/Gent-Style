import { useDispatch, useSelector } from "react-redux";

import "./Cart.scss";
import { AppDispatch, RootState } from "../../redux/store";
import ItemCard from "../../components/ItemCard";
import EmptyCart from "./EmptyCart";
import { CartItem, User } from "../../misc/types";
import { useEffect } from "react";
import { getAllCartItemsByUserId } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { createPaymentIntent } from "../../redux/slices/orderSlice";

export default function Cart() {
  const navigate = useNavigate();
  const { items, total } = useSelector((state: RootState) => state.carts);
  const access_token = useSelector(
    (state: RootState) => state.users.access_token
  ) as string;
  const user = useSelector((state: RootState) => state.users.user) as User;
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (access_token) {
      const fetchCartItems = async () => {
        await dispatch(getAllCartItemsByUserId(access_token));
      };
      fetchCartItems();
    }
  }, [dispatch, access_token]);

  const handleCheckout = async () => {
    const PaymentIntentData = await dispatch(
      createPaymentIntent({ userId: user?.id, total })
    );

    if (PaymentIntentData.type === "order/createPaymentIntent/fulfilled") {
      navigate("/checkout");
    }
  };

  return (
    <>
      {items?.length > 0 ? (
        <main className="cart">
          {/* Cart Information */}
          <section className="cart-container">
            <div className="cart-info">
              <h1>MY BAG</h1>
              <p>{items?.length || 0} item(s)</p>
            </div>

            {/* Cart Items */}
            {/* <ItemCard /> */}
            <div className="cart-item">
              {items?.map((item, i) => (
                <ItemCard
                  key={i}
                  id={item.id}
                  userId={item.userId}
                  product={item.product}
                  color={item.color}
                  size={item.size}
                  image={item.image}
                  quantity={item.quantity}
                  item={item as CartItem}
                />
              ))}
            </div>
          </section>

          {/* Cart Total */}
          <section className="cart-total">
            {/* Render the total amount and other related information */}
            <h1 className="cart-total__title">TOTAL</h1>
            <div className="cart-total__container">
              <div className="cart-total__subtotal">
                <h3>Sub-total</h3>
                <p>{total || 0}$</p>
              </div>

              <div className="cart-total__delivery">
                <h3>Delivery</h3>
                <p>10$</p>
              </div>
            </div>
            <button onClick={handleCheckout} className="cart-total__btn">
              CHECKOUT
            </button>
          </section>
        </main>
      ) : (
        <EmptyCart />
      )}
    </>
  );
}
