// ========================= GLOBAL VARIABLES ==========================
let screenTitle;
// =====================================================================

// =========================== AUX FUNCTIONS ===========================
function validationInput(element) {
    // Se válido -> ok;
    // Se pelo menos um inválido -> showError();
}
// =====================================================================

// ===================== EVENT LISTENER FUNCTIONS ======================
function toQuestions() {
    // Se todos os inputs válidos -> salvar dados e secondScreen()
    // Se algum inválido -> mensagem
}

function showError() {
    // Tirar hidden do span relacionado
    // Colocar classe invalid no input
}
// =====================================================================

// ========================== GENERATE HTML ============================
function cleanHTML() {
    MAIN_TAG.innerHTML = '';
}
function createTitle() {
    MAIN_TAG.innerHTML = `<h2>${screenTitle}</h2>`;
}

function firstScreen() {
    STYLESHEET.href = "./src/css/creating-quizz.css";
    cleanHTML();
    screenTitle = "Comece pelo começo";
    createTitle();

    MAIN_TAG.innerHTML += `
    <form>
        <ul class="input-list">
            <input type="text" placeholder="Título do seu quizz" minlength="20" maxlength="65" onblur="validationInput(this)" required>
            <span class="title error hidden">O quizz deve ter um título de no mínimo 20 e no máximo 65 caracteres</span>
            <input type="url" placeholder="URL da imagem do seu quizz" onblur="validationInput(this)" required>
            <span class="image error hidden">O valor informado não é uma URL válida</span>
            <input type="number" placeholder="Quantidade de perguntas do quizz" min="3" onblur="validationInput(this)" required>
            <span class="questions error hidden">O quizz deve ter no mínimo 3 perguntas</span>
            <input type="number" placeholder="Quantidade de níveis do quizz" min="2" onblur="validationInput(this)" required>
            <span class="levels error hidden">O quizz deve ter no mínimo 2 níveis</span>
        </ul>
        <button type="button" onClick="validationForm()">Prosseguir para criar perguntas</button>
    </form>`;
}

function secondScreen() {
    cleanHTML();
    screenTitle = "Crie suas perguntas";
    createTitle();

    MAIN_TAG.innerHTML += `
    <ul class="input-list">
        
    </ul>
    <button name="questions" type="button">Prosseguir para criar níveis</button>`;
}

function thirdScreen() {
    cleanHTML();
    screenTitle = "Agora decida os níveis";
    createTitle();

    MAIN_TAG.innerHTML += `
    <ul class="input-list">
        <
    </ul>
    <button name="levels" type="button">Finalizar quizz</button>`;
}

function finalScreen() {
    cleanHTML();
    screenTitle = "Seu quizz está pronto";
    createTitle();

    MAIN_TAG.innerHTML += `
    <button name="created-quizz" type="button">Acessar quizz</button>
    <button name="home-screen" type="button">Voltar para home</button>`;
}
// =====================================================================