import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import SearchResults from "./pages/SearchResults";
import ContactUs from "./pages/ContactUs";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Admin from "./pages/Admin";
import { useTheme } from "./context/useTheme";
import Sale from "./pages/Sale";

function App() {
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.users
  );

  const isAuthPage = pathname === "/login" || pathname === "/register";
  return (
    <div className={`App ${theme}`}>
      {!isAuthPage && <Header />}
      <Routes>
        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* main content */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        {isAuthenticated && <Route path="/profile" element={<Profile />} />}
        {isAuthenticated && user?.role === "admin" && (
          <Route path="/admin" element={<Admin />} />
        )}
      </Routes>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
