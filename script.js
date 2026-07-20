const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const themeToggle = document.getElementById("themeToggle");

function getTheme() {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"
    );
  }
}

if (themeToggle) {
  setTheme(getTheme());
  themeToggle.addEventListener("click", () => {
    setTheme(getTheme() === "dark" ? "light" : "dark");
  });
}

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* Soft scroll-in for section heads when they enter viewport */
const observeTargets = document.querySelectorAll(".sec-head, .project, .skill, .pitch-block, .timeline li");

if ("IntersectionObserver" in window && observeTargets.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  observeTargets.forEach((el) => {
    el.classList.add("will-reveal");
    io.observe(el);
  });
}

/* Volubile demo : déplier → lecture muette façon GIF ; replier → pause */
const demoToggle = document.getElementById("volubileDemoToggle");
const demoPanel = document.getElementById("volubileDemoPanel");
const demoVideo = document.getElementById("volubileDemoVideo");

function forceMute(video) {
  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  video.setAttribute("muted", "");
}

if (demoToggle && demoPanel && demoVideo) {
  forceMute(demoVideo);

  demoVideo.addEventListener("volumechange", () => forceMute(demoVideo));
  demoVideo.addEventListener("play", () => forceMute(demoVideo));

  demoToggle.addEventListener("click", async () => {
    const willOpen = demoToggle.getAttribute("aria-expanded") !== "true";
    demoToggle.setAttribute("aria-expanded", String(willOpen));
    demoPanel.hidden = !willOpen;

    const label = demoToggle.querySelector(".demo-toggle-label");

    if (willOpen) {
      if (label) label.textContent = "Masquer l’exemple";
      forceMute(demoVideo);
      try {
        demoVideo.currentTime = 0;
        await demoVideo.play();
      } catch {
        /* rare : navigateur bloque même le muet */
      }
    } else {
      if (label) label.textContent = "Voir un exemple";
      demoVideo.pause();
      demoVideo.currentTime = 0;
    }
  });
}
