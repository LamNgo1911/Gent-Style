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
import MyDetails from "./pages/profile/MyDetails";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Admin from "./pages/admin/Dashboard";
import { useTheme } from "./context/useTheme";
import Sale from "./pages/Sale";
import Cart from "./pages/Cart";
import { ReactNode, useEffect } from "react";
import NotFound from "./pages/NotFound";
import { useMediaQueries } from "./hooks/useMediaQuery";
import ProfileNav from "./pages/profile/ProfileNav";
import Profile from "./pages/profile/Profile";
import AdminNav from "./pages/admin/AdminNav";
import AdminHeader from "./pages/admin/AdminHeader";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user, access_token } = useSelector((state: RootState) => state.users);
  const { isSmallScreen } = useMediaQueries();
  const isAuthPage =
    pathname === "/login" || pathname === "/register" || pathname === "/404";

  // Redirect to /login if user is not authenticated
  // useEffect(() => {
  //   if (
  //     !access_token &&
  //     (pathname.startsWith("/profile") || pathname.startsWith("/admin"))
  //   ) {
  //     navigate("/login");
  //   }
  // }, [access_token, navigate, pathname]);

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
        <div>
          <AdminHeader />
        </div>
        {component}
      </div>
    );
  };

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
        {/* <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        {access_token && isSmallScreen ? (
          <>
            <Route path="/profile" element={<ProfileNav />} />
            <Route path="/profile/my-details" element={<MyDetails />} />
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
          </>
        )} */}
        {/* {access_token && user?.role === "admin" && (
          <>
            <Route
              path="/admin"
              element={<AdminNesting component={<Admin />} />}
            />
            <Route
              path="/admin/products"
              element={<AdminNesting component={<MyDetails />} />}
            />
          </>
        )} */}

        {/* <>
          <Route
            path="/admin"
            element={<AdminNesting component={<Admin />} />}
          />
          <Route
            path="/admin/products"
            element={<AdminNesting component={<MyDetails />} />}
          />
        </> */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
