import { Tasks } from "knex/types/tables";
import { knexDB } from "../../data/db";

export const getUserTasks = async (user: string): Promise<Tasks[]> => {
  try {
    const rows = await knexDB
      .select("*")
      .from("tasks")
      .where("assignedTo", user);
    // console.log("getTask: Success retrieving task");
    return rows;
  } catch (err) {
    console.log("getAllTasks: Error retrieving task");
    throw err;
  }
};
