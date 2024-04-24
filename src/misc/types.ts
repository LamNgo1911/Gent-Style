// ------------- User -------------
export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}

export type ShippingAddress = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  status: UserStatus;
  role: Role;
  resetToken: string | null;
  resetTokenExpiresAt: Date | null;
  shippingAddress: ShippingAddress;
  orders: Order[];
};

export type UserRegistration = {
  username: string;
  email: string;
  password: string;
};

export type UserState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  access_token: string | null;
};

// ------------- Category -------------

export type Category = {
  id: string;
  name: string;
  image: string;
};

export type TrendingCategory = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
};

// ------------- Product -------------

export enum Size {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
  NONE = "NONE",
}

export type Variant = {
  color: string;
  size: Size;
  stock: number;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  variants: Variant[];
  images: string[];
};

// ------------- Color -------------

export type ColorOptions = {
  label: string;
  code: string;
};

// ------------- Filter -------------

export enum FilterListing {
  category,
  Colour,
  Brand,
  Size,
  PriceRange,
}

export type FilterOption = {
  label: string;
  dropdown: JSX.Element;
  dropdownVisible: boolean;
};

// ------------- Pagination -------------

export type Pagination = {
  sort: string;
  skip: number;
  limit: number;
  size: string;
  color: string;
  search: string;
  category: string;
  priceMin: number;
  priceMax: number;
};

// ------------- Slider -------------

export type SliderProps = {
  title: string;
  isLoading: boolean;
  data: (Product | Category)[];
  slidesPerViewSm: number;
  slidesPerViewMd: number;
  slidesPerViewLg: number;
  showScrollbar: boolean;
  showPagination: boolean;
};

// ------------- Cart -------------

export type CartItem = {
  id: string;
  userId: string;
  product: Product;
  color: string;
  size: string;
  image: string;
  quantity: number;
};

export type CartItemInput = {
  userId: string;
  product: string;
  color: string;
  size: string;
  image: string;
  quantity: number;
};

// ------------- Order -------------

export enum OrderStatus {
  PAID = "PAID",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export type Shipment = {
  method: string;
  trackingNumber: string;
  address: ShippingAddress;
};

export type OrderItem = {
  id: string;
  quantity: number;
  product: Product[];
};

export type Order = {
  id: string;
  userId: string;
  shipment: Shipment;
  priceSum: number;
  orderItems: OrderItem[];
  status: OrderStatus;
};
