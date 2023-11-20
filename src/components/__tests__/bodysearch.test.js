import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import { MOCK_DATA } from "./mockdata/bodyApiMockData.json";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import RestaurentData from "../RestaurentData";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("should render the body component with search button", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );

  //get the search btn with name as Search
  const searchBtn = screen.getByRole("button", { name: "Search" });
  //get the search input
  const searchInput = screen.getByTestId("searchInput");
  //search for an particular name, so we have to use fireEvent and mention the target
  fireEvent.change(searchInput, { target: { value: "KFC" } });
  //Now use fireEvent to click the search btn
  fireEvent.click(searchBtn);
  //screen should load 1 rescards, so assign testId for cards
  const card = screen.getAllByTestId("resCard");
  expect(card.length).toBe(1);
});

it("should search for food items based on top ratings", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
        <RestaurentData />
      </BrowserRouter>
    )
  );

  const cardBeforeFilter = screen.getAllByTestId("resCard");
  //check length of cards before testing
  expect(cardBeforeFilter.length).toBe(9);

  const toprated = screen.getByRole("button", {
    name: "Top Rated Restaurents",
  });
  fireEvent.click(toprated);

  const cardAfterFilter = screen.getAllByTestId("resCard");
  expect(cardAfterFilter.length).toBe(6);
});
