const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

function wireForm(formId, noteId) {
  const form = document.getElementById(formId);
  const note = document.getElementById(noteId);

  if (!form || !note) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // This is a static demo (GitHub Pages). You'll replace this with a real backend or form service later.
    note.textContent = "Thanks! Your request is saved (demo). Add a real form handler when ready.";
    form.reset();
  });
}

wireForm("quickQuoteForm", "formNote");
wireForm("quoteForm", "quoteNote");
