import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  PaymentElementProps,
} from "@stripe/react-stripe-js";
import { v4 as uuid } from "uuid";

import "./Checkout.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useForm } from "react-hook-form";
import {
  CartItem,
  OrderInput,
  OrderStatus,
  ShippingAddress,
  User,
} from "../../misc/types";
import { useTheme } from "../../context/useTheme";
import { createNewOrder, setAddress } from "../../redux/slices/orderSlice";
import { deleteCartItem } from "../../redux/slices/cartSlice";

export default function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch: AppDispatch = useDispatch();
  const dispatchAction = useDispatch();

  const clientSecret = useSelector(
    (state: RootState) => state.orders.clientSecret
  ) as string;
  const access_token = useSelector(
    (state: RootState) => state.users.access_token
  ) as string;
  const user = useSelector((state: RootState) => state.users.user) as User;
  const total = useSelector((state: RootState) => state.carts.total) as number;
  const cartItems = useSelector(
    (state: RootState) => state.carts.items
  ) as CartItem[];
  const address = useSelector(
    (state: RootState) => state.orders.address
  ) as ShippingAddress;

  const baseUrl = window.location.origin;

  const { theme } = useTheme();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddress>();

  const onSubmitAddress = async (data: ShippingAddress) => {
    console.log(data);
    if (data) {
      dispatchAction(setAddress(data));
      setEditMode(false);
    }
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmitPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    if (address) {
      const orderData: OrderInput = {
        userId: user?.id,
        shipment: {
          method: "Standard Express",
          trackingNumber: uuid(),
          address: address as ShippingAddress,
        },
        priceSum: total,
        clientSecret,
        orderItems: cartItems,
        status: OrderStatus.PAID,
      };

      const fetchCreateOrder = async () => {
        const newOrderData = await dispatch(
          createNewOrder({ access_token, orderInput: orderData })
        );

        // Todo: delete all cartItems
        if (newOrderData.type === "order/createNewOrder/fulfilled") {
          cartItems?.map(async (cartItem: CartItem) => {
            await dispatch(
              deleteCartItem({ access_token, cartItemId: cartItem?.id })
            );
          });
        }
      };
      fetchCreateOrder();

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${baseUrl}/profile/my-orders?success=true`,
        },
      });

      if (error?.type === "card_error" || error?.type === "validation_error") {
        setMessage(error.message as string);
      } else {
        setMessage("An unexpected error occurred.");
      }

      setIsLoading(false);
    }
  };

  const paymentElementOptions: PaymentElementProps = {
    options: {
      layout: "tabs",
    },
  };

  return (
    <div className="checkout">
      {!editMode ? (
        <div className="checkout-address-result">
          <h2>Your shipping address</h2>
          <p>{address.street}</p>
          <p>{address.city}</p>
          <p>{address.state}</p>
          <p>{address.postalCode}</p>
          <p>{address.country}</p>
          <button
            type="submit"
            className={`submit-btn-edit ${theme}`}
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="checkout-address__wrapper">
          <h2>Address</h2>
          <form
            className="checkout-address"
            onSubmit={handleSubmit(onSubmitAddress)}
          >
            <div className="form-group">
              <label>Street</label>
              <input
                type="text"
                {...register("street", { required: "Street is required" })}
              />
              {errors.street && (
                <p className="error">{errors.street.message}</p>
              )}
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && <p className="error">{errors.city.message}</p>}
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                {...register("state", { required: "State is required" })}
              />
              {errors.state && <p className="error">{errors.state.message}</p>}
            </div>

            <div className="form-group">
              <label>Postal Code</label>
              <input
                type="text"
                {...register("postalCode", {
                  required: "Postal code is required",
                })}
              />
              {errors.postalCode && (
                <p className="error">{errors.postalCode.message}</p>
              )}
            </div>

            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                {...register("country", { required: "Country is required" })}
              />
              {errors.country && (
                <p className="error">{errors.country.message}</p>
              )}
            </div>

            <button type="submit" className={`submit-btn ${theme}`}>
              Submit
            </button>
          </form>
        </div>
      )}

      <div>
        <h2>Payment</h2>
        <form id="payment-form" onSubmit={handleSubmitPayment}>
          <PaymentElement id="payment-element" {...paymentElementOptions} />
          <button
            className="payment-btn"
            disabled={isLoading || !stripe || !elements}
            id="submit"
          >
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay now"
              )}
            </span>
          </button>
          {/* Show any error or success messages */}
          {message && (
            <div id="payment-message" className="error">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
