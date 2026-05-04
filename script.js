const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const contactForm = document.querySelector(".contact-form");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
    });
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = contactForm.querySelector("button");
    if (button) {
      button.textContent = "Message envoye";
      button.disabled = true;
    }
  });
}
