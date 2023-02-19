// Express
import express from "express";
import { Request, Response } from "express";
const router = express.Router();

// Body Parser
import bodyParser from "body-parser";
const jsonParser = bodyParser.json();

// Functions
import { validateTask } from "./../functions/validateTask";

// GET: /api/tasks/:user
import { getUserTasks } from "../functions/getUserTasks";
router.get("/:user", async (req, res) => {
  try {
    const tasks = await getUserTasks(req.params.user);
    res.send(tasks);
    return;
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
    return;
  }
});

// GET ALL: /api/tasks
import { getAllTasks } from "../functions/getAllTasks";
router.get("/", async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.send(tasks);
    return;
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
    return;
  }
});

// PUT: /api/tasks/:user
import { putTask } from "../functions/putTask";
router.put("/", jsonParser, async (req, res) => {
  console.log("Body: ");
  console.log(req.body);

  try {
    validateTask(req.body);
    await putTask(req.body);
    res.send("Success");
    return;
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
    return;
  }
});

module.exports = router;
