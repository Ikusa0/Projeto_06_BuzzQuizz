// ========================= GLOBAL VARIABLES ==========================
const API = "https://mock-api.driven.com.br/api/v6/buzzquizz";
const MAIN_TAG = document.querySelector("main");
const STYLESHEET = document.querySelector("link:last-of-type");
// =====================================================================

// ========================= GLOBAL FUNCTIONS ==========================
function getUserQuizzes() {
  return JSON.parse(localStorage.getItem("userQuizzes"));
}

function setUserQuizzes(userQuizzes) {
  localStorage.setItem("userQuizzes", JSON.stringify(userQuizzes));
}
// =====================================================================
