// ========================= GLOBAL VARIABLES ==========================
let screenTitle;
let numberQuestions;
let numberLevels;
let invalidInputs;
let quizz = {};
// =====================================================================

// =========================== AUX FUNCTIONS ===========================
function cleanHTML() {
    MAIN_TAG.innerHTML = '';
}

function validationInput(element) {
    const span = element.parentNode.querySelector("span");
    if (!element.validity.valid) {
        showError(element);
    } else {
        span.classList.add("hidden");
        element.classList.remove("invalid");
    }
}

function validationAllInputs() {
    invalidInputs = 0;
    const allInputs = document.querySelectorAll("input");
    allInputs.forEach(input => {
        if(!input.validity.valid) {
            invalidInputs++;
        }
    });
    return invalidInputs;
}

function saveBasic() {
    let index = 0;
    const allInputs = document.querySelectorAll("input");
    allInputs.forEach(input => {
        if (index === 0) {
            quizz.title = input.value;
        } else if (index === 1) {
            quizz.image = input.value;
        } else if (index === 2) {
            numberQuestions = input.value;
        } else if (index === 3) {
            numberLevels = input.value;
        }
        index++;
    });
}

function saveQuestions() {
    let questionsSaving = [];
    for(let i=0; i<numberQuestions; i++) {
        let question = {};
        let answer1 = {};
        let answer2 = {};
        let answer3 = {};
        let answer4 = {};
        let answersSaving = [];
        let index = 0;
        const selectUL = document.querySelector(`.question${i}`);
        const allInputs = selectUL.querySelectorAll("input");
        allInputs.forEach(input => {
            if (index === 0) {
                question.title = input.value;
            } else if (index === 1) {
                question.color = input.value;
            } else if (index === 2) {
                answer1.text = input.value;
            } else if (index === 3) {
                answer1.image = input.value;
                answer1.isCorrectAnswer = true;
                answersSaving.push(answer1);
            } else if (index === 4) {
                answer2.text = input.value;
            } else if (index === 5) {
                answer2.image = input.value;
                answer2.isCorrectAnswer = false;
                answersSaving.push(answer2);
            } else if (input.value !== '' && index === 6) {
                answer3.text = input.value;
            } else if (input.value !== '' && index === 7) {
                answer3.image = input.value;
                answer3.isCorrectAnswer = false;
                answersSaving.push(answer3);
            } else if (input.value !== '' && index === 8) {
                answer4.text = input.value;
            } else if (input.value !== '' && index === 9) {
                answer4.image = input.value;
                answer4.isCorrectAnswer = false;
                answersSaving.push(answer4);
            }
            question.answers = answersSaving;
            index++;
        });
        questionsSaving.push(question);
    }
    quizz.questions = questionsSaving;
}

function saveLevels() {

}
// =====================================================================

// ===================== EVENT LISTENER FUNCTIONS ======================
function toQuestions() {
    validationAllInputs();
    if (invalidInputs === 0) {
        saveBasic();
        secondScreen();
    } else {
        alert("Preencha todos os campos corretamente!");
    }
}

function toLevels() {
    validationAllInputs();
    if (invalidInputs === 0) {
        saveQuestions();
        thirdScreen();
    } else {
        alert("Preencha todos os campos corretamente!");
    }
}

function finishQuizz() {
    validationAllInputs();
    if (invalidInputs === 0) {
        //saveLevels();
        finalScreen();
    } else {
        alert("Preencha todos os campos corretamente!");
    }
}

function showError(element) {
    const span = element.parentNode.querySelector("span");
    span.classList.remove("hidden");
    element.classList.add("invalid");
}

function showList(element) {
    const questionOpen = document.querySelector(".open");
    if (questionOpen !== null) {
        questionOpen.classList.add("hidden");
        questionOpen.classList.remove("open");
    }
    const thisQuestion = element.parentNode.parentNode.querySelector(".list");
    thisQuestion.classList.remove("hidden");
    thisQuestion.classList.add("open");
}
// =====================================================================

