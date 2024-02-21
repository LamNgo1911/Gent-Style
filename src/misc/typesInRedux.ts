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
