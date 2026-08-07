"use strict";

/*
===========================================
        TECHPATH ENGINE
        Modern JavaScript Architecture
===========================================
*/

// ===============================
// DATA
// ===============================

const careers = {
  ai: {
    icon: "🤖",
    title: "Ingénieur IA",
    score: 0,
    description:
      "Tu aimes les mathématiques, les systèmes complexes et créer des intelligences artificielles.",
    roadmap: [
      "Python",
      "Algorithmique",
      "Mathématiques",
      "Machine Learning",
      "Deep Learning",
      "IA Générative",
    ],
  },

  web: {
    icon: "🌐",
    title: "Développeur Web",
    score: 0,
    description:
      "Tu aimes créer des applications visibles par les utilisateurs.",
    roadmap: ["HTML/CSS", "JavaScript", "React", "Backend", "Bases de données"],
  },

  mobile: {
    icon: "📱",
    title: "Développeur Mobile",
    score: 0,
    description: "Tu veux créer des applications utilisées sur smartphone.",
    roadmap: ["Flutter ou Kotlin", "UI Mobile", "API", "Publication App"],
  },

  data: {
    icon: "📊",
    title: "Data Scientist",
    score: 0,
    description:
      "Tu aimes comprendre les données et découvrir des informations cachées.",
    roadmap: ["Python", "SQL", "Statistiques", "Machine Learning"],
  },

  cyber: {
    icon: "🔐",
    title: "Cybersécurité",
    score: 0,
    description: "Tu aimes protéger les systèmes et comprendre les réseaux.",
    roadmap: ["Linux", "Réseaux", "Sécurité", "Pentesting"],
  },
};

// ===============================
// QUIZ DATABASE
// ===============================

const questions = [
  {
    text: "Qu'est-ce qui t'attire le plus ?",

    answers: [
      ["Créer des robots et IA", "ai"],
      ["Créer des sites modernes", "web"],
      ["Créer des applications mobiles", "mobile"],
      ["Analyser des données", "data"],
    ],
  },

  {
    text: "Aimes-tu beaucoup les mathématiques ?",

    answers: [
      ["Oui, beaucoup", "ai"],
      ["J'aime analyser", "data"],
      ["Pas vraiment, je préfère créer", "web"],
    ],
  },

  {
    text: "Quel problème veux-tu résoudre ?",

    answers: [
      ["Créer une machine intelligente", "ai"],
      ["Aider les utilisateurs avec une application", "mobile"],
      ["Créer des plateformes internet", "web"],
      ["Comprendre le monde avec les données", "data"],
    ],
  },

  {
    text: "Quel environnement t'intéresse ?",

    answers: [
      ["Ordinateurs et systèmes", "cyber"],
      ["Données et modèles", "data"],
      ["Interfaces et expériences", "web"],
      ["Machines intelligentes", "ai"],
    ],
  },
];

// ===============================
// STATE
// ===============================

const state = {
  currentQuestion: 0,

  scores: {
    ai: 0,
    web: 0,
    mobile: 0,
    data: 0,
    cyber: 0,
  },
};

// ===============================
// DOM
// ===============================

const quiz = document.querySelector("#quiz");

const startButton = document.querySelector("#startTest");

// ===============================
// START QUIZ
// ===============================

startButton?.addEventListener("click", () => {
  document.querySelector("#test").scrollIntoView({
    behavior: "smooth",
  });

  setTimeout(renderQuestion, 700);
});

// ===============================
// DISPLAY QUESTION
// ===============================

function renderQuestion() {
  const question = questions[state.currentQuestion];

  if (!question) {
    showResult();

    return;
  }

  quiz.innerHTML = `

<div class="question">

<h3>
Question ${state.currentQuestion + 1}/${questions.length}
</h3>


<h2>
${question.text}
</h2>


<div class="answers">


${question.answers
  .map(
    (answer, index) => `

<button 
class="answer"
data-type="${answer[1]}"
>

${answer[0]}

</button>

`,
  )
  .join("")}


</div>


</div>

`;

  document.querySelectorAll(".answer").forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.dataset.type;

      state.scores[type]++;

      state.currentQuestion++;

      renderQuestion();
    });
  });
}

// ===============================
// RESULT
// ===============================

function showResult() {
  const winner = Object.entries(state.scores)

    .sort((a, b) => b[1] - a[1])[0][0];

  const career = careers[winner];

  quiz.innerHTML = `

<div class="result">


<h1>

${career.icon}

${career.title}

</h1>


<p>

${career.description}

</p>



<h3>
Ton parcours conseillé :
</h3>


<ul>

${career.roadmap
  .map(
    (step) => `
<li>${step}</li>
`,
  )
  .join("")}

</ul>


<button id="restart">

Refaire le test

</button>


</div>

`;

  document.querySelector("#restart").addEventListener("click", restartQuiz);
}

// ===============================
// RESET
// ===============================

function restartQuiz() {
  state.currentQuestion = 0;

  Object.keys(state.scores).forEach((key) => (state.scores[key] = 0));

  renderQuestion();
}

// ===============================
// SCROLL ANIMATION
// ===============================

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

document
  .querySelectorAll("section")
  .forEach((section) => observer.observe(section));

// ===============================
// YEAR UPDATE
// ===============================

const year = document.querySelector("footer p");

if (year) {
  year.textContent = `TechPath © ${new Date().getFullYear()}`;
}
