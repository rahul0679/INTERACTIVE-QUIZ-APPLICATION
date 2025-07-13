let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  nextBtn.disabled = true;

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(btn, q.answer);
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(button, correctAnswer) {
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.style.backgroundColor = "lightgreen";
    } else {
      btn.style.backgroundColor = "salmon";
    }
  });

  if (button.textContent === correctAnswer) {
    score++;
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("quiz-box").style.display = "none";
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `You scored ${score} out of ${questions.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("quiz-box").style.display = "block";
  resultBox.classList.add("hidden");
  loadQuestion();
}

window.onload = loadQuestion;
