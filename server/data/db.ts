import { Database, open } from "sqlite";
import { Knex, knex } from "knex";

const filepath = "./data/tasks.db";

declare module "knex/types/tables" {
  interface Tasks {
    id: number;
    title: string;
    description: string;
    state: "completed" | "in-progress" | "hidden" | "archived" | "incomplete";
    updatedAt: string;
    createdAt: string;
    assignedTo: "Adam" | "Meredith" | "unassigned";
  }

  interface Tables {
    tasks: Tasks;
  }
}

const config = {
  client: "sqlite3",
  connection: {
    filename: filepath,
  },
  useNullAsDefault: true,
};

export const knexDB = knex(config);

export const initDB = async (knexInstance: Knex) => {
  // Check if table exists
  const tableExists = await knexInstance.schema.hasTable("tasks");
  if (tableExists) {
    console.log("DB: Table already exists");
    return;
  }

  try {
    await knexInstance.schema.createTable(
      "tasks",
      (table: Knex.TableBuilder) => {
        table.increments("id");
        table.string("title");
        table.string("description");
        table.enum("state", [
          "completed",
          "in-progress",
          "hidden",
          "archived",
          "incomplete",
        ]);
        table.string("updatedAt");
        table.string("createdAt");
        table.enum("assignedTo", ["Adam", "Meredith", "unassigned"]);
      }
    );
    console.log("DB: Table created if it didn't exist");
    return;
  } catch (err) {
    console.error("DB: Error creating table");
    console.log(err);
    throw err;
  }
};
