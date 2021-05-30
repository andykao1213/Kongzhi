# Kongzhi

> Kongzhi leverage the pronunciation of "控制" in Mandarin. Which means "control".

## Install

```bash
npm install kongzhi
```

## The Problem

While building an app with multiple React elements sharing a single state, we may encounter performance issues easily. Let's say there's a big form with the following structure:

```jsx
function BigForm() {
  const [formData, setFormData] = useReducer(
    (state, action) => ({ ...state, ...action }),
    { filed1: "", field2: "" /*...many fileds*/ }
  );

  return (
    <form>
      {Object.key((key) => (
        <input
          key={key}
          name={key}
          value={formDate[key]}
          onChange={(e) => setFormData({ [key]: e.target.value })}
        />
      ))}
    </form>
  );
}
```

You should found that when the user inputs something, the whole component keeps rerendering. But all we want to rerender is the input component that the user is typing. We may come up with the idea of [state colocation](https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster), but it requires wrapping another layer of component, which may bring bad readability.
Kongzhi is trying to solve this problem. It provides a Controller component that can do isolated rendering without wrapping another component. And the library is not only suited for form but also other complex situations such as labeling tools.

## Quick Start

```jsx
function BigForm() {
  const state = useController({
    field1: "",
    field2: "",
    field3: { field4: "" },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const a = state.getValues("");
        console.log(a);
      }}
    >
      <Controller
        control={state}
        path="field1"
        render={(value, onChange) => (
          <input value={value} onChange={(e) => onChange(e.target.value)} />
        )}
      />
      <Controller
        control={state}
        path="field2"
        render={(value, onChange) => (
          <input value={value} onChange={(e) => onChange(e.target.value)} />
        )}
      />
      <Controller
        control={state}
        path="field3.field4"
        render={(value, onChange) => (
          <input value={value} onChange={(e) => onChange(e.target.value)} />
        )}
      />
      <input type="submit" />
    </form>
  );
}
```

## Examples

TBD

## Future Works

- useIterator
