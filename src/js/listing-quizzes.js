// ========================== GENERATE HTML ============================
function listingQuizzesLoadPage() {
  const promise = axios.get(`${API}/quizzes`);
  let html;

  promise.then((response) => {
    html = `
    <article>
      ${createUserQuizzesList()}
      ${createAllQuizzesList(response.data)}
    </article>`;

    STYLESHEET.href = "./src/css/listing-quizzes.css";
    MAIN_TAG.innerHTML = html;
  });
}

function createUserQuizzesList() {
  const userQuizzes = getUserQuizzes();

  if (userQuizzes === null || userQuizzes.length === 0) {
    return `
    <section class="create-quiz">
      <span>Você não criou nenhum quizz ainda :(</span>
      <button>Criar Quizz</button>
    </section>`;
  }

  let html = `
  <section class="user-quizzes">
    <div>
      <h2>Seus Quizzes</h2>
      <ion-icon tabindex="0" class="icon new-quiz" name="add-circle"></ion-icon>
    </div>
    <ul class="quiz-list">`;

  // FIXME: A função retorna antes de resolver as promises, deixando o html vazio.
  userQuizzes.forEach((quizID) => {
    const promise = axios.get(`${API}/quizzes/${quizID}`);

    promise.then((response) => {
      const quiz = response.data;
      html += createQuiz(quiz);
    });
  });

  html += `
    </ul>
  </section>`;

  return html;
}

function createAllQuizzesList(quizzes) {
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

function createQuiz(quiz) {
  return `
      <li onclick="quizzPageLoadPage(${quiz.id})" tabindex="0" class="quiz">
        <h4>${quiz.title}</h4>
        <div class="gradient-overlay"></div>
        <img src="${quiz.image}" />
      </li>`;
}
// =====================================================================
