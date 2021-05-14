import { useEffect, useState, ReactElement, useCallback } from "react";
import { ControlType } from "./useController";

type PropTypes<U, T> = {
  control: ControlType<U>;
  path: string;
  render: (value: T, onChange: (newVal: T) => void) => ReactElement;
};

export function Controller<U, T>({
  control,
  path,
  render,
}: PropTypes<U, T>): JSX.Element {
  const [value, setValue] = useState(() => control.getValues<T>(path));

  const onChange = useCallback(
    (newVal: T) => {
      control.updateValue(path, newVal);
    },
    [control, path]
  );

  useEffect(() => {
    control.subscribe(() => {
      const nextValue = control.getValues<T>(path);
      setValue(nextValue);
    });
  }, [control, path]);

  return render(value, onChange);
}
