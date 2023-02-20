import { Text, Card, Title, Group, Code, Button } from "@mantine/core";
import React from "react";
import { TaskType } from "../Task/Task";

function TaskDetails({
  task,
  handleDelete,
  handleComplete,
  handleIncomplete,
}: {
  task: TaskType;
  handleDelete: (event: React.MouseEvent) => void;
  handleComplete: (event: React.MouseEvent) => void;
  handleIncomplete: (event: React.MouseEvent) => void;
}) {
  return (
    <>
      <Title order={1}>{task.title}</Title>
      <Code block>{task.description}</Code>

      <Button onClick={handleDelete}>Delete</Button>

      <Group position="apart" mt="md">
        <Text italic size={"sm"}>
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </Text>
        <Text italic size={"sm"}>
          Updated: {new Date(task.updatedAt).toLocaleDateString()}
        </Text>
      </Group>
    </>
  );
}

export default TaskDetails;
