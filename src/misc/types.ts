export type User = {
  id: number;
  name: string;
  role: string;
  email: string;
  password?: string;
  avatar: string;
};

export type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
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
};
