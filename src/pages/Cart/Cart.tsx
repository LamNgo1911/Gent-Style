import { useSelector } from "react-redux";
import "./Cart.scss";
import { RootState } from "../../redux/store";
import ItemCard from "../../components/ItemCard";
import { productData } from "../../components/data/productData";
import EmptyCart from "./EmptyCart";

export default function Cart() {
  const { items, total } = useSelector((state: RootState) => state.carts);

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
                  title={item.title}
                  price={item.price}
                  description={item.description}
                  category={item.category}
                  images={item.images}
                  quantity={item.quantity}
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
                <p>{total || 100}$</p>
              </div>

              <div className="cart-total__delivery">
                <h3>Delivery</h3>
                <p>10$</p>
              </div>
            </div>
            <button className="cart-total__btn">CHECKOUT</button>
          </section>
        </main>
      ) : (
        <EmptyCart />
      )}
    </>
  );
}
