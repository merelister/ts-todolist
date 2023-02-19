import React from "react";

import { useForm } from "@mantine/form";
import { Box, TextInput } from "@mantine/core";
import { TaskType } from "../Task/Task";

function AddTask() {
  const initialValues: TaskType = {
    id: "1",
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
    <Box>
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
        })}
      >
        <TextInput
          withAsterisk
          label="Task Title"
          placeholder="Task Title"
          required
          {...form.getInputProps("title")}
        ></TextInput>
        <TextInput
          label="Description"
          placeholder="Description"
          {...form.getInputProps("description")}
        ></TextInput>
      </form>
    </Box>
  );
}

export default AddTask;
