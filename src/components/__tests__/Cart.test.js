import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import MenuCategory from "../MenuCategory";
import { MOCK_CART_DATA } from "./mockdata/menuMockData.json";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../utils/redux/store";
import "@testing-library/jest-dom";
import ItemList from "../ItemList";
import Cart from "../Cart";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_CART_DATA);
    },
  });
});

it("should load restaurant menu component and check whether accordian text is present", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MenuCategory />
        </Provider>
      </BrowserRouter>
    )
  );

  const accordianHeader = screen.getByText("Sweet (45)");
  fireEvent.click(accordianHeader);

  expect(screen.getAllByTestId("menu-items").length).toBe(45);
});

it("should load restaurant menu component and check when add button is clicked", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MenuCategory />
          <Cart />
        </Provider>
      </BrowserRouter>
    )
  );

  const addBtns = screen.getAllByRole("button", { name: "Add" });
  fireEvent.click(addBtns);

  expect(screen.getByText("Cart (1)")).toBeInTheDocument();
});

it("should load restaurant menu component and 2 items should be added when add btn is clicked", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MenuCategory />
          <Cart />
        </Provider>
      </BrowserRouter>
    )
  );

  const addBtns = screen.getAllByRole("button", { name: "Add" });
  fireEvent.click(addBtns);

  expect(screen.getByText("Cart (2)")).toBeInTheDocument();
});

it("should load restaurant menu component and 1 items should be added when add btn is clicked", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MenuCategory />
          <Cart />
        </Provider>
      </BrowserRouter>
    )
  );

  const addBtns = screen.getAllByRole("button", { name: "Add" });
  fireEvent.click(addBtns[1]);

  expect(screen.getByText("Cart (2)")).toBeInTheDocument();
});

it("should check whether the cart items is cleared when clear button clicked", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MenuCategory />
          <Cart />
        </Provider>
      </BrowserRouter>
    )
  );

  const clearBtn = screen.getAllByRole("button", { name: "Clear Cart" });
  fireEvent.click(clearBtn);

  expect(
    screen.getByText("Cart is empty. Please add items in your cart")
  ).toBeInTheDocument();
});
