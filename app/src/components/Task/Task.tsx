import { Card, Text, Title } from "@mantine/core";

// Task type
export type TaskType = {
  id: string;
  title: string;
  description?: string;
  state: "completed" | "in-progress" | "hidden" | "archived" | "incomplete";
  updatedAt: Date;
  createdAt: Date;
  assignedTo: "Adam" | "Meredith" | "unassigned";
};

function Task({ taskProps }: { taskProps: TaskType }) {
  const { title, description, state, updatedAt, createdAt, assignedTo } =
    taskProps;
  return (
    <Card withBorder>
      <Title order={1}>{title}</Title>
      <Text>{description || "no description"}</Text>

      <Text>{state} </Text>
      <Text> {createdAt.toDateString()}</Text>
      <Text> {updatedAt.toDateString()}</Text>
      <Text> {assignedTo}</Text>
    </Card>
  );
}

export default Task;
