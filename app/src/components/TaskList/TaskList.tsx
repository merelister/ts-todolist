import axios from "axios";
import { useEffect, useState } from "react";

// Components
import { Button, Center, Modal, Stack } from "@mantine/core";
import AddTask from "../AddTask/AddTask";
import Task, { TaskType } from "../Task/Task";

// localhost:3000/tasks

// receives two lists: one of states, and one of assignedTos
// values in list are used to filter the get query
// function TaskList({ states, assignedTos }: { states: TaskType["state"][], assignedTos: TaskType["assignedTo"][] }) {
function TaskList({
  states,
  assignedTos,
}: {
  states: TaskType["state"][];
  assignedTos: TaskType["assignedTo"][];
}) {
  // Hooks
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(true);

  // Filtering
  // based on states and assignedTos, filter task results
  const filteredTasks = (): TaskType[] => {
    return tasks
      .filter((t) => states.includes(t.state))
      .filter((t) => assignedTos.includes(t.assignedTo));
  };

  const getTasks = async () => {
    axios.get("http://localhost:4000/api/tasks").then((res) => {
      // console.log(res.data);
      res.data.map((task: TaskType) => {
        task.updatedAt = new Date(task.updatedAt);
        task.createdAt = new Date(task.createdAt);
        return task;
      });

      setTasks(res.data);
      setNeedsUpdate(false);
    });
  };

  useEffect(() => {
    // Debounce
    if (!needsUpdate) return;
    getTasks();
  }, [modalOpened, needsUpdate]);

  return (
    <Center>
      <Stack align={"center"} style={{ width: "50rem" }}>
        <Button onClick={() => setModalOpened(true)}>New Task</Button>
        <Button onClick={() => setNeedsUpdate(true)}>Refresh</Button>
        {/* Assigned To Chips */}

        {modalOpened && (
          <Modal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            title="Create new task"
            size="sm"
          >
            <AddTask
              setModalOpened={setModalOpened}
              setNeedsUpdate={setNeedsUpdate}
              tasks={tasks}
            />
          </Modal>
        )}
        {filteredTasks()
          .sort((a, b) => {
            return b.updatedAt.getTime() - a.updatedAt.getTime();
          })
          .map((task) => {
            return (
              <Task
                key={task.id}
                taskProps={task}
                setNeedsUpdate={setNeedsUpdate}
              />
            );
          })}
      </Stack>
    </Center>
  );
}

export default TaskList;
