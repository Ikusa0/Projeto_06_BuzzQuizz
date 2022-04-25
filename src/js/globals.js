// ========================= GLOBAL VARIABLES ==========================
const API = "https://mock-api.driven.com.br/api/v6/buzzquizz";
const MAIN_TAG = document.querySelector("main");
const STYLESHEET = document.querySelector("link:last-of-type");
const LOADING_SCREEN = document.querySelector(".loading-screen");
// =====================================================================

// ========================= GLOBAL FUNCTIONS ==========================
function getUserQuizzes() {
  let userQuizzes = JSON.parse(localStorage.getItem("userQuizzes"));
  if (userQuizzes === null) {
    userQuizzes = [];
    return userQuizzes;
  }
  return userQuizzes;
}

function setUserQuizzes(userQuizzes) {
  localStorage.setItem("userQuizzes", JSON.stringify(userQuizzes));
}

function showLoadingScreen() {
  LOADING_SCREEN.classList.remove("hidden");
}

function hideLoadingScreen() {
  LOADING_SCREEN.classList.add("hidden");
}
// =====================================================================
