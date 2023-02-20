// Data Types From APP
import { Dependencies, Tasks } from "knex/types/tables";

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
    const { valid, issues, validTask } = validateTask(task);
    if (!valid || !validTask) {
      console.log("putTask: Invalid task");
      throw new Error(
        "Invalid task. Please check the following fields: " + issues.join(", ")
      );
    }

    // Extract dependencies
    const taskWithoutDependencies = { ...validTask };
    delete taskWithoutDependencies.dependsOn;

    const dependencies = validTask.dependsOn?.map((parentTask) => {
      return { taskId: validTask.id, dependsOn: parentTask } as Dependencies;
    });

    // Insert task
    await knexDB("tasks")
      .insert(taskWithoutDependencies)
      .onConflict("id")
      .merge();

    // // Get existing dependencies
    // const existingDependencies = await knexDB
    //   .select("dependsOn")
    //   .from("dependencies")
    //   .where("taskId", validTask.id);

    // if (dependencies?.length > 0) {
    //   if (existingDependencies.length > 0) {
    //     // Check if any dependencies have been removed
    //     const removedDependencies = existingDependencies.filter(
    //       (existingDependency) =>
    //         !dependencies?.find(
    //           (dependency) =>
    //             dependency.dependsOn === existingDependency.dependsOn
    //         )
    //     );

    //     // Remove dependencies that no longer exist
    //     if (removedDependencies.length > 0) {
    //       await knexDB("dependencies")
    //         .delete()
    //         .whereIn(
    //           "dependsOn",
    //           removedDependencies.map((dependency) => dependency.dependsOn)
    //         )
    //         .andWhere("taskId", validTask.id);
    //     }
    //   }
    // }

    // // Insert new dependencies
    // if (dependencies) {
    //   await knexDB("dependencies")
    //     .insert(dependencies)
    //     .onConflict(["taskId", "dependsOn"])
    //     .merge();
    // }

    console.log("putTask: Success inserting task");
    return task;
  } catch (err) {
    console.log("putTask: Error inserting task");
    throw err;
  }
};
