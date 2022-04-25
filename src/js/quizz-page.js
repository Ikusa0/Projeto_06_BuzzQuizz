// ========================= GLOBAL VARIABLES ==========================
const TIME_2S = 2 * 1000;
const SCROLL_BEHAVIOR = {
  behavior: "smooth",
  block: "center",
  inline: "center",
};

let questionCount = 0;
let questionsAnswered = 0;
let correctAnswers = 0;
let quizLoaded;
// =====================================================================

// =========================== AUX FUNCTIONS ===========================
function getCorrectPercentage() {
  const correctPercentage = Math.round((correctAnswers / questionCount) * 100);
  return correctPercentage;
}

function randomize() {
  return Math.random() - 0.5;
}

function sortLevels(a, b) {
  if (a.minValue < b.minValue) {
    return -1;
  }
  if (a.minValue > b.minValue) {
    return 1;
  }
  return 0;
}
// =====================================================================

// ===================== EVENT LISTENER FUNCTIONS ======================
function quizzLoadPage(quizID) {
  const promise = axios.get(`${API}/quizzes/${quizID}`);

  promise.then((response) => {
    questionCount = 0;
    questionsAnswered = 0;
    correctAnswers = 0;

    quizLoaded = response.data;
    questionCount = quizLoaded.questions.length;

    const html = `
    <article>
      ${createQuizTitle(quizLoaded)}
      ${createQuestions(quizLoaded.questions)}
      ${createFooter()}
    </article>`;

    window.scrollTo(0, 0);
    STYLESHEET.href = "./src/css/quizz-page.css";
    MAIN_TAG.innerHTML = html;
  });
}

function chooseAnswer(answer) {
  const question = answer.closest(".question");
  const questionID = parseInt(question.id);

  if (question.classList.contains("answered")) {
    return;
  }

  answer.classList.add("selected");
  question.classList.add("answered");
  questionsAnswered += 1;

  if (answer.classList.contains("correct")) {
    correctAnswers += 1;
  }

  if (questionsAnswered === questionCount) {
    showResult();
    return;
  }

  window.setTimeout(() => {
    const nextQuestion = document.getElementById(questionID + 1);
    nextQuestion.scrollIntoView(SCROLL_BEHAVIOR);
  }, TIME_2S);
}
// =====================================================================

// ========================== GENERATE HTML ============================
function createQuizTitle(quiz) {
  const html = `
  <div class="quiz-title">
    <h2>${quiz.title}</h2>
    <div class="overlay"></div>
    <img src="${quiz.image}" />
  </div>`;

  return html;
}

function createAnswer(answer) {
  let correctOrIncorrect = "correct";
  if (answer.isCorrectAnswer === false) {
    correctOrIncorrect = "incorrect";
  }

  const html = `
  <div tabindex="0" onclick="chooseAnswer(this)" class="answer ${correctOrIncorrect}">
    <div class="img-container">
      <img
        src="${answer.image}"
      />
    </div>
    <span>${answer.text}</span>
  </div>`;

  return html;
}

function createQuestions(questions) {
  let html = `<ul class="question-container">`;
  let questionNumber = 1;

  questions.forEach((question) => {
    const answers = question.answers;

    html += `
    <li id="${questionNumber}" class="question">
      <div style="background-color:${question.color}" class="title"><span>${question.title}</span></div>
      <div class="answer-container">
      `;

    answers.sort(randomize).forEach((answer) => {
      html += createAnswer(answer);
    });

    html += `
      </div>
    </li>`;

    questionNumber++;
  });

  html += `</ul>`;

  return html;
}

function createFooter() {
  return `
  <section class="result-container hidden">
    <div class="result">
      <div class="title">100% de acerto: Carregando</div>
      <div class="description">
        <img src="./src/img/loading.gif" />
        <span>
          CARREGANDO
        </span>
      </div>
    </div>
  </section>
  <footer>
    <button onclick="quizzLoadPage(${quizLoaded.id})" class="restart">Reiniciar Quizz</button>
    <button onclick="listingQuizzesLoadPage()" class="home">Voltar para home</button>
  </footer>
  `;
}

function showResult() {
  const result = MAIN_TAG.querySelector(".result-container");
  const title = result.querySelector(".title");
  const image = result.querySelector(".description img");
  const text = result.querySelector(".description span");

  const correctPercentage = getCorrectPercentage();
  let quizTitle;
  let quizImage;
  let quizText;

  quizLoaded.levels.sort(sortLevels).forEach((level) => {
    if (level.minValue <= correctPercentage) {
      quizTitle = level.title;
      quizImage = level.image;
      quizText = level.text;
    }
  });

  title.innerHTML = `${correctPercentage}% de acerto: ${quizTitle}`;
  image.src = quizImage;
  text.innerHTML = quizText;

  result.classList.remove("hidden");
  window.setTimeout(() => {
    result.scrollIntoView(SCROLL_BEHAVIOR);
  }, TIME_2S);
}
// =====================================================================
