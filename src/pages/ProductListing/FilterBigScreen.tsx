import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import { filterOptions } from "../../misc/filterOptions";
import { FilterOption } from "../../misc/types";

export default function FilterBigScreen() {
  const dropdownLgScreenRefs = useRef<HTMLDivElement[]>([]);
  const filterContainerRefs = useRef<HTMLDivElement[]>([]);
  const [newFilterOptions, setNewFilterOptions] =
    useState<FilterOption[]>(filterOptions);

  const handleContainerClick = (i: number) => {
    const updatedOptions = newFilterOptions.map((option, index) => ({
      ...option,
      dropdownVisible: i === index ? !option.dropdownVisible : false,
    }));
    setNewFilterOptions(updatedOptions);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const clickedOnFilterContainer = filterContainerRefs.current.find(
      (ref) => ref && ref.contains(event.target as Node)
    );
    console.log(clickedOnFilterContainer);
    if (!clickedOnFilterContainer) {
      const updatedOptions = newFilterOptions.map((option) => ({
        ...option,
        dropdownVisible: false,
      }));
      setNewFilterOptions(updatedOptions);
    }
  };

  // exit by Esc key
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Escape") {
      const updatedOptions = newFilterOptions.map((option) => ({
        ...option,
        dropdownVisible: false,
      }));
      setNewFilterOptions(updatedOptions);
    }
  };

  const addFilterContainerRef = (ref: HTMLDivElement | null) => {
    if (ref && !filterContainerRefs.current.includes(ref)) {
      filterContainerRefs.current.push(ref);
    }
  };

  const addDropdownLgScreenRef = (ref: HTMLDivElement | null) => {
    if (ref && !dropdownLgScreenRefs.current.includes(ref)) {
      dropdownLgScreenRefs.current.push(ref);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section className="filter-section-lg">
      {newFilterOptions?.map(({ label, dropdown, dropdownVisible }, i) => (
        <div
          className="filter-container-lg"
          key={i}
          ref={addFilterContainerRef}
        >
          <div className="filter-btn" onClick={() => handleContainerClick(i)}>
            <p>{label}</p>
            <IoIosArrowDown className="arrow-btn" />
          </div>
          {dropdownVisible && (
            <div ref={addDropdownLgScreenRef}>{dropdown}</div>
          )}
        </div>
      ))}
    </section>
  );
}
