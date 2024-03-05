import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import SearchResults from "./pages/SearchResults";
import ContactUs from "./pages/ContactUs";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/profile/Profile";
import MyDetails from "./pages/profile/MyDetails";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Admin from "./pages/Admin";
import { useTheme } from "./context/useTheme";
import Sale from "./pages/Sale";
import Cart from "./pages/Cart";
import { useEffect } from "react";
import NotFound from "./pages/NotFound";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.users
  );
  const isAuthPage =
    pathname === "/login" || pathname === "/register" || pathname === "/404";
  console.log(pathname);
  // Redirect to / if user is not authenticated
  useEffect(() => {
    if (!isAuthenticated && pathname === "/profile") {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Redirect to 404 page if the route doesn't exist
  // Array of valid paths
  const validPaths = [
    "/",
    "/login",
    "/register",
    "/products",
    "/sale",
    "/contact-us",
    "/search-results",
    "/wishlist",
    "/cart",
    "/checkout",
    "/order-confirmation",
    "/profile",
    "/profile/my-details",
    "/admin",
  ];

  // Check if the pathname matches the pattern
  const isPathCorrect = /^\/products\/\d+$/.test(pathname);

  // Redirect to 404 page if the route doesn't exist
  useEffect(() => {
    if (!validPaths.includes(pathname) && !isPathCorrect) {
      console.log(pathname);
      navigate("/404");
    }
  }, [pathname]);

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
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        {isAuthenticated && (
          <Route path="/profile" element={<Profile />}>
            <Route path="/profile/my-details" element={<MyDetails />} />
          </Route>
        )}
        {isAuthenticated && user?.role === "admin" && (
          <Route path="/admin" element={<Admin />} />
        )}
        <Route path="/404" element={<NotFound />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
