// ======================================
//        TECHPATH AI ORIENTATION
// ======================================

// ELEMENTS

const startButton = document.querySelector(".hero button");

// ======================================
// ANNEE AUTOMATIQUE
// ======================================

const footerYear = document.querySelector("footer p");

if (footerYear) {
  footerYear.innerHTML = `TechPath © ${new Date().getFullYear()}`;
}

// ======================================
// BOUTON DEMARRAGE
// ======================================

startButton.addEventListener("click", () => {
  document.querySelector("#career").scrollIntoView({
    behavior: "smooth",
  });

  setTimeout(() => {
    startTest();
  }, 1000);
});

// ======================================
// QUESTIONS ORIENTATION
// ======================================

function startTest() {
  const questions = [
    {
      question:
        "Tu aimes beaucoup les mathématiques et résoudre des problèmes complexes ?",

      answers: [
        {
          text: "Oui beaucoup",
          type: "ai",
        },

        {
          text: "Un peu",
          type: "data",
        },

        {
          text: "Pas vraiment",
          type: "web",
        },
      ],
    },

    {
      question: "Qu'aimerais-tu créer ?",

      answers: [
        {
          text: "Des robots et des intelligences artificielles 🤖",
          type: "ai",
        },

        {
          text: "Des sites et plateformes 🌐",
          type: "web",
        },

        {
          text: "Des applications mobiles 📱",
          type: "mobile",
        },
      ],
    },

    {
      question: "Tu préfères travailler avec ?",

      answers: [
        {
          text: "Des données et statistiques 📊",
          type: "data",
        },

        {
          text: "Des systèmes et sécurité 🔐",
          type: "cyber",
        },

        {
          text: "Des interfaces visuelles 🎨",
          type: "web",
        },
      ],
    },

    {
      question: "Quel environnement te passionne ?",

      answers: [
        {
          text: "Machines, robots, IA",
          type: "ai",
        },

        {
          text: "Internet et applications",
          type: "web",
        },

        {
          text: "Téléphones et objets connectés",
          type: "mobile",
        },
      ],
    },
  ];

  let scores = {
    ai: 0,
    web: 0,
    mobile: 0,
    data: 0,
    cyber: 0,
  };

  let index = 0;

  function askQuestion() {
    if (index >= questions.length) {
      showResult();

      return;
    }

    const q = questions[index];

    let message = `${q.question}\n\n`;

    q.answers.forEach((answer, i) => {
      message += `${i + 1} - ${answer.text}\n`;
    });

    let choice = prompt(message);

    let selected = q.answers[choice - 1];

    if (selected) {
      scores[selected.type]++;
    }

    index++;

    askQuestion();
  }

  function showResult() {
    let winner = Object.keys(scores)

      .reduce((a, b) => (scores[a] > scores[b] ? a : b));

    let results = {
      ai: `

🤖 Ton profil : Ingénieur IA

Tu devrais apprendre :

Python → Mathématiques → Machine Learning → Deep Learning → Backend.

Tu aimes construire des systèmes intelligents.
`,

      web: `

🌐 Ton profil : Développeur Web

Parcours conseillé :

HTML → CSS → JavaScript → React → Backend.

Tu peux créer rapidement des produits.
`,

      mobile: `

📱 Ton profil : Développeur Mobile

Parcours :

Dart/Flutter ou Kotlin → Applications → Backend.

`,

      data: `

📊 Ton profil : Data Scientist

Parcours :

Python → Statistiques → SQL → Machine Learning.

`,

      cyber: `

🔐 Ton profil : Cybersécurité

Parcours :

Réseaux → Linux → Sécurité → Pentesting.

`,
    };

    alert(results[winner]);
  }

  askQuestion();
}

// ======================================
// ANIMATION APPARITION AU SCROLL
// ======================================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;

        entry.target.style.transform = "translateY(0)";
      }
    });
  },

  {
    threshold: 0.15,
  },
);

sections.forEach((section) => {
  section.style.opacity = 0;

  section.style.transform = "translateY(40px)";

  section.style.transition = "1s ease";

  observer.observe(section);
});

// ======================================
// EFFET CURSEUR FUTURISTE
// ======================================

document.addEventListener(
  "mousemove",

  (e) => {
    const glow = document.createElement("div");

    glow.style.position = "fixed";

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

    glow.style.width = "10px";

    glow.style.height = "10px";

    glow.style.background = "#00f5ff";

    glow.style.borderRadius = "50%";

    glow.style.pointerEvents = "none";

    glow.style.boxShadow = "0 0 20px #00f5ff";

    document.body.appendChild(glow);

    setTimeout(() => {
      glow.remove();
    }, 300);
  },
);
