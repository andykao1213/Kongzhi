import { useEffect, useState, FC, ReactElement, useCallback } from "react";
import { ControlType } from "./useController";

type PropTypes = {
  control: ControlType;
  path: string;
  render: (value: any, onChange: (newVal: any) => void) => ReactElement;
};

export const Controller: FC<PropTypes> = ({ control, path, render }) => {
  const [value, setValue] = useState(control.getValues("")[path]);

  const onChange = useCallback(
    (newVal: any) => {
      control.updateValue(path, newVal);
    },
    [control, path]
  );

  useEffect(() => {
    control.subscribe((v: any) => {
      if (v !== value) {
        setValue(v[path]);
      }
    });
  }, [control, value, path]);

  return render(value, onChange);
};
