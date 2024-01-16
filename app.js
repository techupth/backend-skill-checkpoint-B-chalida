import express from "express";
import connectMongoDB from "./utils/db.js";
import questionsRouter from "./utils/questionsRouter.js";
import { connect } from "mongoose";

async function init() {
  const app = express();
  const port = 4000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  connectMongoDB();

  app.use("/questions", questionsRouter);

  /* app.get("/", (req, res) => {
    return res.json("Hello Skill Checkpoint #2");
  });

  app.get("*", (req, res) => {
    return res.status(404).json("Not found");
  });
  */

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
