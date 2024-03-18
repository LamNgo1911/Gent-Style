import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import { filterLgOptions } from "../../misc/filterOptions";
import { FilterOption } from "../../misc/types";

export default function FilterBigScreen() {
  const dropdownLgScreenRefs = useRef<HTMLDivElement[]>([]);
  const filterContainerRefs = useRef<HTMLDivElement[]>([]);

  const [newFilterLgOptions, setNewFilterLgOptions] =
    useState<FilterOption[]>(filterLgOptions);

  const handleContainerClick = (i: number) => {
    const updatedOptions = newFilterLgOptions.map((option, index) => ({
      ...option,
      dropdownVisible: i === index ? !option.dropdownVisible : false,
    }));
    setNewFilterLgOptions(updatedOptions);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const clickedOnFilterContainer = filterContainerRefs.current.find(
      (ref) => ref && ref.contains(event.target as Node)
    );

    if (!clickedOnFilterContainer) {
      const updatedOptions = newFilterLgOptions.map((option) => ({
        ...option,
        dropdownVisible: false,
      }));
      setNewFilterLgOptions(updatedOptions);
    }
  };

  // exit by Esc key
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Escape") {
      const updatedOptions = newFilterLgOptions.map((option) => ({
        ...option,
        dropdownVisible: false,
      }));
      setNewFilterLgOptions(updatedOptions);
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
      {newFilterLgOptions?.map(({ label, dropdown, dropdownVisible }, i) => (
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
