import {
  Button,
  Card,
  Code,
  Divider,
  Group,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import TaskDetails from "../TaskDetails/TaskDetails";

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

  const [showDetails, setShowDetails] = useState(false);

  const cardEmoji = (): string => {
    switch (assignedTo) {
      case "Adam":
        return "🚄";
      case "Meredith":
        return "🧸";
      default:
        return "👽";
    }
  };

  // Handlers
  const handleDelete = async (event: React.MouseEvent) => {
    await axios.delete(`http://localhost:4000/api/tasks/${id}`);
    setNeedsUpdate(true);
  };

  const handleComplete = async (event: React.MouseEvent) => {
    await axios.put(`http://localhost:4000/api/tasks/`, {
      ...taskProps,
      state: "completed",
    });
    setNeedsUpdate(true);
  };

  const handleIncomplete = async (event: React.MouseEvent) => {
    await axios.put(`http://localhost:4000/api/tasks/`, {
      ...taskProps,
      state: "incomplete",
    });
    setNeedsUpdate(true);
  };

  return (
    <Card withBorder style={{ width: "100%" }}>
      {/* Modal */}
      {showDetails && (
        <Modal
          title="Task Details"
          opened={showDetails}
          onClose={() => setShowDetails(false)}
        >
          <TaskDetails
            handleDelete={handleDelete}
            handleComplete={handleComplete}
            handleIncomplete={handleIncomplete}
            task={taskProps}
          />
        </Modal>
      )}

      {/* Main */}
      <Group position="apart" noWrap>
        <Title order={2}>
          {cardEmoji()} {title}
        </Title>
        <Group noWrap>
          {/* Buttons */}
          <Button onClick={() => setShowDetails(true)} color="blue">
            Details
          </Button>
          <Button onClick={handleDelete} color="red">
            Delete{" "}
          </Button>
          {state !== "completed" ? (
            <Button onClick={handleComplete} color="green">
              Complete
            </Button>
          ) : (
            <Button onClick={handleIncomplete} color="violet">
              Undo
            </Button>
          )}
        </Group>
      </Group>
      <Divider mt={"xs"} />

      <Group position="apart" noWrap>
        <Code
          style={{
            width: "100%",
          }}
          p={"xs"}
          block
        >
          {description || "no description"}
        </Code>
      </Group>
      {/* <Text>Assigned to: {assignedTo}</Text> */}
      <Divider />
      <Group mt={"xs"} position="apart" noWrap>
        <Text size={"sm"} italic>
          Created at: {createdAt.toDateString()}
        </Text>
        <Text size={"sm"} italic>
          Updated at: {updatedAt.toDateString()}
        </Text>
      </Group>
    </Card>
  );
}

export default Task;
