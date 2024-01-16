import Express from "express";
import createQuestion from "../data/questions.js";

const questionsRouter = Express.Router();

let questionMockDatabase = [];

questionsRouter.post("/", async (req, res) => {
  try {
    const newQuestion = new createQuestion({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
    });

    questionMockDatabase.push(newQuestion);
    return res.status(201).json({
      message: "Questtion has been created successfully",
      data: newQuestion,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Unable to create question",
    });
  }
});

questionsRouter.get("/", async (req, res) => {
  try {
    const totalQuestions = questionMockDatabase.map((questions) => ({
      id: questions.id,
      title: questions.title,
      description: questions.description,
      category: questions.category,
    }));
    return res.status(200).json({
      message: "Successfully retrieved all questions",
      data: totalQuestions,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Unable to retrieve all questions",
    });
  }
});

questionsRouter.get("/question/:questionId", async (req, res) => {
  const id = req.params.questionId;

  try {
    const findQuestion = questionMockDatabase.filter(
      (questions) => questions.id === id
    )[0];
    if (!findQuestion) {
      return res.status(404).json({
        message: "Question not found",
      });
    }
    return res.status(200).json({
      message: "Successfully retrieved the question",
      data: findQuestion,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error occurred on the sever",
    });
  }
});

questionsRouter.put("/questions/:questionId", async (req, res) => {
  const questionId = Number(req.params.questionId);
  const { title, description, category } = req.body;
  if (!title || !description || !category) {
    return res.status(400).json({
      message: "Invalid data",
    });
  }
  const questionIndex = questionMockDatabase.findIndex(
    (questions) => questions.id === questionId
  );

  if (questionIndex === -1) {
    return res.status(400).json({
      message: "Invalid question ID",
    });
  }
  questionMockDatabase[questionIndex] = {
    id: questionId,
    title,
    description,
    category,
  };
  return res.status(200).json({
    message: "question has edited successfully",
    data: questionMockDatabase[questionIndex],
  });
});

questionsRouter.delete("/questions/:questionId", async (req, res) => {
  const questionId = Number(req.params.questionId);
  const questionToDeleteIndex = questionMockDatabase.findIndex(
    (questions) => questions.id === questionId
  );
  if (questionToDeleteIndex === -1) {
    return res.status(400).json({
      message: "Unable to delete question!",
    });
  }
  questionMockDatabase.splice(questionToDeleteIndex, 1);
  return res.status(200).json({
    message: "Question has deleted successfully",
  });
});

export default questionsRouter;
