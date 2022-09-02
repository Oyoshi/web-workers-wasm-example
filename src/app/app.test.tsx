import { render, fireEvent } from "@testing-library/react";
import App from "./app";

describe("App", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<App />);
    expect(getByText("Compute n-th Fibonacci Number")).toBeInTheDocument();
  });

  it("should display error toaster when input number is negative", () => {
    const { queryByTestId, getByText } = render(<App />);
    const input = queryByTestId("nthNumberInput");
    fireEvent.change(input as HTMLElement, { target: { value: "-100" } });
    const submitButton = queryByTestId("submitStdButton");
    fireEvent.click(submitButton as HTMLElement);
    expect(
      getByText("Number must be a non negative integer!")
    ).toBeInTheDocument();
  });
});
