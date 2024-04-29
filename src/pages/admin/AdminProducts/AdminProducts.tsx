import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";

import { RootState } from "../../../redux/store";
import { useFetchProductsByPaginationQuery } from "../../../redux/productQuery";
import "./AdminProducts.scss";
import { useFilter } from "../../../context/useFilter";
import { useEffect, useState } from "react";
import LoadingError from "../../../components/LoadingError";
import ReactPaginate from "react-paginate";
import { useMediaQueries } from "../../../hooks/useMediaQuery";
import { useTheme } from "../../../context/useTheme";
import { useLocation } from "react-router-dom";
import AdminCreateProduct from "./AdminCreateProduct";
import AdminUpdateProduct from "./AdminUpdateProduct";

type Variant = {
  color: string;
  size: string;
  stock: number;
};

export type ProductInput = {
  name: string;
  price: number;
  description: string;
  category: string;
  variants: Variant[];
  images: File[];
};

export default function AdminProducts() {
  const { isBigScreen } = useMediaQueries();
  const { theme } = useTheme();
  const location = useLocation();

  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [openUpdateProduct, setOpenUpdateProduct] = useState(false);
  const [productId, setProductId] = useState("");

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [count, setCount] = useState(0);
  const limit = 8;

  const {
    categoryName,
    priceRange,
    sort,
    size,
    color,
    search,
    setSort,
    setSize,
    setColor,
    setCategoryName,
    setPriceRange,
  } = useFilter();

  useEffect(() => {
    setCurrentPage(1); // Reset the current page when the filters change
  }, [sort, size, color, search, categoryName, priceRange]);

  const skip = (currentPage - 1) * limit;

  const {
    data: productsByPagination,
    isLoading,
    error: productsError,
  } = useFetchProductsByPaginationQuery({
    sort,
    skip,
    limit,
    size,
    color,
    search,
    category: categoryName,
    priceMin: Number(priceRange[0]),
    priceMax: Number(priceRange[1]),
  });

  const { error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    setCount(productsByPagination?.count as number);
  }, [productsByPagination]);

  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected + 1);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setSort("");
    setSize("");
    setColor("");
    setCategoryName("");
    setPriceRange([0, 999]);
  }, [location]);

  const handleCreateProduct = () => {
    setOpenCreateProduct(true);
  };

  const handleUpdateProduct = (productId: string) => {
    setProductId(productId);
    setOpenUpdateProduct(true);
  };

  const handleDeleteProduct = () => {};

  // handle error
  if (error) {
    return <LoadingError />;
  }
  console.log(openCreateProduct, openUpdateProduct);

  return (
    <>
      <div className="admin-product">
        <button className="create-btn" onClick={handleCreateProduct}>
          Create Product
        </button>
        {(productsByPagination?.products?.length as number) > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>image</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {productsByPagination?.products?.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category.id}</td>
                    <td>
                      <img
                        className="product-img"
                        src={product.images[0]}
                        alt="product"
                      />
                    </td>
                    <td>
                      <div className="actions-btns">
                        <FaEdit
                          onClick={() => handleUpdateProduct(product.id)}
                          className="actions-btn"
                        />{" "}
                        {/* Update icon */}
                        <FaTrash
                          onClick={handleDeleteProduct}
                          className="actions-btn"
                        />{" "}
                        {/* Delete icon */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="not-found">
            <p>No items found!</p>
          </div>
        )}
        {Math.ceil(count / limit) > 1 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={Math.ceil(count / limit) || 0}
            forcePage={currentPage - 1}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName={`pagination-container ${theme}`}
            activeClassName="active-page"
          />
        )}
      </div>

      <div className={`create-product-dropdown ${openCreateProduct && "open"}`}>
        <div className="create-product-dropdown-wrapper">
          <AdminCreateProduct
            openCreateProduct={openCreateProduct}
            setOpenCreateProduct={setOpenCreateProduct}
          />
        </div>
      </div>

      <div className={`update-product-dropdown ${openUpdateProduct && "open"}`}>
        <div className="update-product-dropdown-wrapper">
          <AdminUpdateProduct
            setOpenUpdateProduct={setOpenUpdateProduct}
            productId={productId}
          />
        </div>
      </div>
    </>
  );
}
