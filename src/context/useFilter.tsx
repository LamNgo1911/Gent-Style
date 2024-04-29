import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

type FilterContextProps = {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  size: string;
  setSize: Dispatch<SetStateAction<string>>;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  categoryName: string;
  setCategoryName: Dispatch<SetStateAction<string>>;
  priceRange: number[];
  setPriceRange: Dispatch<SetStateAction<number[]>>;
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
  const [sort, setSort] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 999]);

  const value: FilterContextProps = {
    sort,
    setSort,
    size,
    setSize,
    color,
    setColor,
    search,
    setSearch,
    categoryName,
    setCategoryName,
    priceRange,
    setPriceRange,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
