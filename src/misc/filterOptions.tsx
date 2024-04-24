import CategoryDropdown from "../pages/ProductListing/CategoryDropdown";
import ColourDropdown from "../pages/ProductListing/ColourDropdown";
import PriceRangeDropdown from "../pages/ProductListing/PriceRangeDropdown";
import SizeDropdown from "../pages/ProductListing/SizeDropdown";
import SortDropdown from "../pages/ProductListing/SortDropdown";

export const filterLgOptions = [
  { label: "Sort", dropdown: <SortDropdown />, dropdownVisible: false },
  { label: "Category", dropdown: <CategoryDropdown />, dropdownVisible: false },
  { label: "Colour", dropdown: <ColourDropdown />, dropdownVisible: false },
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
  { label: "Size", dropdown: <SizeDropdown />, dropdownVisible: false },
  {
    label: "Price Range",
    dropdown: <PriceRangeDropdown />,
    dropdownVisible: false,
  },
];

export const sortOptions = [
  { label: "Latest added" },
  { label: "Most relevant" },
  { label: "Lowest price" },
  { label: "Highest price" },
];

export const ColourOptions = [
  { label: "BLACK", code: "#000000" },
  { label: "ORANGE", code: "#FFA500" },
  { label: "RED", code: "#ff0000" },
  { label: "BLUE", code: "#0000ff" },
  { label: "KHAKI", code: "#F0E68C" },
  { label: "NONE", code: "#ffffff" },
];

export const SizeOptions = [
  { label: "S" },
  { label: "M" },
  { label: "L" },
  { label: "XL" },
  { label: "XXL" },
];
