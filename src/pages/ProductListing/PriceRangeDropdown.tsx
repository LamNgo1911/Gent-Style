import { Range } from "react-range";
import { useFilter } from "../../context/useFilter";

export default function PriceRangeDropdown() {
  const initialValues = [0, 999];
  const { priceRange, setPriceRange } = useFilter();

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
  };

  return (
    <div className="dropdown">
      <div className="range-values">
        <span>{priceRange[0]}$</span>
        <span>{priceRange[1]}$</span>
      </div>
      <div className="dropdown__btn slider">
        <Range
          step={0.1}
          min={0}
          max={999}
          values={priceRange}
          onChange={handlePriceRangeChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "0.5rem",
                width: "100%",
                background: `linear-gradient(to right, #cacaca ${
                  (priceRange[0] / initialValues[1]) * 100
                }%,
                  #333 ${(priceRange[0] / initialValues[1]) * 100}%, #333 ${
                  (priceRange[1] / initialValues[1]) * 100
                }%,
                  #cacaca ${(priceRange[1] / initialValues[1]) * 100}%)`,
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "1rem",
                width: "1rem",
                backgroundColor: "#999",
                borderRadius: "50%",
              }}
            />
          )}
        />
      </div>
    </div>
  );
}
