import { Tasks } from "knex/types/tables";
import { knexDB } from "../../data/db";

export const getAllTasks = async (): Promise<Tasks[]> => {
  try {
    const rows = await knexDB.select("*").from("tasks");
    return rows;
  } catch (err) {
    console.log("getAllTasks: Error retrieving tasks");
    throw err;
  }
};
