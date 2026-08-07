"use strict";

// ===============================
// THEME TOGGLE (Soleil / Lune)
// ===============================

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

const savedTheme = localStorage.getItem("techpath-theme");
if (savedTheme === "light") {
  document.body.classList.add("light-mode");
  themeIcon.className = "fas fa-sun";
} else {
  themeIcon.className = "fas fa-moon";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    themeIcon.className = "fas fa-sun";
    localStorage.setItem("techpath-theme", "light");
  } else {
    themeIcon.className = "fas fa-moon";
    localStorage.setItem("techpath-theme", "dark");
  }
});

// ===============================
// HEADER SCROLL EFFECT
// ===============================

const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 60);
});

// ===============================
// QUIZ DATA
// ===============================

const careers = {
  ai: {
    icon: "🤖",
    title: "Ingénieur IA",
    description:
      "Tu aimes les maths, les systèmes complexes et créer des intelligences artificielles.",
    roadmap: [
      "Python",
      "Mathématiques",
      "Machine Learning",
      "Deep Learning",
      "IA Générative",
    ],
    local: [
      "📍 Goma : Projets agricoles avec IA",
      "📍 En ligne : Cours DeepLearning.AI",
    ],
  },
  web: {
    icon: "🌐",
    title: "Développeur Web",
    description: "Tu aimes créer des sites et applications visibles par tous.",
    roadmap: ["HTML/CSS", "JavaScript", "React", "Backend", "Bases de données"],
    local: ["📍 Goma : Sites pour ONG locales", "📍 En ligne : FreeCodeCamp"],
  },
  mobile: {
    icon: "📱",
    title: "Développeur Mobile",
    description: "Tu veux créer des applications pour smartphones.",
    roadmap: ["Flutter ou Kotlin", "UI Mobile", "API", "Publication"],
    local: [
      "📍 Goma : Apps pour petits commerçants",
      "📍 En ligne : Google Developer Groups",
    ],
  },
  data: {
    icon: "📊",
    title: "Data Scientist",
    description: "Tu aimes analyser les données et en tirer des informations.",
    roadmap: ["Python", "SQL", "Statistiques", "Machine Learning"],
    local: [
      "📍 Goma : Analyse des données volcaniques",
      "📍 En ligne : Kaggle",
    ],
  },
  cyber: {
    icon: "🔐",
    title: "Cybersécurité",
    description: "Tu aimes protéger les systèmes et comprendre les réseaux.",
    roadmap: ["Linux", "Réseaux", "Sécurité", "Pentesting"],
    local: [
      "📍 Goma : Sécurité des réseaux",
      "📍 En ligne : Certifications CEH",
    ],
  },
};

const questions = [
  {
    text: "Qu'est-ce qui t'attire le plus ?",
    answers: [
      ["🤖 Créer des robots et IA", "ai"],
      ["🌐 Créer des sites web", "web"],
      ["📱 Créer des apps mobiles", "mobile"],
      ["📊 Analyser des données", "data"],
      ["🔐 Sécuriser des systèmes", "cyber"],
    ],
  },
  {
    text: "Aimes-tu les mathématiques ?",
    answers: [
      ["Oui, j'adore les chiffres", "ai"],
      ["J'aime analyser", "data"],
      ["Pas trop, je préfère créer", "web"],
    ],
  },
  {
    text: "Quel problème veux-tu résoudre ?",
    answers: [
      ["Créer une machine intelligente", "ai"],
      ["Créer une application utile", "mobile"],
      ["Créer un site éducatif", "web"],
      ["Comprendre le monde avec les données", "data"],
    ],
  },
  {
    text: "Quel environnement te plaît ?",
    answers: [
      ["Ordinateurs et systèmes", "cyber"],
      ["Données et modèles", "data"],
      ["Interfaces et expériences", "web"],
      ["Machines intelligentes", "ai"],
    ],
  },
  {
    text: "Comment préfères-tu apprendre ?",
    answers: [
      ["En lisant des docs", "data"],
      ["En regardant des vidéos", "web"],
      ["En pratiquant sur des projets", "mobile"],
      ["En résolvant des problèmes", "ai"],
    ],
  },
];

// ===============================
// STATE
// ===============================

