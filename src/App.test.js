import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

describe("App component", () => {
  test("renders navbar", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const element = screen.getByTestId("navbar");
    if (element === null) {
      throw new Error("Element not found in the DOM");
    }
    expect(element).toBeInTheDocument();
  });

  test("renders home page", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const element = screen.getByTestId("homePage");
    if (element === null) {
      throw new Error("Element not found in the DOM");
    }
    expect(element).toBeInTheDocument();
  });
  test("renders footer", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const element = screen.getByTestId("footer");
    if (element === null) {
      throw new Error("Element not found in the DOM");
    }
    expect(element).toBeInTheDocument();
  });
});
