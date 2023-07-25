import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import App from "../App";
import * as userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import profileReducer from "../redux/reducers/profile";

describe("Home page component", () => {
  test("redirects to login page component", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const element = screen.queryByText("Login");

    if (element === null) {
      throw new Error("Element not found in the DOM");
    }
    act(() => {
      element.click();
    });
    const loginPage = screen.queryByTestId("loginPage");
    expect(loginPage).toBeInTheDocument();
    const username = screen.queryByPlaceholderText("insert username..");
    const password = screen.queryByPlaceholderText("insert password..");
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });
});

describe("Login page", () => {
  test("works correctly", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const user = userEvent.default.setup();

    const loginPage = screen.queryByTestId("loginPage");
    expect(loginPage).toBeInTheDocument();
    const username = screen.queryByPlaceholderText("insert username..");
    const password = screen.queryByPlaceholderText("insert password..");
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    const loginBtn = screen.queryByRole("button", { name: "Login" });
    act(() => {
      user.type(username, "manu.lele");
      user.tab();
      user.type(password, "qwerty");
      user.tab();
      user.click(loginBtn);
    });

    let state;
    state = profileReducer(
      { profile: { id: "", username: "", email: "", password: "", firstname: "", lastname: "", roles: [] } },
      {
        type: "SET_PROFILE",
        payload: {
          id: 1,
          username: "manu.lele",
          email: "emanuele.syrbe@epicode.com",
          password: "$2a$10$h0Mf4TjOicci1itBvdUGYOKqijXMsseJ5IGKP8MbZDqNnDrHUH2XK",
          firstname: "Emanuele",
          lastname: "Syrbe",
          roles: [
            { id: 2, role: "ROLE_USER" },
            { id: 1, role: "ROLE_ADMIN" },
          ],
        },
      }
    );
    expect(state).toEqual({
      profile: {
        id: 1,
        username: "manu.lele",
        email: "emanuele.syrbe@epicode.com",
        password: "$2a$10$h0Mf4TjOicci1itBvdUGYOKqijXMsseJ5IGKP8MbZDqNnDrHUH2XK",
        firstname: "Emanuele",
        lastname: "Syrbe",
        roles: [
          { id: 2, role: "ROLE_USER" },
          { id: 1, role: "ROLE_ADMIN" },
        ],
      },
    });
  });
});
