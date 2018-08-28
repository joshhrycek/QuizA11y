//Makes the HTML for question. use if else loop, if the current question number is the legnth of QUIZ then render the results page and restart button

//Can Map
function generateQuestion() {
  if (QUIZ.answers.length < QUIZ.questions.length) {
    $(".questionNumberDisplay").text(QUIZ.answers.length + 1)
    return `
      <form>
      <fieldset class="row">
        <legend><h2>${QUIZ.questions[QUIZ.answers.length].text}</h2</legend>
        
          <label class="container col-6" answerSelect">
            <input type="radio" value="0" name="answer" required>
            <span class="checkmark"></span>
            <span class="answer-text">${QUIZ.questions[QUIZ.answers.length].answers[0].text}</span>
          </label>
        
        
          <label class="container col-6" answerSelect">
            <input type="radio" value="1" name="answer" required>
            <span class="checkmark"></span>
            <span class="answer-text">${QUIZ.questions[QUIZ.answers.length].answers[1].text}</span>
          </label>

        
          <label class="container col-6" answerSelect">
            <input type="radio" value="2" name="answer" required>
            <span class="checkmark"></span>
            <span class="answer-text">${QUIZ.questions[QUIZ.answers.length].answers[2].text}</span>
          </label>

        
          <label class="container col-6" answerSelect">
            <input type="radio" value="3" name="answer" required>
            <span class="checkmark"></span>
            <span class="answer-text">${QUIZ.questions[QUIZ.answers.length].answers[3].text}</span>
          </label>

        <button type="submit" class="submitButton col-12">Submit!</button>
      </fieldset>
      </form>`

  }else{
    renderResults()
  }
}

function generateStartPage() {
  return `<div class="row quizIntro">
      <div class="col-12">
        <h1>"Are you ready to test your might in this Fighting Game Quiz?"</h1>
        <button type="button" class="col-12 startButton">FIGHT!</button>
      </div>
    </div>`
}

function renderStartPage() {
  $('main').html(generateStartPage())
}

function startQuiz() {
  $('main').on('click','.startButton', event => {
    renderQuestion()
  });
}

//renders the question in the DOM using generateQuestion
function renderQuestion () {
  $('main').html(generateQuestion());
}

//user submits answer
function submitSelectedAnswer() {
 $('main').on('submit','form', event => {
  event.preventDefault();
  let selected = $('input:checked')
  const answerValue = selected.val();
  const selectAnswer = QUIZ.questions[QUIZ.answers.length].answers[answerValue]
  checkSelectedAnswer(selectAnswer);
 })
}

//Checks if answer is correct, stores true or false.
function checkSelectedAnswer(answer) {
  
  if(answer.isCorrect){
    feedbackTrue()
  }else{
    feedbackFalse()
  }
  QUIZ.answers.push(answer);
  updateScore();
}

function updateScore() {

  $(".score").text(calaculateScore())
}

function calaculateScore() {
  return QUIZ.answers.filter(answer => {
    return answer.isCorrect
  }).length

}

function feedbackTrue(){
  $('main').html(generateFeedbackTrue())

}

function feedbackFalse(){
  $('main').html(generateFeedbackFalse())
}

function generateFeedbackFalse(){
  let correctAnswer= QUIZ.questions[QUIZ.answers.length].answers.find(answer => {
    return answer.isCorrect
  }).text
  return `
      <div class="row wrongMessage">
        <p>Ouch! Wrong Answer.</br>
        Correct Answer is "${correctAnswer}"<p>
        <button type="button" class="col-12 nextQuestion">Next Round!</button>
      </div>
    </div>`
}

function generateFeedbackTrue(){
  return `
      <div class="row correctMessage">
        <p>Nice Read!</br> You are Correct!<p>
        <button type="button" class="col-12 nextQuestion">Next Round!</button>
      </div>
    </div>`
}

function renderNextQuestion() {

  $("main").on('click', '.nextQuestion', event =>{
    
     renderQuestion()
  })
}

function empty() {
  return QUIZ.answers = []
}

//allows user to restart quiz
function restartQuiz() {
  empty()
  $('main').on('click','.restartQuizButton', event => {
    $(".questionNumberDisplay").text("");
    renderStartPage()
    updateScore()
  })
}

function generateFinalPage() {
  return `<div class="row answersRatio">
        <p>You got ${calaculateScore()} out of ${QUIZ.questions.length} answers correct.</br>Now that you know, Try Again!</p>
        <button type="button" class="col-12 restartQuizButton">Continue?</button>
      </div>`
}

//Final results page, giving a final score ratio
function renderResults() {
  $("main").html(generateFinalPage())
  restartQuiz()
}

function createQuiz() {

startQuiz()
submitSelectedAnswer()
renderNextQuestion()
renderStartPage()
}

$(createQuiz)