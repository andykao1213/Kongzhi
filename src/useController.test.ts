import { renderHook, act } from "@testing-library/react-hooks";
import { useController } from "./useController";

test("updateValue should update the state correctly", () => {
  const initialState = { a: { b: 2 } };
  const { result } = renderHook(() => useController(initialState));
  result.current.updateValue("a.b", 5);
  act(() => expect(result.current.getValues("a.b")).toBe(5));
});

test("updateValue should trigger all the subscribers", () => {
  const initialState = { a: { b: 2 } };
  const { result } = renderHook(() => useController(initialState));
  const mockSubscriber1 = jest.fn();
  result.current.subscribe(mockSubscriber1);
  const mockSubscriber2 = jest.fn();
  result.current.subscribe(mockSubscriber2);
  result.current.updateValue("a.b", 5);
  act(() => {
    expect(mockSubscriber1.mock.calls[0][0]).toEqual(
      result.current.getValues("")
    );
    expect(mockSubscriber2.mock.calls[0][0]).toEqual(
      result.current.getValues("")
    );
  });
});
