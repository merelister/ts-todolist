import { Tasks } from "knex/types/tables";

export const validateTask = (
  task: Tasks
): {
  valid: boolean;
  issues: string[];
  validTask?: Tasks;
} => {
  if (!task) {
    console.log("validateTask: Invalid task");
    return { valid: false, issues: ["No task provided"] };
  }
  const taskIssues: string[] = [];

  // Title
  if (!task.title) taskIssues.push("title required");
  if (task.title.length > 100) taskIssues.push("title too long");
  if (typeof task.title !== "string") taskIssues.push("title must be a string");

  // State
  if (!task.state) taskIssues.push("state required");
  if (typeof task.state !== "string") taskIssues.push("state must be a string");
  if (
    task.state !== "completed" &&
    task.state !== "in-progress" &&
    task.state !== "hidden" &&
    task.state !== "archived" &&
    task.state !== "incomplete"
  )
    taskIssues.push("state must be a valid state");

  // Assigned To
  if (!task.assignedTo) taskIssues.push("assignedTo required");
  if (typeof task.assignedTo !== "string")
    taskIssues.push("assignedTo must be a string");
  if (
    task.assignedTo !== "Adam" &&
    task.assignedTo !== "Meredith" &&
    task.assignedTo !== "unassigned"
  )
    taskIssues.push("assignedTo must be a valid user");

  // Depends On (array of task ids (strings)))
  if (task.dependsOn) {
    if (!Array.isArray(task.dependsOn))
      taskIssues.push("dependsOn must be an array");
    if (task.dependsOn.length > 0) {
      task.dependsOn = task.dependsOn.map((taskId) => {
        return taskId.toString();
      });
      task.dependsOn.forEach((taskId) => {
        if (typeof taskId !== "string")
          taskIssues.push("dependsOn must be an array of strings");
      });
    }
  }

  // Description is optional
  if (!task.description) task.description = task.title;

  // Set Created Date if not set
  if (!task.createdAt) task.createdAt = new Date().toISOString();

  // Set Updated Date always
  task.updatedAt = new Date().toISOString();

  // Check Enum Values
  // TODO: Check if sqlite and knex support enum types

  if (taskIssues.length > 0) {
    console.log("validateTask: Invalid task");
    return { valid: false, issues: taskIssues };
  }

  console.debug("validateTask: Valid task");
  return { valid: true, issues: [], validTask: task };
};
