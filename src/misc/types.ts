export type User = {
  id: number;
  name: string;
  role: string;
  email: string;
  password?: string;
  avatar: string;
};

export type UserRegistration = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type UserState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAvailableEmail: boolean;
  access_token: string | null;
};

export type Category = {
  id: number;
  name: string;
  image: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
};

export type TrendingCategory = {
  id: number;
  title: string;
  description: string;
  image: string;
};

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

export type Pagination = {
  offset: number;
  limit: number;
  priceMin?: number;
  priceMax?: number;
  categoryId?: number;
};

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

export type CartItem = Product & {
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  total: number;
};
