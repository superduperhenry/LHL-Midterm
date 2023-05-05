const db = require('../../connection');

const getQuizzes = async () => {
  const queryString = `
    SELECT * FROM quizzes
    JOIN users ON users.id = quizzes.owner_id
    WHERE quizzes.is_private = false;
  `;

  try {
    const res = await db.query(queryString);
    return res.rows;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getQuizzes };