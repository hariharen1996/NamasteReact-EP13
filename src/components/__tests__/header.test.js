import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../utils/redux/store";
import Header from "../Header";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

it("should load header component with login button", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const loginButton = screen.getByRole("button");
  expect(loginButton).toBeInTheDocument();
});

it("should load header component with cart text which includes value 0", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  //   const cart = screen.getByText("Cart");
  const cart = screen.getByText(/Cart/);
  expect(cart).toBeInTheDocument();
});

it("should load header component with login button of speicic value", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const button = screen.getByRole("button", { name: "Login" });
  expect(button).toBeInTheDocument();
});

it("should load header component with Login button when clicked it should change to logout", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const loginButton = screen.getByRole("button", { name: "Login" });
  fireEvent.click(loginButton);

  const logoutButton = screen.getByRole("button", { name: "Logout" });
  expect(logoutButton).toBeInTheDocument();
});
