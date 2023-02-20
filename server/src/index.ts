// Express
import express from "express";
import { Request, Response } from "express";
const app = express();
const port = 4000;

import bodyParser from "body-parser";
const jsonParser = bodyParser.json();

import cors from "cors";
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const morgan = require("morgan");
app.use(morgan("dev"));

// Database
import { knexDB, initDB } from "../data/db";
initDB(knexDB);

import { resetDB } from "../data/db";
// DEBUG -- RESET DB ROUTE
app.delete("/api/reset", async (_res, res: Response) => {
  await resetDB(knexDB)
    .then(() => {
      console.log("DB reset");
      res.send("DB reset");
    })
    .catch((err) => {
      console.log("DB reset failed");
      res.send("DB reset failed");
    });
});

// Tasks
const taskRoute = require("./routes/tasks");
app.use("/api/tasks", taskRoute);

app.listen(port, () => {
  console.log("Server running on port " + port);
});

module.exports = app;
