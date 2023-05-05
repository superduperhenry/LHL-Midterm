/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const quizQueries = require("../db/queries/quizzes");

router.get("/", (req, res) => {
  res.render("quizzes");
});

router.get("/:id", async (req, res) => {
  try {
    let quiz = await quizQueries.getQuizById(req.params.id);
    if (!quiz) {
      res.send("Quiz not found. Please try again. <a href='/'>Home</a>");
      throw new Error("Quiz not found");
    }

    let questions = await quizQueries.getQuestionsByQuizId(quiz.id);

    for (let question of questions) {
      let options = await quizQueries.getOptionsByQuestionId(
        question.question_id
      );
      question.options = options;
    }
    quiz.questions = questions;

    res.render("quizzes-show", { quiz });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
