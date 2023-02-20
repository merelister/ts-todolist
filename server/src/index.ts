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

const taskRoute = require("./routes/tasks");
app.use("/api/tasks", taskRoute);

app.listen(port, () => {
  console.log("Server running on port " + port);
});

module.exports = app;
