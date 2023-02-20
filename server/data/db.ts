import { Database, open } from "sqlite";
import { Knex, knex } from "knex";
import { Tables } from "knex/types/tables";

const filepath = "./data/tasks.db";

declare module "knex/types/tables" {
  interface Tasks {
    id: string;
    title: string;
    description: string;
    state: "completed" | "in-progress" | "hidden" | "archived" | "incomplete";
    updatedAt: string;
    createdAt: string;
    assignedTo: "Adam" | "Meredith" | "unassigned";
    dependsOn?: string[];
  }

  interface Dependencies {
    taskId: Tasks["id"];
    dependsOn: Tasks["id"];
  }

  interface Tables {
    tasks: Tasks;
    dependencies: Dependencies;
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
        table.string("id").primary();
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

    await knexInstance.schema.createTable(
      "dependencies",
      (table: Knex.TableBuilder) => {
        table.string("taskId").references("id").inTable("tasks");
        table.string("dependsOn").references("id").inTable("tasks");
      }
    );

    seedDB(knexInstance);
    console.log("DB: Table created if it didn't exist");
    return;
  } catch (err) {
    console.error("DB: Error creating table");
    console.log(err);
    throw err;
  }
};

export const seedDB = async (knexInstance: Knex) => {
  // Create an array of tasks to insert (all combinations of state and assignedTo)
  const newTasks = () => {
    const states = [
      "completed",
      "in-progress",
      "hidden",
      "archived",
      "incomplete",
    ] as const;

    const assignedTo = ["Adam", "Meredith", "unassigned"] as const;

    const seedTasks = [] as Tables["tasks"][];

    for (const state of states) {
      for (const assignee of assignedTo) {
        seedTasks.push({
          id: `${state}-${assignee}`,
          title: `Task ${state} ${assignee}`,
          description: `This is a task in state ${state} assigned to ${assignee}`,
          state,
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          assignedTo: assignee,
        });
      }
    }

    return seedTasks;
  };

  try {
    const tasksToInsert = newTasks();

    // Insert seed tasks
    await knexInstance("tasks").insert(tasksToInsert);

    console.log("DB: Seeded with data");
    return;
  } catch (err) {
    console.error("DB: Error seeding data");
    console.log(err);
    throw err;
  }
};
