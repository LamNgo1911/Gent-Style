import {
  RiDashboard2Line,
  RiShirtLine,
  RiFileList2Line,
  RiUserSettingsLine,
} from "react-icons/ri";
import { AiOutlineShopping } from "react-icons/ai";

export const navLinks = [
  { path: "/", name: "Home" },
  { path: "/products", name: "Products" },
  { path: "/sale", name: "Sale" },
  { path: "/contact-us", name: "Contact Us" },
];

export const adminLinks = [
  { path: "/admin", name: "Dashboard", icon: RiDashboard2Line },
  { path: "/admin/category", name: "Category", icon: RiShirtLine },
  { path: "/admin/products", name: "Products", icon: RiFileList2Line },
  { path: "/admin/orders", name: "Orders", icon: AiOutlineShopping },
  { path: "/admin/users", name: "Users", icon: RiUserSettingsLine },
];
