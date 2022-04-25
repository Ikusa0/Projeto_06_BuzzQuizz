// ========================== GENERATE HTML ============================
function listingQuizzesLoadPage() {
  const promise = axios.get(`${API}/quizzes`);

  promise.then((response) => {
    const html = `
    <article>
      ${createUserQuizzesList()}
      ${createAllQuizzes(response.data)}
    </article>`;

    window.scrollTo(0, 0);
    STYLESHEET.href = "./src/css/listing-quizzes.css";
    MAIN_TAG.innerHTML = html;

    const userQuizList = MAIN_TAG.querySelector(".user-quizzes .quiz-list");
    createUserQuizzes(userQuizList);
  });
}

function createUserQuizzesList() {
  const userQuizzes = getUserQuizzes();

  if (userQuizzes === null || userQuizzes.length === 0) {
    return `
    <section class="create-quiz">
      <span>Você não criou nenhum quizz ainda :(</span>
      <button onClick="createQuizzFirstScreen()">Criar Quizz</button>
    </section>`;
  }

  return `
  <section class="user-quizzes">
    <div class="header">
      <h2>Seus Quizzes</h2>
      <ion-icon onclick="createQuizzFirstScreen()" tabindex="0" class="icon new-quiz" name="add-circle"></ion-icon>
    </div>
    <ul class="quiz-list">
    </ul>
  </section>`;
}

function createAllQuizzes(quizzes) {
  let html = `
  <section class="all-quizzes">
    <h2>Todos os quizzes</h2>
    <ul class="quiz-list">`;

  quizzes.forEach((quiz) => {
    html += createQuiz(quiz);
  });

  html += `
    </ul>
  </section>`;

  return html;
}

function createUserQuizzes(userQuizList) {
  const userQuizzes = getUserQuizzes();

  userQuizzes.forEach((userQuiz) => {
    const promise = axios.get(`${API}/quizzes/${userQuiz.id}`);

    promise.then((response) => {
      const quiz = response.data;
      userQuizList.innerHTML += createQuiz(quiz);
    });
  });
}

function createQuiz(quiz) {
  return `
      <li onclick="quizzLoadPage(${quiz.id})" tabindex="0" class="quiz">
        <h4>${quiz.title}</h4>
        <div class="gradient-overlay"></div>
        <img src="${quiz.image}" />
      </li>`;
}
// =====================================================================
