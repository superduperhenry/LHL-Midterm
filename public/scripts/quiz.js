

$(document).ready(function () {
  let questions = []; // array to store questions
  let quizName = ''; // variable to store quiz name
  let quizDescription = ''; // variable to store quiz description

  // add question when add-question-btn is clicked
  $(document).on('click', '#add-question-btn', () => {
    const question = {
      quizQuestion: $('#question').val(),
      answer1: $('#answer1').val(),
      answer2: $('#answer2').val(),
      answer3: $('#answer3').val(),
      answer4: $('#answer4').val(),
      correctAnswer: $(`#${$('#correct-answer').val()}`).val()
    };
    console.log(question);
    questions.push(question);


    // clear fields for next question
    $('#question').val('');
    $('#answer1').val('');
    $('#answer2').val('');
    $('#answer3').val('');
    $('#answer4').val('');
    $('#correct-answer1').val('');



    const oldQuestionsDiv = $('#oldQuestion');
    oldQuestionsDiv.empty(); // Clear previous questions
    for (let i = 0; i < questions.length; i++) {
      const questionDiv = $('<div>');
      questionDiv.text(JSON.stringify(questions[i]));
      oldQuestionsDiv.append(questionDiv);
    }


  })



  // submit quiz when submit-quiz-btn is clicked
  $('#submit-quiz-btn').click(() => {
    const quizName = $('#quiz-name').val();
    const quizDescription = $('#quiz-description').val();

    console.log('->submit button clicked<-');
    console.log(questions);

    $.ajax({
      url: '/createQuiz',
      data: {
        quizName,
        quizDescription,
        questions,
      },
      method: 'POST'
    })
      .then((res) => {
        console.log(res);
        const quizId = res.quizId; // get ID of newly created quiz
        const quizLink = `http://localhost:8080/quiz/${quizId}`; // generate link to quiz
        console.log(quizLink);
        // display link to user
        $('#quiz-link').html(`<a href="${quizLink}" target="_blank">${quizLink}</a>`);
      })
  })
});










  //   console.log(quizName, quizDescription, quizVisibility, questions);


      // radio button functionality
    //   let quizVisibility = $('input[name=quizVisibility]:checked').val() === 'private' ? false : true;

/*This is how I did it */
    //   let quizVisibility;
    //     if ($('input[name=quizVisibility]:checked').val() === 'private') {
    //          quizVisibility = false;
    //         } else {
    //          quizVisibility = true;
    //         }