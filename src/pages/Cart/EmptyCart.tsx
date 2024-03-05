import React from "react";
import { FaShoppingCart, FaSync } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  const handleRefreshClick = () => {
    // Handle refresh button click here
    // Perform any necessary actions, such as fetching new products
  };
  return (
    <main className="empty-cart">
      <FaShoppingCart className="cart-icon" />
      <h1>Your Cart</h1>
      <p>Your cart is empty.</p>
      <Link to="/products" onClick={handleRefreshClick}>
        <FaSync className="rotate-icon"/> Look for New Products
      </Link>
    </main>
  );
}
