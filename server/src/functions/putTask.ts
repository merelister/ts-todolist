// Data Types From APP
import { Tasks } from "knex/types/tables";

// Database
import { knexDB } from "../../data/db";

// Functions
import { validateTask } from "../functions/validateTask";

export const putTask = async (task: Tasks): Promise<Tasks> => {
  try {
    // Check if task contains all required fields
    if (!task) {
      console.log("putTask: No task provided");
      throw new Error("Invalid task. No task provided");
    }

    // Check if task values are valid
    const { valid, issues } = validateTask(task);
    if (!valid) {
      console.log("putTask: Invalid task");
      throw new Error(
        "Invalid task. Please check the following fields: " + issues.join(", ")
      );
    }

    await knexDB("tasks").insert(task).onConflict("id").merge();

    console.log("putTask: Success inserting task");
    return task;
  } catch (err) {
    console.log("putTask: Error inserting task");
    throw err;
  }
};
