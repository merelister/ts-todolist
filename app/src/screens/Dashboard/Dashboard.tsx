import { Card, Chip, Group, Stack, Title } from "@mantine/core";
import { useState } from "react";
import TaskList from "../../components/TaskList/TaskList";
import { TaskType } from "../../components/Task/Task";

function Dashboard() {
  // chip group 1 is for states and are ORed together
  // chip group 2 is for assignedTo and are ORed together
  // chip groups 1 and 2 are ANDed together

  // Raw String States
  const [stateValue, setStateValue] = useState<string[]>([
    "incomplete",
    "in-progress",
  ]);
  const [assignedToValue, setAssignedToValue] = useState<string[]>([
    "Adam",
    "Meredith",
    "unassigned",
  ]);

  // We need to convert the raw string states into the TaskType["state"] and TaskType["assignedTo"] types
  const convertedList = (stateValue: string[], assignedToValue: string[]) => {
    const convertedStateValue: TaskType["state"][] = stateValue.map(
      (state) => state as TaskType["state"]
    );
    const convertedAssignedToValue: TaskType["assignedTo"][] =
      assignedToValue.map((assignedTo) => assignedTo as TaskType["assignedTo"]);
    return { convertedStateValue, convertedAssignedToValue };
  };

  return (
    <>
      <Group position="apart">
        <Stack>
          <Title>Assigned To</Title>
          <Chip.Group
            multiple={true}
            value={stateValue}
            onChange={setStateValue}
            position="center"
          >
            <Chip value="incomplete">Incomplete</Chip>
            <Chip value="in-progress">In Progress</Chip>
            <Chip value="hidden">Hidden</Chip>
            <Chip value="completed">Completed</Chip>
          </Chip.Group>
        </Stack>
        <Stack>
          <Title>State</Title>
          <Chip.Group
            multiple={true}
            value={assignedToValue}
            onChange={setAssignedToValue}
            position="center"
          >
            <Chip value="Meredith">Meredith</Chip>
            <Chip value="Adam">Adam</Chip>
            <Chip value="unassigned">Unassigned</Chip>
          </Chip.Group>
        </Stack>
      </Group>

      <TaskList
        states={convertedList(stateValue, assignedToValue).convertedStateValue}
        assignedTos={
          convertedList(stateValue, assignedToValue).convertedAssignedToValue
        }
      />
    </>
  );
}

export default Dashboard;
