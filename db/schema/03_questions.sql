-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS questions CASCADE;

CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  question text NOT NULL,
  correct_answer text NOT NULL
);
