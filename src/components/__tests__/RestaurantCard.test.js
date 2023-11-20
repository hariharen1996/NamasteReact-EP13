import { render, screen } from "@testing-library/react";
import RestaurentData from "../RestaurentData";
import MOCK_DATA from "./mockdata/resMockData.json";
import { withPromotedLabel } from "../RestaurentData";
import "@testing-library/jest-dom";

it("should render restaurant data component with props data", () => {
  render(<RestaurentData swiggyData={MOCK_DATA} />);
  const name = screen.getByText("Mahesh Pav Bhaji");
  expect(name).toBeInTheDocument();
});

it("should render restaurant data component with promoted label", () => {
  const RestaurantOpened = withPromotedLabel(RestaurentData);
  render(<RestaurantOpened swiggyData={MOCK_DATA} />);
  const opened = screen.getByText("Opened");
  expect(opened).toBeInTheDocument();
});
