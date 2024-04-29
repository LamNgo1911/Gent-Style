import React, { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuSearch } from "react-icons/lu";
import { debounce } from "lodash";

import "./SearchBar.scss";
import { useFilter } from "../../context/useFilter";
import { useNavigate } from "react-router-dom";

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
  const { search, setSearch } = useFilter();
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);
  const debouncedSubmitSearchRef = useRef<SubmitHandler<FormValues> | null>(
    null
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmitSearch: SubmitHandler<FormValues> = (data) => {
    // Handle form submission
    setSearch(data.searchQuery);
    navigate("/search-results");
    reset(); // Reset the form after submission
  };

  // Close search bar when users click outside
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
  }, [setIsOpenSearchBtn]);

  useEffect(() => {
    const debouncedHandler = debounce(
      (data: FormValues) => {
        if (debouncedSubmitSearchRef.current) {
          debouncedSubmitSearchRef.current(data);
        }
      },
      300 // Debounce delay of 300 milliseconds
    );

    debouncedSubmitSearchRef.current = debouncedHandler;

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
        />
      </div>
    </form>
  );
}
