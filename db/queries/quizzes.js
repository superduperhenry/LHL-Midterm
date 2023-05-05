const db = require("../connection");

const getQuizzes = async () => {
  const queryString = `
    SELECT * FROM quizzes
    JOIN users ON users.id = quizzes.owner_id
    WHERE quizzes.is_private = false;
  `;

  return (await db.query(queryString)).rows;
};

const getQuizById = async (id) => {
  const queryString = `
    SELECT users.username as creator, title, description, quizzes.id from quizzes
    JOIN users
    ON quizzes.owner_id = users.id
    WHERE quizzes.id = $1;
    `;
  const queryParams = [id];

  return (await db.query(queryString, queryParams)).rows[0];
};

const getQuestionsByQuizId = async (id) => {
  const queryString = `
    SELECT questions.id as question_id, question, correct_answer from questions
    JOIN quizzes ON quizzes.id = questions.quiz_id
    WHERE quizzes.id = $1;
  `;
  const queryParams = [id];

  return (await db.query(queryString, queryParams)).rows;
};

const getOptionsByQuestionId = async (id) => {
  const queryString = `
    SELECT option, options.id from options
    JOIN questions ON options.question_id = questions.id
    WHERE questions.id = $1;
  `;
  const queryParams = [id];

  return (await db.query(queryString, queryParams)).rows;
};

module.exports = {
  getQuizzes,
  getQuizById,
  getQuestionsByQuizId,
  getOptionsByQuestionId,
};
