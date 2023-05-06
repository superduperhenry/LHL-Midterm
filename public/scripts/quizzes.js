const loadQuizzes = function () {
  $.ajax({
    method: "GET",
    url: "/api/quizzes",
  }).done((res) => {
    renderQuizzes(res.quizzes);
  });
};

const createQuizElement = function (quiz) {
  const quizElement = `
    <article class="quiz-card flex">
      <h3>${quiz.title}</h3>
      <div>
        <p>${quiz.description}</p>
        <p>Created by: ${quiz.username}</p>
      </div>
      <a href="/quizzes/${quiz.id}" class="btn">Take Quiz</a>
    </article>
  `;
  return quizElement;
};

const renderQuizzes = function (quizzes) {
  quizzes.forEach((quiz) => {
    $("#quizzes").append(createQuizElement(quiz));
  });
};

$(document).ready(function () {
  loadQuizzes();
});