// ========================== GENERATE HTML ============================
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
                <span class="error hidden">O quizz deve ter um título de no mínimo 20 e no máximo 65 caracteres</span>
            </div>
            <div>
                <input type="url" placeholder="URL da imagem do seu quizz" onblur="validationInput(this)" required>
                <span class="error hidden">O valor informado não é uma URL válida</span>
            </div>
            <div>
                <input type="number" placeholder="Quantidade de perguntas do quizz" min="3" onblur="validationInput(this)" required>
                <span class="error hidden">O quizz deve ter no mínimo 3 perguntas</span>
            </div>
            <div>
                <input type="number" placeholder="Quantidade de níveis do quizz" min="2" onblur="validationInput(this)" required>
                <span class="error hidden">O quizz deve ter no mínimo 2 níveis</span>
            </div>
        </ul>
        <button type="button" onClick="toQuestions()">Prosseguir para criar perguntas</button>
    </form>`;
}

function secondScreen() {
    STYLESHEET.href = "./src/css/creating-quizz.css";
    cleanHTML();
    screenTitle = "Crie suas perguntas";
    createTitle();

    for (let i=0; i < numberQuestions; i++) {
        MAIN_TAG.innerHTML += `
        <form>
            <ul class="input-list question${i}">
                <div class="main-question">
                    <h3>Pergunta ${i+1}</h3>
                    <ion-icon name="create-outline" onClick="showList(this)"></ion-icon>
                </div>
                <div class="list hidden">
                    <div>
                        <input type="text" placeholder="Texto da pergunta" minlength="20" onblur="validationInput(this)" required>
                        <span class="error hidden">A pergunta deve ter no mínimo 20 caracteres</span>
                    </div>
                    <div>
                        <input type="text" placeholder="Cor de fundo da pergunta" pattern="^#+([a-fA-F0-9]{6})$" minlength="7" maxlength="7" onblur="validationInput(this)" required>
                        <span class="error hidden">Deve estar em formato hexadecimal (começando com # seguido de 6 caracteres hexadecimais)</span>
                    </div>
                    <h3>Resposta correta</h3>
                    <div>
                        <input type="text" placeholder="Resposta correta" onblur="validationInput(this)" required>
                        <span class="error hidden">É obrigatório a inclusão de uma resposta correta</span>
                    </div>
                    <div>
                        <input type="url" placeholder="URL da imagem" onblur="validationInput(this)" required>
                        <span class="error hidden">O valor informado não é uma URL válida</span>
                    </div>
                    <h3>Respostas incorretas</h3>
                    <div>
                        <input type="text" placeholder="Resposta incorreta 1" onblur="validationInput(this)" required>
                        <span class="error hidden">É obrigatório a inclusão de pelo menos uma resposta incorreta</span>
                    </div>
                    <div>
                        <input type="url" placeholder="URL da imagem 1" onblur="validationInput(this)" required>
                        <span class="error hidden">O valor informado não é uma URL válida</span>
                    </div>
                    <div class="space">
                        <input type="text" placeholder="Resposta incorreta 2">
                    </div>
                    <div>
                        <input type="url" placeholder="URL da imagem 2" onblur="validationInput(this)">
                        <span class="error hidden">O valor informado não é uma URL válida</span>
                    </div>
                    <div class="space">
                        <input type="text" placeholder="Resposta incorreta 3">
                    </div>
                    <div>
                        <input type="url" placeholder="URL da imagem 3" onblur="validationInput(this)">
                        <span class="error hidden">O valor informado não é uma URL válida</span>
                    </div>
                </div>
            </ul>`;
    }
    MAIN_TAG.innerHTML += `
        <button type="button" onClick="toLevels()">Prosseguir para criar níveis</button>
    </form>`
}

function thirdScreen() {
    STYLESHEET.href = "./src/css/creating-quizz.css";
    cleanHTML();
    screenTitle = "Agora decida os níveis";
    createTitle();

    for (let i=0; i < numberLevels; i++) {
        MAIN_TAG.innerHTML += `
        <form>
            <ul class="input-list level${i}">
                <div class="main-level">
                    <h3>Nível ${i+1}</h3>
                    <ion-icon name="create-outline" onClick="showList(this)"></ion-icon>
                </div>
                <div class="list hidden">
                    <div>
                        <input type="text" placeholder="Título do nível" minlength="10" onblur="validationInput(this)" required>
                        <span class="error hidden">O título deve ter no mínimo 10 caracteres</span>
                    </div>
                    <div>
                        <input type="number" placeholder="% de acerto mínima" min="0" max="100" onblur="validationInput(this)" required>
                        <span class="error hidden">Deve ser um número entre 0 e 100</span>
                    </div>
                    <div>
                        <input type="url" placeholder="URL da imagem do nível" onblur="validationInput(this)" required>
                        <span class="error hidden">O valor informado não é uma URL válida</span>
                    </div>
                    <div>
                        <input type="text" placeholder="Descrição do nível" minlength="30" onblur="validationInput(this)" required>
                        <span class="error hidden">A descrição deve possuir no mínimo 30 caracteres</span>
                    </div>
                </div>
            </ul>`;
    }
    MAIN_TAG.innerHTML += `
        <button type="button" onClick="finishQuizz()">Finalizar Quizz</button>
    </form>`
}

function finalScreen() {
    STYLESHEET.href = "./src/css/creating-quizz.css";
    cleanHTML();
    screenTitle = "Seu quizz está pronto";
    createTitle();

    MAIN_TAG.innerHTML += `
    <div class="your-quizz">
        <img src=${quizz.image}>
        <h3>${quizz.title}</h3>
    </div>
    <button class="last-button" type="button">Acessar quizz</button>
    <button class="back-home" type="button">Voltar para home</button>`;
}
// =====================================================================