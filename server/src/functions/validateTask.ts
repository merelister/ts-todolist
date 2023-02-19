import { Tasks } from "knex/types/tables";

export const validateTask = (
  task: Tasks
): {
  valid: boolean;
  issues: string[];
} => {
  if (!task) {
    console.log("validateTask: Invalid task");
    return { valid: false, issues: ["No task provided"] };
  }
  const taskIssues: string[] = [];
  if (!task.title) taskIssues.push("title required");
  if (!task.description) taskIssues.push("description required");
  if (!task.state) taskIssues.push("state required");
  if (!task.updatedAt) taskIssues.push("updatedAt required");
  if (!task.createdAt) taskIssues.push("createdAt required");
  if (!task.assignedTo) taskIssues.push("assignedTo required");

  // Check Enum Values
  // TODO: Check if sqlite and knex support enum types

  if (taskIssues.length > 0) {
    console.log("validateTask: Invalid task");
    return { valid: false, issues: taskIssues };
  }

  return { valid: true, issues: [] };
};
