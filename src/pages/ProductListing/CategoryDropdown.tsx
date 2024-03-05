import { TiTickOutline } from "react-icons/ti";

import { useFetchAllCategoriesQuery } from "../../redux/productQuery";
import { useState } from "react";
import { useFilter } from "../../context/useFilter";

export default function CategoryDropdown() {
  const { data: category, isLoading, error } = useFetchAllCategoriesQuery();
  const { categoryId, setCategoryId } = useFilter();

  const filteByCategoryHandler = (id: number, i: number) => {
    if (Number(categoryId) === id) {
      setCategoryId("");
    } else {
      setCategoryId(id.toString());
    }
  };

  return (
    <div className="dropdown">
      <button className="btn-all">
        <TiTickOutline className="tick-icon" /> <span>ALL</span>
      </button>
      <div className="dropdown__content category">
        {category?.map(({ name, id }, i) => (
          <div
            className={`dropdown__btn ${Number(categoryId) === id && "active"}`}
            key={i}
            onClick={() => filteByCategoryHandler(id, i)}
          >
            <p>{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
