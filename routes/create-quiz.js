/* */

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../connection");

// use body-parser middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.render("createQuiz");
});

// Handle the POST request
router.post("/", async function (req, res) {
  console.log(req.body);
  const { quizName, quizDescription, questions } = req.body;
  const creator = 1;
  const dbQuizResult = await db.query(
    `INSERT INTO quizzes (title, description, owner_id)
           VALUES ($1, $2, $3)
           RETURNING *
           `,
    [quizName, quizDescription, creator]
  );
  const quizId = dbQuizResult.rows[0].id;

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const dbQuestionResult = await db.query(
      `INSERT INTO questions (quiz_id, question, correct_answer)
    VALUES ($1, $2, $3)
    RETURNING * 
    `,
      [quizId, question.quizQuestion, question.correctAnswer]
    );
    const questionId = dbQuestionResult.rows[0].id;

    await db.query(
      `INSERT INTO options (quiz_id, question_id, option)
    VALUES ($1, $2, $3), ($1, $2, $4), ($1, $2, $5), ($1, $2, $6)`,
      [
        quizId,
        questionId,
        question.answer1,
        question.answer2,
        question.answer3,
        question.answer4,
      ]
    );
  }

  res.send("send data");
});

module.exports = router;
