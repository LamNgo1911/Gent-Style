import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { newStore } from "../../redux/store";

const store = newStore(); // Create the Redux store

interface TestProviderProps {
  children: ReactNode;
}
const TestProvider = ({ children }: TestProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default TestProvider;
