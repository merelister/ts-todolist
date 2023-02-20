import { Tasks } from "knex/types/tables";
import { knexDB } from "../../data/db";

export const deleteTask = async (id: Tasks["id"]) => {
  try {
    // Delete task
    const result = await knexDB.delete().from("tasks").where("id", id);

    // Delete dependencies
    await knexDB.delete().from("dependencies").where("taskId", id);

    // Delete dependencies where task is a parent
    await knexDB.delete().from("dependencies").where("dependsOn", id);
    return result;
  } catch (err) {
    console.log(`deleteTask: Error deleting task with id ${id}`);
    throw err;
  }
};
