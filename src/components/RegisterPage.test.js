import { Provider } from "react-redux";
import store from "../redux/store";
import { render, screen } from "@testing-library/react";
import * as userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import App from "../App";
import RegisterPage from "./RegisterPage";
import { BrowserRouter } from "react-router-dom";

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
  test("redirect to register page", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const user = userEvent.default.setup();

    const registerBtn = screen.queryByText("Registrati");
    expect(registerBtn).toBeInTheDocument();
    act(() => {
      user.click(registerBtn);
      user.click(registerBtn);
    });
  });
});

describe("Register page", () => {
  test("Works correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>
    );

    const nameFiled = screen.queryByPlaceholderText("insert first name..");
    const lastNameField = screen.queryByPlaceholderText("insert last name..");
    const emailField = screen.queryByPlaceholderText("insert email..");
    const usernameField = screen.queryByPlaceholderText("insert username..");
    const passwordField = screen.queryByPlaceholderText("insert password..");

    expect(nameFiled).toHaveValue("");
    expect(lastNameField).toHaveValue("");
    expect(emailField).toHaveValue("");
    expect(usernameField).toHaveValue("");
    expect(passwordField).toHaveValue("");

    expect(nameFiled).toBeRequired();
    expect(lastNameField).toBeRequired();
    expect(emailField).toBeRequired();
    expect(usernameField).toBeRequired();
    expect(passwordField).toBeRequired();
  });
});
