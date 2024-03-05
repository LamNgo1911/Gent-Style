import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
import { useFetchAllCategoriesQuery } from "../redux/productQuery";

type FilterContextProps = {
  categoryId: string;
  priceRange: number[];
  setCategoryId: Dispatch<SetStateAction<string>>;
  setPriceRange: Dispatch<SetStateAction<number[]>>;
  getCategoryName: () => string;
};

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const useFilter = (): FilterContextProps => {
  const filterContext = useContext(FilterContext);
  if (!filterContext) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return filterContext;
};

type FilterProviderProps = {
  children: ReactNode;
};

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [categoryId, setCategoryId] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([1, 999]);
  const { data, isLoading, error } = useFetchAllCategoriesQuery();

  const getCategoryName = () => {
    const category = data?.find((cate) => cate.id === Number(categoryId));
    if (category) return category.name;
    return "All";
  };

  const value: FilterContextProps = {
    categoryId,
    priceRange,
    setCategoryId,
    setPriceRange,
    getCategoryName,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
