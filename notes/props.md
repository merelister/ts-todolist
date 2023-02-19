# Providing props to a functional component

The functional component `Task` has an argument of `taskProps`

- `taskProps` is an object, wrapped in {}
- only the `taskProps` object is accessible to `Task`, not the default props passed from React
- to the right of the colon is a **type annotation**: information describing the type of the props
- `taskProps` is of type `TaskType`
- the right hand side is providing and example of the structure that we expect the `taskProps` argument to conform to. This is called a type annotation

```tsx
export type TaskType = {
  id: string;
  title: string;
  description?: string;
  state: "completed" | "in-progress" | "hidden" | "archived" | "incomplete";
  updatedAt: Date;
  createdAt: Date;
};

function Task({ taskProps }: { taskProps: TaskType }) {
  return (
    <Box>
      <h1>{taskProps.title}</h1>
      {!!taskProps.description ? taskProps.description : "no description"}
      <ul>
        <li>{taskProps.state}</li>
        <li>{taskProps.updatedAt.toDateString()}</li>
        <li>{taskProps.createdAt.toDateString()}</li>
      </ul>
    </Box>
  );
}
```

This function is equivalent to:

```tsx
function Task(props) {
    // note: the `as TaskType` is declarative, not imperative. (like fitting the object to an interface)
  const taskProps = props.taskProps as TaskType;
*/

```

## Providing different types of props to functional components

Here is an example where we destructure the props object to retrieve a single primitive value, `label`

```tsx
function Item({ label }: { label: String }) {
  return <div>{label}</div>;
}

<Item label="test" />;
```

Here is an example where we destructure the props object to retrieve multiple values, `label` and `value`

```tsx
function ComplexItem({ label, value }: { label: String; value: String }) {
  return (
    <div>
      {label} {value}
    </div>
  );
}
<ComplexItem label="test" value="test2" />;
```

Because `ObjectProps` is already an object with the values of `label` and `value`, we can provide just the type name for the type annotation. The arguments must conform to the structure of `ObjectProps`.

Because we are destructuring ObjectProps into the `label` and `value` objects, we can access those values in the functional component as `label` and `value`, rather than as `ObjectProps.label` and `ObjectProps.value`

```tsx
type ObjectProps = {
  label: String;
  value: {
    foo: String;
    bar: Number;
  };
};

function ObjectItem({ label, value }: ObjectProps) {
  return (
    <div>
      <>
        {label} {value.bar} {value.foo}
      </>
    </div>
  );
}

<ObjectItem label="test" value={{ foo: "test", bar: 2 }} />;
```

We could do the same thing with our original `Task` functional component as well:

```tsx
function Task({
  id,
  title,
  description,
  state,
  updatedAt,
  createdAt,
}: TaskType) {
  return (
    <Box>
      <h1>{title}</h1>
      {!!description ? description : "no description"}
      <ul>
        <li>{state}</li>
        <li>{updatedAt.toDateString()}</li>
        <li>{createdAt.toDateString()}</li>
      </ul>
    </Box>
  );
}
```

This can be annoying to work with though, because when we create a `Task` component and pass in the props, we can't pass in a single TaskType object. Instead, we would need to pass in data that conforms to an interface that extends props ?

Instead, if you want to access the values by their name directly instead of like `taskProps.title`, you can destructure them further within the function.

```tsx
const { title, description, state, updatedAt, createdAt } = taskProps;
```
