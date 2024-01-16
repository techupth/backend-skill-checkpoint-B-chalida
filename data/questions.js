import mongoose from "mongoose";

const createQuestion = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
});

export default createQuestion;
