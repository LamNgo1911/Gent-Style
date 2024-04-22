import { waitFor } from "@testing-library/react";

import { userServer } from "../shared/mockServer";
import { newStore } from "../../redux/store";
import { Role, User, UserRegistration, UserStatus } from "../../misc/types";
import {
  LoginInfo,
  clearAccessToken,
  clearError,
  fetchLogin,
  fetchRegister,
  setError,
  setLoading,
  setUser,
} from "../../redux/slices/userSlice";

let store = newStore();

beforeAll(() => {
  userServer.listen();
});

afterEach(() => {
  userServer.resetHandlers();
});

afterAll(() => userServer.close());

beforeAll(() => {
  store = newStore();
});

describe("user reducer", () => {
  // user reducer test
  test("should return initial state", () => {
    expect(store.getState().users.user).toBeNull;
  });

  test("should handle LOGIN_USER success", async () => {
    const loginInfo: LoginInfo = {
      email: "lamngo123@gmail.com",
      password: "1234",
    };
    await store.dispatch(fetchLogin(loginInfo));

    await waitFor(() => {
      expect(store.getState().users.access_token).not.toBeNull;
      expect(store.getState().users.error).toBeNull();
    });
  });

  test("should handle FETCH_REGISTER success", async () => {
    const userRegistration: UserRegistration = {
      username: "testuser",
      email: "test@test.com",
      password: "testpass",
    };

    await store.dispatch(fetchRegister(userRegistration));

    await waitFor(() => {
      expect(store.getState().users.error).toBeNull();
    });
  });
});

describe("user actions", () => {
  test("should set user and clear error", () => {
    const sampleUser: User = {
      id: "123456789",
      username: "john_doe",
      email: "johndoe@example.com",
      status: UserStatus.ACTIVE,
      role: Role.ADMIN,
      resetToken: null,
      resetTokenExpiresAt: null,
      shippingAddress: {
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        country: "USA",
      },
      orders: [],
    };

    store.dispatch(setUser(sampleUser));

    const { user: userState, isLoading, error } = store.getState().users;

    expect(userState).toEqual(sampleUser);
    expect(isLoading).toBe(false);
    expect(error).toBeNull();
  });

  test("should set loading state", () => {
    store.dispatch(setLoading(true));

    const { isLoading } = store.getState().users;

    expect(isLoading).toBe(true);
  });

  test("should set error state", () => {
    const errorMessage = "Error message";

    store.dispatch(setError(errorMessage));

    const { error } = store.getState().users;

    expect(error).toBe(errorMessage);
  });

  test("should clear error state", () => {
    store.dispatch(clearError());

    const { error } = store.getState().users;

    expect(error).toBeNull();
  });

  test("should clear user and access token", () => {
    store.dispatch(clearAccessToken());

    const { user, access_token } = store.getState().users;

    expect(user).toBeNull();
    expect(access_token).toBeNull();
  });
});
