import React from "react";
import { render, screen } from "@testing-library/react";
import HomeComponent from "./HomePageComponent";
import { Provider } from "react-redux";
import store from "../redux/store";

describe("Home page component", () => {
  test("renders home component", () => {
    render(
      <Provider store={store}>
        <HomeComponent />
      </Provider>
    );
    const element = screen.getByTestId("homePage");
    if (element === null) {
      throw new Error("Element not found in the DOM");
    }
    expect(element).toBeInTheDocument();
  });
  test("renders card banner", () => {
    render(
      <Provider store={store}>
        <HomeComponent />
      </Provider>
    );
    const element = screen.getByTestId("banner");
    if (element === null) {
      throw new Error("Element not found in the DOM");
    }
    expect(element).toBeInTheDocument();
  });
  test("renders surf equipment carousel", () => {
    render(
      <Provider store={store}>
        <HomeComponent />
      </Provider>
    );
    const element = screen.getAllByTestId("carousel")[0];
    if (element === null) {
      throw new Error("Element not found in the DOM");
    }
    expect(element).toBeInTheDocument();
  });

  test("renders windsurf equipment carousel", () => {
    render(
      <Provider store={store}>
        <HomeComponent />
      </Provider>
    );
    const element = screen.getAllByTestId("carousel")[1];
    if (element === null) {
      throw new Error("Element not found in the DOM");
    }
    expect(element).toBeInTheDocument();
  });
  test("renders kitesurf equipment carousel", () => {
    render(
      <Provider store={store}>
        <HomeComponent />
      </Provider>
    );
    const element = screen.getAllByTestId("carousel")[2];
    if (element === null) {
      throw new Error("Element not found in the DOM");
    }
    expect(element).toBeInTheDocument();
  });
  test("renders wakeboard equipment carousel", () => {
    render(
      <Provider store={store}>
        <HomeComponent />
      </Provider>
    );
    const element = screen.getAllByTestId("carousel")[3];
    if (element === null) {
      throw new Error("Element not found in the DOM");
    }
    expect(element).toBeInTheDocument();
  });
});
