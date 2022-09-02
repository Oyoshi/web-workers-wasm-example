import { render, fireEvent } from "@testing-library/react";
import Form from "./form";

describe("Form", () => {
  const onSubmit = jest.fn();
  it("should call function to compute Fibonacci number in standard way", () => {
    const { queryByTestId } = render(<Form onSubmit={onSubmit} />);
    const input = queryByTestId("nthNumberInput");
    fireEvent.change(input as HTMLElement, { target: { value: "20" } });
    const submitButton = queryByTestId("submitStdButton");
    fireEvent.click(submitButton as HTMLElement);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith("standard", "20");
  });

  it("should call function to compute Fibonacci number using web worker", () => {
    const { queryByTestId } = render(<Form onSubmit={onSubmit} />);
    const input = queryByTestId("nthNumberInput");
    fireEvent.change(input as HTMLElement, { target: { value: "20" } });
    const submitButton = queryByTestId("submitWorkerButton");
    fireEvent.click(submitButton as HTMLElement);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith("worker", "20");
  });
});
