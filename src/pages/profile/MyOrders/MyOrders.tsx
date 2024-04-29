import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../redux/store";
import { Order } from "../../../misc/types";
import { getAllOrdersByUserId } from "../../../redux/slices/orderSlice";
import "./MyOrders.scss";

export default function MyOrders() {
  const dispatch: AppDispatch = useDispatch();
  const items = useSelector(
    (state: RootState) => state.orders.items
  ) as Order[];
  const access_token = useSelector(
    (state: RootState) => state.users.access_token
  ) as string;
  console.log(items);

  useEffect(() => {
    const fetchAllOrders = async () => {
      await dispatch(getAllOrdersByUserId(access_token));
    };
    fetchAllOrders();
  }, [dispatch, access_token]);

  return (
    <>
      {items?.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Tracking Number</th>
                <th>Total</th>
                <th>Items</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {items.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.shipment.trackingNumber}</td>
                  <td>{order.priceSum}</td>
                  <td>{order.orderItems.length}</td>
                  <td>{order.status}</td>
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
    </>
  );
}
