import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuSearch } from "react-icons/lu";
import { debounce } from "lodash";

import "./SearchBar.scss";

type SearchBarProps = {
  setIsOpenSearchBtn: React.Dispatch<React.SetStateAction<boolean>>;
  isSmallScreen: boolean;
};

type FormValues = {
  searchQuery: string;
};

export default function SearchBar({
  setIsOpenSearchBtn,
  isSmallScreen,
}: SearchBarProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [debouncedSubmitSearch, setDebouncedSubmitSearch] = useState<SubmitHandler<FormValues> | null>(null);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmitSearch: SubmitHandler<FormValues> = (data, event) => {
    // Handle form submission
    console.log(data.searchQuery);
  };

  // close search bar when users click outside
  const handleClickOutsideSearchBar = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      setIsOpenSearchBtn(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideSearchBar);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSearchBar);
    };
  }, []);

  useEffect(() => {
    const debouncedHandler = debounce(
      (data: FormValues) => {
        if (debouncedSubmitSearch) {
          debouncedSubmitSearch(data);
        }
      },
      500 // Debounce delay of 500 milliseconds
    );

    setDebouncedSubmitSearch(() => debouncedHandler);

    return () => {
      debouncedHandler.cancel();
    };
  }, []);

  return (
    <form
      ref={formRef}
      className="form-search"
      onSubmit={handleSubmit(onSubmitSearch)}
    >
      <div className="form-search_wrapper">
        <LuSearch
          type="submit"
          className="header-btn"
          onClick={handleSubmit(onSubmitSearch)}
        />
        <input
          className="form-search__input"
          type="text"
          placeholder="Search for products"
          {...register("searchQuery")}
          onChange={(e) => debouncedSubmitSearch?.({ searchQuery: e.target.value })}
        />
      </div>
    </form>
  );
}