const state = {
  currentQuestion: 0,
  scores: { ai: 0, web: 0, mobile: 0, data: 0, cyber: 0 },
};

// ===============================
// DOM
// ===============================

const quiz = document.getElementById("quiz");
const startBtn = document.getElementById("startTest");

// ===============================
// START QUIZ
// ===============================

startBtn?.addEventListener("click", () => {
  startBtn.textContent = "🔄 Chargement...";
  startBtn.disabled = true;

  document.getElementById("test").scrollIntoView({ behavior: "smooth" });

  setTimeout(() => {
    startBtn.textContent = "Trouver mon domaine 🚀";
    startBtn.disabled = false;
    renderQuestion();
  }, 600);
});

// ===============================
// RENDER QUESTION
// ===============================

function renderQuestion() {
  const q = questions[state.currentQuestion];
  if (!q) {
    showResult();
    return;
  }

  const progress = (state.currentQuestion / questions.length) * 100;

  quiz.innerHTML = `
    <div style="text-align: left;">
      <div style="width:100%; height:6px; background:var(--border-color); border-radius:10px; overflow:hidden; margin-bottom:1rem;">
        <div style="width:${progress}%; height:100%; background:var(--gradient-main); border-radius:10px; transition:width 0.4s;"></div>
      </div>
      <p style="color:var(--text-muted); font-size:0.9rem;">
        Question ${state.currentQuestion + 1}/${questions.length}
      </p>
      <h3 style="font-size:1.8rem; margin:1.5rem 0; color:var(--text-primary);">${q.text}</h3>
      <div style="display:flex; flex-direction:column; gap:0.8rem;">
        ${q.answers
          .map(
            ([label, type]) => `
          <button class="quiz-answer" data-type="${type}" style="
            background:var(--bg-card);
            border:2px solid var(--border-color);
            border-radius:15px;
            padding:1rem 1.5rem;
            color:var(--text-primary);
            font-size:1rem;
            cursor:pointer;
            transition:all 0.25s;
            text-align:left;
            font-family:inherit;
          "
          onmouseover="this.style.borderColor='var(--border-hover)'; this.style.transform='translateX(6px)';"
          onmouseout="this.style.borderColor='var(--border-color)'; this.style.transform='translateX(0)';"
          >
            ${label}
          </button>
        `,
          )
          .join("")}
      </div>
    </div>
  `;

  document.querySelectorAll(".quiz-answer").forEach((btn) => {
    btn.addEventListener("click", function () {
      const type = this.dataset.type;
      this.style.borderColor = "#06b6d4";
      this.style.background = "rgba(37,99,235,0.15)";

      state.scores[type] = (state.scores[type] || 0) + 1;

      setTimeout(() => {
        state.currentQuestion++;
        renderQuestion();
      }, 300);
    });
  });
}

// ===============================
// SHOW RESULT
// ===============================

