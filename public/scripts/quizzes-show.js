$("#quiz").submit(function (e) {
  e.preventDefault();

  // Grab all data from form
  let data = $(this).serializeArray();

  let numCorrect = 0;
  let numberOfQuestions = data.length;

  data.forEach((answer) => {
    // Grab the fieldset with the id of the answer name
    let inputAnswer = document.querySelector(`#${answer.name}`);

    // Grab the correct answer from the data attribute
    let correctAnswer = inputAnswer.dataset.correctanswer;

    let selectedAnswer = answer.value;

    // Compare the correct answer to the selected answer and add or remove css class
    if (correctAnswer === selectedAnswer) {
      numCorrect++;
      inputAnswer.classList.remove("incorrect-answer");
    } else {
      inputAnswer.classList.add("incorrect-answer");
    }
  });

  // Display the score
  document.querySelector(
    "#scoreboard"
  ).innerHTML = `You scored ${numCorrect} out of ${numberOfQuestions}!`;
});
