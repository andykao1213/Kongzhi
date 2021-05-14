import { useCallback, useMemo, useRef } from "react";
import { getValueByPath, setValueByPath } from "./libs";

type Subscriber<U> = (value?: U) => void;
type ControlType<U> = {
  subscribe: (cb: Subscriber<U>) => void;
  updateValue: <Type>(path: string, value: Type) => void;
  getValues: <Type>(path: string) => Type;
};
function useController<U>(initialState: U): ControlType<U> {
  const listeners = useRef<Subscriber<U>[]>([]);
  const state = useRef<U>(initialState);
  const subscribe = useCallback((cb: Subscriber<U>) => {
    listeners.current.push(cb);
  }, []);
  const updateValue = useCallback(<Type>(path: string, value: Type): void => {
    setValueByPath(state.current, path, value);
    listeners.current.forEach((cb) => {
      cb(state.current);
    });
  }, []);
  const getValues = useCallback(
    <Type>(path: string) => getValueByPath<Type>(state.current, path),
    []
  );
  return useMemo(() => ({ subscribe, updateValue, getValues }), [
    subscribe,
    updateValue,
    getValues,
  ]);
}
export { ControlType, useController };
