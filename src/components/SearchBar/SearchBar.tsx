import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type SearchBarProps = {
  setIsOpenSearchBtn: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormValues = {
  searchQuery: string;
};

export default function SearchBar({ setIsOpenSearchBtn }: SearchBarProps) {
  const formRef = useRef<HTMLFormElement>(null);

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
  const handleClickOutside = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      setIsOpenSearchBtn(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form
      ref={formRef}
      className="form-search"
      onSubmit={handleSubmit(onSubmitSearch)}
    >
      <input
        className="form-search__input"
        type="text"
        placeholder="Search for products"
        {...register("searchQuery")}
      />
    </form>
  );
}
