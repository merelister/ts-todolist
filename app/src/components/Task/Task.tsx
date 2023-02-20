import {
  Button,
  Card,
  Checkbox,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import axios from "axios";
import { useState } from "react";

// Task type
export type TaskType = {
  id: string;
  title: string;
  description?: string;
  state: "completed" | "in-progress" | "hidden" | "archived" | "incomplete";
  updatedAt: Date;
  createdAt: Date;
  assignedTo: "Adam" | "Meredith" | "unassigned";
  dependsOn?: string[];
};

function Task({
  taskProps,
  setNeedsUpdate,
}: {
  taskProps: TaskType;
  setNeedsUpdate: (val: boolean) => void;
}) {
  const { id, title, description, state, updatedAt, createdAt, assignedTo } =
    taskProps;
  const [checked, setChecked] = useState(state === "completed");

  const cardColor = (): string => {
    switch (assignedTo) {
      case "Adam":
        return "#ffd9a8";
      case "Meredith":
        return "#a8ffba";
      default:
        return "none";
    }
  };

  return (
    // <Card withBorder style={{ width: "100%" }}>
    <>
      <Group position="apart" noWrap>
        <Button
          onClick={async (event) => {
            // console.log(event);
            await axios.delete(`http://localhost:4000/api/tasks/${id}`);
            setNeedsUpdate(true);
          }}
          color="red"
        >
          Delete
        </Button>
        <Title order={1}>{title}</Title>
        <Checkbox
          label="complete"
          checked={checked}
          onChange={(event) => {
            setChecked(event.currentTarget.checked);

            const checkedString = event.currentTarget.checked
              ? "completed"
              : "incomplete";

            console.log({
              ...taskProps,
              state: checkedString,
            });

            axios.put("http://localhost:4000/api/tasks", {
              ...taskProps,
              state: checkedString,
            });
          }}
        />
      </Group>
      <Divider />

      <Group mt="md" position="apart" noWrap>
        <Stack>
          <Text>{description || "no description"}</Text>
          <Text>{state} </Text>
        </Stack>
        <Stack></Stack>
      </Group>
      <Text>Assigned to: {assignedTo}</Text>
      <Divider />
      <Group mt={"xs"} position="apart" noWrap>
        <Text size={"sm"} italic>
          Created at: {createdAt.toDateString()}
        </Text>
        <Text size={"sm"} italic>
          Updated at: {updatedAt.toDateString()}
        </Text>
      </Group>
    </>
    // </Card>
  );
}

export default Task;
