import React from "react";
import { render, queries, fireEvent } from "@testing-library/react";

import { Controller } from "./Controller";
import { useController } from "./useController";

function TestComponent({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  renderTracker = () => {},
}: {
  renderTracker?: () => void;
}) {
  renderTracker();
  const control = useController({ a: { b: [1] } });
  return (
    <Controller<{ a: { b: number[] } }, number>
      control={control}
      path="a.b[0]"
      render={(value, onChange) => (
        <input
          data-testid="rendered-input"
          value={value}
          onChange={(evt) => onChange(parseInt(evt.target.value))}
        />
      )}
    />
  );
}

test("should render with correct value", async () => {
  const { getByTestId } = render(<TestComponent />, { queries });
  const input = getByTestId("rendered-input") as HTMLInputElement;
  expect(input.value).toBe("1");
});

test("should change the vlaue correctly", () => {
  const { getByTestId } = render(<TestComponent />, { queries });
  const input = getByTestId("rendered-input") as HTMLInputElement;
  fireEvent.change(input, { target: { value: 123 } });
  expect(input.value).toBe("123");
});

test("no rerender when onChange trigger", () => {
  const renderTracker = jest.fn();
  const { getByTestId } = render(
    <TestComponent renderTracker={renderTracker} />,
    { queries }
  );
  const input = getByTestId("rendered-input") as HTMLInputElement;
  fireEvent.change(input, { target: { value: 123 } });
  expect(renderTracker).toBeCalledTimes(1);
});
