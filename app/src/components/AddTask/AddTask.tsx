import { useState } from "react";

import {
  Alert,
  Button,
  Card,
  MultiSelect,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { TaskType } from "../Task/Task";
import { v4 as uuidv4 } from "uuid";

function AddTask({
  tasks,
  setModalOpened,
  setNeedsUpdate,
}: {
  tasks: TaskType[];
  setModalOpened: (value: boolean) => void;
  setNeedsUpdate: (val: boolean) => void;
}) {
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues: TaskType = {
    id: uuidv4(),
    title: "",
    description: "",
    assignedTo: "unassigned",
    state: "incomplete",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const form = useForm({
    initialValues,
  });

  return (
    <Card withBorder>
      <form
        onSubmit={form.onSubmit((values) => {
          axios
            .put("http://localhost:4000/api/tasks", {
              title: values.title,
              description: values.description,
              assignedTo: values.assignedTo,
              state: "incomplete",
              dependsOn: values.dependsOn,
            })
            .then((res) => {
              if (res.status === 200) {
                console.log(res);
                setModalOpened(false);
                setNeedsUpdate(true);
              } else {
                console.log("Error");
              }
            });
        })}
      >
        <TextInput
          withAsterisk
          label="Task Title"
          placeholder="Task Title"
          required
          {...form.getInputProps("title")}
        />
        <TextInput
          mt={"sm"}
          label="Description"
          placeholder="Description"
          {...form.getInputProps("description")}
        />

        <Select
          mt={"sm"}
          label="Assigned To"
          placeholder="unassigned"
          data={[
            { label: "Adam", value: "Adam" },
            { label: "Meredith", value: "Meredith" },
            { label: "unassigned", value: "unassigned" },
          ]}
          {...form.getInputProps("assignedTo")}
        />
        {errorMessage && (
          <Alert title="Error" color="red" mt="md">
            {errorMessage}
          </Alert>
        )}
        <MultiSelect
          mt={"sm"}
          label="Depends On"
          data={tasks.map((task) => {
            return {
              label: task.title,
              value: task.id,
              group: task.assignedTo,
            };
          })}
          {...form.getInputProps("dependsOn")}
        />
        <Button
          mt="md"
          onClick={() => {
            setErrorMessage("");
          }}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Card>
  );
}

export default AddTask;
