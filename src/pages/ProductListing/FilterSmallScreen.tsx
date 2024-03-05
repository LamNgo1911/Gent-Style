import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BiLeftArrowAlt } from "react-icons/bi";
import { TiTickOutline } from "react-icons/ti";

import { useTheme } from "../../context/useTheme";
import { filterSmOptions } from "../../misc/filterOptions";
import { FilterOption } from "../../misc/types";
import SortDropdown from "./SortDropdown";

export default function FilterSmallScreen() {
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const sortContainerRef = useRef<HTMLDivElement>(null);

  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
  const [isFilterDropdownContainerOpen, setIsFilterDropdownContainerOpen] =
    useState<boolean>(false);
  const [openFilterType, setOpenFilterType] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [newFilterSmOptions, setNewFilterSmOptions] =
    useState<FilterOption[]>(filterSmOptions);

  const { theme } = useTheme();

  // close dropdown when users click outside
  const handleClickOutsideSortDropDown = (event: MouseEvent) => {
    const clickedSortContainer = sortContainerRef.current?.contains(
      event.target as Node
    );

    if (!clickedSortContainer) {
      setIsSortDropdownOpen(false);
    }
  };

  // exit by Esc key
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Escape") {
      setIsSortDropdownOpen(false);
      setIsFilterDropdownContainerOpen(false);
      setOpenFilterType(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideSortDropDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSortDropDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const sortHandler = (event: React.MouseEvent) => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  const filterHandler = () => {
    setIsFilterDropdownContainerOpen(!isFilterDropdownContainerOpen);
  };

  const openFilterTypeHandler = (i: number) => {
    setOpenFilterType(true);
    setCurrentIndex(i);
  };

  const clickOutsideHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <section className="filter-section">
      <div ref={sortContainerRef} className="sort-container">
        <div className={`sort-btn `} onClick={sortHandler}>
          <p>SORT</p>
          <IoIosArrowDown className="btn-icon" />
        </div>

        <div
          ref={sortDropdownRef}
          className={`sort-dropdown ${isSortDropdownOpen && "open"} ${theme}`}
        >
          <SortDropdown />
        </div>
      </div>

      <div className="filter-container">
        <div className="filter-btn" onClick={filterHandler}>
          <p>FILTER</p>
          <TiTickOutline className="btn-icon" />
        </div>

        <div
          onClick={() => setIsFilterDropdownContainerOpen(false)}
          className={`filter-dropdown__wrapper ${
            isFilterDropdownContainerOpen && "open"
          }`}
        >
          <div
            ref={filterDropdownRef}
            className={`filter-dropdown ${theme} ${openFilterType && "close"}`}
            onClick={clickOutsideHandler}
          >
            <h3>FILTER</h3>
            {newFilterSmOptions?.map(({ label }: FilterOption, i) => (
              <p
                key={label}
                onClick={() => openFilterTypeHandler(i)}
                className="dropdown__btn"
              >
                {label}
              </p>
            ))}
          </div>

          {/*  Price Range dropdown*/}
          {openFilterType && (
            <div
              className={`filter-type__wrapper ${theme}`}
              onClick={clickOutsideHandler}
            >
              <div
                className="filter-type__title"
                onClick={() => setOpenFilterType(false)}
              >
                <BiLeftArrowAlt />
                <span>
                  {newFilterSmOptions[currentIndex].label.toUpperCase()}
                </span>
              </div>

              {newFilterSmOptions[currentIndex].dropdown}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
