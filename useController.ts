import { useCallback, useMemo, useRef } from "react";
import { getValueByPath, setValueByPath } from "./libs";

export function useController<T>(initialState: T) {
  const listeners = useRef<Function[]>([]);
  const state = useRef<T>(initialState);

  const subscribe = useCallback((cb: Function) => {
    listeners.current.push(cb);
  }, []);

  const updateValue = useCallback((prop, value) => {
    setValueByPath(state.current, prop, value);
    listeners.current.forEach((cb) => {
      cb(state.current);
    });
  }, []);

  const getValues = (path: string) => getValueByPath(state.current, path);

  return useMemo(() => ({ subscribe, updateValue, getValues }), [
    subscribe,
    updateValue,
  ]);
}

export type ControlType = ReturnType<typeof useController>;
