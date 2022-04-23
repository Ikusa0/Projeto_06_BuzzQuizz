// ========================= GLOBAL VARIABLES ==========================
let screenTitle;
let quizzTitle;
let imageURL;
let numberQuestions;
let numberLevels;
// =====================================================================

// =========================== AUX FUNCTIONS ===========================
function validationInput(element) {
    if (!element.validity.valid) {
        showError(element);
    } else {
        const span = element.parentNode.querySelector("span");
        span.classList.add("hidden");
        element.classList.remove("invalid");
    }
}

function saveData() {
    let index = 0;
    const allInputs = document.querySelectorAll("input");
    allInputs.forEach((input) => {
        if (index === 0) {
            quizzTitle = input.value;
        } else if (index === 1) {
            imageURL = input.value;
        } else if (index === 2) {
            numberQuestions = input.value;
        } else if (index === 3) {
            numberLevels = input.value;
        }
        index++;
    });
}
// =====================================================================

// ===================== EVENT LISTENER FUNCTIONS ======================
function toQuestions() {
    let blank = 0;
    const allInputs = document.querySelectorAll("input");
    allInputs.forEach((input) => {
        if (input.value === '') {
            blank += 1;
        }
    });
    const invalidInputs = document.querySelectorAll(".invalid");
    if (invalidInputs.length === 0 && blank === 0) {
        saveData();
        secondScreen();
    } else {
        alert("Preencha todos os campos corretamente!");
    }
}

function showError(element) {
    const span = element.parentNode.querySelector("span");
    span.classList.remove("hidden");
    element.classList.add("invalid");
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
            <div>    
                <input type="text" placeholder="Título do seu quizz" minlength="20" maxlength="65" onblur="validationInput(this)" required>
                <span class="title error hidden">O quizz deve ter um título de no mínimo 20 e no máximo 65 caracteres</span>
            </div>
            <div>
                <input type="url" placeholder="URL da imagem do seu quizz" onblur="validationInput(this)" required>
                <span class="image error hidden">O valor informado não é uma URL válida</span>
            </div>
            <div>
                <input type="number" placeholder="Quantidade de perguntas do quizz" min="3" onblur="validationInput(this)" required>
                <span class="questions error hidden">O quizz deve ter no mínimo 3 perguntas</span>
            </div>
            <div>
                <input type="number" placeholder="Quantidade de níveis do quizz" min="2" onblur="validationInput(this)" required>
                <span class="levels error hidden">O quizz deve ter no mínimo 2 níveis</span>
            </div>
        </ul>
        <button type="button" onClick="toQuestions()">Prosseguir para criar perguntas</button>
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