function showResult() {
  const sorted = Object.entries(state.scores).sort((a, b) => b[1] - a[1]);
  const winner = sorted[0][0];
  const maxScore = sorted[0][1];
  const ties = sorted.filter(([_, score]) => score === maxScore);
  const career = careers[winner];

  let html = `
    <div style="background:var(--bg-card); border-radius:var(--radius-sm); padding:2rem; border:2px solid var(--border-hover);">
      <div style="text-align:center;">
        <span style="font-size:4rem;">${career.icon}</span>
        <h2 style="font-size:2.8rem; margin:0.5rem 0; background:var(--gradient-text); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">
          ${career.title}
        </h2>
        <p style="color:var(--text-secondary);">${career.description}</p>
      </div>
  `;

  if (ties.length > 1) {
    html += `
      <div style="margin:1.5rem 0; padding:1rem; background:rgba(251,191,36,0.1); border-radius:15px; border-left:4px solid #fbbf24;">
        <p style="color:#fbbf24; font-weight:600;">⚠️ Plusieurs talents !</p>
        <p style="color:var(--text-muted); font-size:0.9rem;">Tu pourrais aussi explorer :</p>
        <div style="display:flex; gap:0.8rem; flex-wrap:wrap; justify-content:center; margin-top:0.5rem;">
          ${ties.map(([key]) => `<span style="background:rgba(37,99,235,0.15); padding:0.3rem 1rem; border-radius:20px; font-size:0.9rem; color:var(--text-primary);">${careers[key].icon} ${careers[key].title}</span>`).join("")}
        </div>
      </div>
    `;
  }

  html += `
    <div style="margin:1.5rem 0;">
      <h4 style="color:#38bdf8;">📚 Ton parcours conseillé :</h4>
      <ul style="list-style:none; padding:0;">
        ${career.roadmap.map((step) => `<li style="padding:0.4rem 0; border-bottom:1px solid var(--border-color); display:flex; align-items:center; gap:0.5rem;"><span style="color:#06b6d4;">▸</span> ${step}</li>`).join("")}
      </ul>
    </div>
  `;

  html += `
    <div style="margin:1.5rem 0; padding:1.5rem; background:rgba(6,182,212,0.05); border-radius:15px; border-left:4px solid #06b6d4;">
      <h4 style="color:#fbbf24;">🇨🇩 En RDC, tu peux :</h4>
      <ul style="list-style:none; padding:0;">
        ${career.local.map((opp) => `<li style="padding:0.3rem 0; font-size:0.95rem; color:var(--text-secondary);">${opp}</li>`).join("")}
      </ul>
    </div>
  `;

  html += `
    <div style="display:flex; flex-wrap:wrap; gap:1rem; justify-content:center; margin-top:2rem;">
      <button id="restart" style="
        padding:0.8rem 2rem;
        background:var(--bg-card);
        border:1px solid var(--border-color);
        border-radius:50px;
        color:var(--text-primary);
        cursor:pointer;
        transition:all 0.3s;
        font-family:inherit;
        font-size:1rem;
      "
      onmouseover="this.style.background='var(--border-hover)'; this.style.color='#fff';"
      onmouseout="this.style.background='var(--bg-card)'; this.style.color='var(--text-primary)';"
      >🔄 Refaire le test</button>
      
      <button id="shareWA" style="
        padding:0.8rem 2rem;
        background:#25D366;
        border:none;
        border-radius:50px;
        color:white;
        cursor:pointer;
        font-family:inherit;
        font-size:1rem;
        transition:all 0.3s;
      "
      onmouseover="this.style.transform='scale(1.05)'"
      onmouseout="this.style.transform='scale(1)'"
      >📱 Partager sur WhatsApp</button>
    </div>
  `;

  quiz.innerHTML = html;

  document.getElementById("restart")?.addEventListener("click", restartQuiz);
  document.getElementById("shareWA")?.addEventListener("click", () => {
    const msg = `🎯 Mon résultat TechPath : ${career.icon} ${career.title} !\n${career.description}\nParcours : ${career.roadmap.join(" → ")}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  });
}

// ===============================
// RESTART
// ===============================

function restartQuiz() {
  state.currentQuestion = 0;
  Object.keys(state.scores).forEach((k) => (state.scores[k] = 0));
  quiz.innerHTML = `
    <button onclick="startQuizFromUI()" style="
      background:var(--gradient-main);
      border:none;
      color:white;
      padding:1rem 2.5rem;
      border-radius:50px;
      cursor:pointer;
      font-size:1.1rem;
      font-weight:600;
      transition:all 0.3s;
      font-family:inherit;
    "
    onmouseover="this.style.transform='scale(1.05)'"
    onmouseout="this.style.transform='scale(1)'"
    >Démarrer le test 🧠</button>
    <p style="margin-top:1rem; opacity:0.6; color:var(--text-muted);">${questions.length} questions pour découvrir ton domaine</p>
  `;
}

window.startQuizFromUI = function () {
  renderQuestion();
};

// ===============================
// SCROLL ANIMATIONS
// ===============================

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// ===============================
// YEAR AUTO-UPDATE
// ===============================

const footerYear = document.querySelector("footer p");
if (footerYear) {
  footerYear.textContent = `TechPath © ${new Date().getFullYear()} • Apprendre • Construire • Innover`;
}

// ===============================
// SMOOTH SCROLL
// ===============================

document.querySelectorAll("nav a, .hero a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const target = this.getAttribute("href");
    if (target && target.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

console.log("🚀 TechPath Goma v2.0 — Prêt à orienter les jeunes !");
