import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Components
import { Button } from "@mantine/core";
import Task, { TaskType } from "../../components/Task/Task";

// localhost:3000/tasks
function TaskList() {
  // Hooks
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskType[]>([
    {
      id: "1",
      title: "Task 1",
      description: "Task 1 description",
      state: "completed",
      updatedAt: new Date(),
      createdAt: new Date(),
      assignedTo: "Adam",
    },
  ]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/tasks").then((res) => {
      console.log(res.data);
      res.data.map((task: TaskType) => {
        task.updatedAt = new Date(task.updatedAt);
        task.createdAt = new Date(task.createdAt);
        return task;
      });

      setTasks(res.data);
    });
  }, []);

  return (
    <>
      {tasks.map((task) => {
        return <Task key={task.id} taskProps={task} />;
      })}

      <Button onClick={() => navigate("/tasks/new")}>New Task</Button>
    </>
  );
}

export default TaskList;
