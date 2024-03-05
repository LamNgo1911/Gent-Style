import BrandDropdown from "../pages/ProductListing/BrandDropdown";
import CategoryDropdown from "../pages/ProductListing/CategoryDropdown";
import ColourDropdown from "../pages/ProductListing/ColourDropdown";
import PriceRangeDropdown from "../pages/ProductListing/PriceRangeDropdown";
import SizeDropdown from "../pages/ProductListing/SizeDropdown";
import SortDropdown from "../pages/ProductListing/SortDropdown";

export const filterLgOptions = [
  { label: "Sort", dropdown: <SortDropdown />, dropdownVisible: false },
  { label: "Category", dropdown: <CategoryDropdown />, dropdownVisible: false },
  { label: "Colour", dropdown: <ColourDropdown />, dropdownVisible: false },
  { label: "Brand", dropdown: <BrandDropdown />, dropdownVisible: false },
  { label: "Size", dropdown: <SizeDropdown />, dropdownVisible: false },
  {
    label: "Price Range",
    dropdown: <PriceRangeDropdown />,
    dropdownVisible: false,
  },
];

export const filterSmOptions = [
  { label: "Category", dropdown: <CategoryDropdown />, dropdownVisible: false },
  { label: "Colour", dropdown: <ColourDropdown />, dropdownVisible: false },
  { label: "Brand", dropdown: <BrandDropdown />, dropdownVisible: false },
  { label: "Size", dropdown: <SizeDropdown />, dropdownVisible: false },
  {
    label: "Price Range",
    dropdown: <PriceRangeDropdown />,
    dropdownVisible: false,
  },
];

export const sortOptions = [
  { label: "Recommended" },
  { label: "What's New" },
  { label: "Price high to low" },
  { label: "Price low to high" },
];

export const ColourOptions = [
  { label: "Blue" },
  { label: "Black" },
  { label: "Grey" },
  { label: "Brown" },
  { label: "Neutral" },
];

export const BrandOptions = [
  { label: "Adidas" },
  { label: "Nike" },
  { label: "Puma" },
  { label: "Topman" },
  { label: "Levi's" },
];

export const SizeOptions = [
  { label: "S" },
  { label: "M" },
  { label: "L" },
  { label: "XL" },
  { label: "XXL" },
];
