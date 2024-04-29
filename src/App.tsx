import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import MyDetails from "./pages/profile/MyDetails";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { AppDispatch, RootState } from "./redux/store";
import Admin from "./pages/admin/Dashboard";
import { useTheme } from "./context/useTheme";
import Sale from "./pages/Sale";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { useMediaQueries } from "./hooks/useMediaQuery";
import ProfileNav from "./pages/profile/ProfileNav";
import Profile from "./pages/profile/Profile";
import AdminNav from "./pages/admin/AdminNav";
import AdminHeader from "./pages/admin/AdminHeader";
import AdminProducts from "./pages/admin/AdminProducts";
import {
  clearMessage,
  createPaymentIntent,
  setMessage,
} from "./redux/slices/orderSlice";
import { User } from "./misc/types";
import Message from "./components/Message";
import MyOrders from "./pages/profile/MyOrders";

const stripePromise = loadStripe(
  "pk_test_51MJsP5KH2yzWbNLa477iwDtwOcwH6ZPsv4AjCJ0dcO0CbRN6PrPdX540JwI8XuKiSirYCm0usOoKdPy0vl2i2nTO00oGAmXqS9"
);

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const dispatchAction = useDispatch();

  const { theme } = useTheme();

  const { access_token } = useSelector((state: RootState) => state.users);
  const user = useSelector((state: RootState) => state.users.user) as User;
  const { total } = useSelector((state: RootState) => state.carts);
  const clientSecret = useSelector(
    (state: RootState) => state.orders.clientSecret
  ) as string;

  const message = useSelector((state: RootState) => state.orders.message);

  const { isSmallScreen } = useMediaQueries();
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/404" ||
    pathname.startsWith("/admin");

  // Redirect to /login if user is not authenticated
  useEffect(() => {
    if (
      !access_token &&
      (pathname.startsWith("/profile") || pathname.startsWith("/admin"))
    ) {
      navigate("/login");
    }
  }, [access_token, navigate, pathname]);

  // profile
  const ProfileNesting = ({ component }: { component: ReactNode }) => {
    return (
      <div className="profile-nesting">
        <ProfileNav />
        {component}
      </div>
    );
  };

  // admin
  const AdminNesting = ({ component }: { component: ReactNode }) => {
    return (
      <div className="admin-nesting">
        <AdminNav />
        <div className="admin-content">
          <AdminHeader />
          {component}
        </div>
      </div>
    );
  };
  useEffect(() => {
    const getPaymentIntent = async () => {
      await dispatch(createPaymentIntent({ userId: user?.id, total }));
    };
    getPaymentIntent();
  }, [total, user?.id, dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const successParam = params.get("success");

    if (successParam === "true") {
      dispatchAction(setMessage("Payment succeeded!"));
      setTimeout(() => {
        dispatchAction(clearMessage());
      }, 3000);
    }
  }, [location, dispatchAction]);

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
        {clientSecret && total > 0.5 && (
          <Route
            path="/checkout"
            element={[
              <Elements options={{ clientSecret }} stripe={stripePromise}>
                <Checkout />
              </Elements>,
            ]}
          />
        )}
        {access_token && isSmallScreen ? (
          <>
            <Route path="/profile" element={<ProfileNav />} />
            <Route path="/profile/my-details" element={<MyDetails />} />
            <Route path="/profile/my-orders" element={<MyOrders />} />
          </>
        ) : (
          <>
            <Route
              path="/profile"
              element={<ProfileNesting component={<Profile />} />}
            />
            <Route
              path="/profile/my-details"
              element={<ProfileNesting component={<MyDetails />} />}
            />
            <Route
              path="/profile/my-orders"
              element={<ProfileNesting component={<MyOrders />} />}
            />
          </>
        )}
        {access_token && user?.role === "ADMIN" && (
          <>
            <Route
              path="/admin"
              element={<AdminNesting component={<Admin />} />}
            />
            <Route
              path="/admin/products"
              element={<AdminNesting component={<AdminProducts />} />}
            />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAuthPage && <Footer />}

      {/* Message */}
      {message && <Message text={message} />}
    </div>
  );
}

export default App;
