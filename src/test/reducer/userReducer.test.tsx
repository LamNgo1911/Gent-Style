import { waitFor } from "@testing-library/react";
import { userServer } from "../shared/mockServer";
import { newStore } from "../../redux/store";
import { UserRegistration } from "../../misc/types";
import {
  LoginInfo,
  checkAvailableEmail,
  clearAccessToken,
  clearError,
  fetchAccessToken,
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
    const access_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjc0NDk0MDI4fQ.kCak9sLJr74frSRVQp0_27BY4iBCgQSmoT3vQVWKzJg";
    await store.dispatch(fetchLogin(access_token));

    await waitFor(async () => {
      expect(store.getState().users.isLoading).toBe(true);
    });

    expect(store.getState().users.user).not.toBeNull;
  });

  test("should handle ACCESS_TOKEN success", async () => {
    const loginInfo: LoginInfo = {
      email: "lamngo123@gmail.com",
      password: "1234",
    };
    await store.dispatch(fetchAccessToken(loginInfo));

    await waitFor(() => {
      expect(store.getState().users.access_token).not.toBeNull;
      expect(store.getState().users.error).toBeNull();
    });
  });

  test("should handle CHECK_AVAILABLE_EMAIL success", async () => {
    const email = "test@test.com";
    await store.dispatch(checkAvailableEmail(email));

    await waitFor(() => {
      expect(store.getState().users.error).toBeNull();
    });
  });

  test("should handle FETCH_REGISTER success", async () => {
    const userRegistration: UserRegistration = {
      name: "testuser",
      email: "test@test.com",
      password: "testpass",
      avatar: "https://picsum.photos/800",
    };
    await store.dispatch(fetchRegister(userRegistration));

    await waitFor(() => {
      expect(store.getState().users.error).toBeNull();
    });
  });
});

describe("user actions", () => {
  test("should set user and clear error", () => {
    const user = {
      avatar: "####",
      email: "test@test.com",
      id: 123,
      name: "Test User",
      password: "password",
      role: "user",
    };

    store.dispatch(setUser(user));

    const { user: userState, isLoading, error } = store.getState().users;

    expect(userState).toEqual(user);
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
