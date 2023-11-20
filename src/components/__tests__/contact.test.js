import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

describe("contact us page test case", () => {
  beforeAll(() => {
    console.log("Before All");
  });

  beforeEach(() => {
    console.log("Before Each");
  });

  afterAll(() => {
    console.log("After All");
  });

  afterEach(() => {
    console.log("After Each");
  });

  test("should check contact page has loaded", () => {
    render(<Contact />);

    let heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });

  test("should load button inside contact component", () => {
    render(<Contact />);
    let button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("should load input name inside contact component", () => {
    render(<Contact />);
    let input = screen.getByPlaceholderText("name");
    expect(input).toBeInTheDocument();
  });

  test("should load 2 input name inside contact component", () => {
    render(<Contact />);
    let inputTwo = screen.getAllByRole("textbox");
    expect(inputTwo.length).toBe(2);
  });
});
