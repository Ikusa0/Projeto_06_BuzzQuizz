// ===================== EVENT LISTENER FUNCTIONS ======================
function deleteQuiz(quizID) {
  const userQuizzes = getUserQuizzes();
  const deleteAnswer = confirm("Realmente deseja deletar o Quiz?");

  if (deleteAnswer === false) {
    alert("Operação cancelada!");
    return;
  }

  let secreteKey;
  let quizIndex;
  for (let i = 0; i < userQuizzes.length; i++) {
    if (userQuizzes[i].id === quizID) {
      secreteKey = userQuizzes[i].key;
      quizIndex = i;
      break;
    }
  }

  const promise = axios.delete(`${API}/quizzes/${quizID}`, {
    headers: {
      "Secret-Key": secreteKey,
    },
  });

  promise.then(() => {
    userQuizzes.splice(quizIndex);
    setUserQuizzes(userQuizzes);
    alert("Quiz deletado com sucesso!");
    listingQuizzesLoadPage();
  });

  promise.catch(alert, "Ocorreu um erro ao deletar o quiz!");
}
// =====================================================================

// ========================== GENERATE HTML ============================
function listingQuizzesLoadPage() {
  showLoadingScreen();
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
    hideLoadingScreen();

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
      userQuizList.innerHTML += createQuiz(quiz, (userQuiz = true));
    });
  });
}

function createQuiz(quiz, userQuiz = false) {
  if (userQuiz === true) {
    return `
    <li class="quiz">
      <div class="menu">
      <ion-icon class="icon" tabindex="0" onclick="editQuiz(${quiz.id})" name="create-outline"></ion-icon>
        <ion-icon class="icon" tabindex="0" onclick="deleteQuiz(${quiz.id})" name="trash-outline"></ion-icon>
      </div>
      <div>
      <h4>${quiz.title}</h4>
      <div class="gradient-overlay"></div>
      </div>
      <img src="${quiz.image}" />
    </li>`;
  }

  return `
      <li onclick="quizzLoadPage(${quiz.id})" tabindex="0" class="quiz">
        <h4>${quiz.title}</h4>
        <div class="gradient-overlay"></div>
        <img src="${quiz.image}" />
      </li>`;
}
// =====================================================================
