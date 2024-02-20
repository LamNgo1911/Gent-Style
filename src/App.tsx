import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import AboutUs from "./pages/AboutUs/AboutUs";
import SearchResults from "./pages/SearchResults";
import ContactUs from "./pages/ContactUs";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  const { pathname } = useLocation();
  const [darkTheme, setDarkTheme] = useState(false);

  const isAuthPage = pathname === "/login" || pathname === "/register";
  return (
    <div className={`App ${darkTheme ? "dark-theme" : "light-theme"}`}>
      {!isAuthPage && <Header />}
      <Routes>
        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* main content */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
