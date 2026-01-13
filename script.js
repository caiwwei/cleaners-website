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

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     note.textContent = "Thanks! Your request is saved (demo). Add a real form handler when ready.";
//     form.reset();
//   });
}

wireForm("quickQuoteForm", "formNote");
wireForm("quoteForm", "quoteNote");

const quoteForm = document.getElementById("quoteForm");
const quoteNote = document.getElementById("quoteNote");

if (quoteForm) {
  quoteForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(quoteForm);

    try {
      const response = await fetch(quoteForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        quoteNote.textContent =
          "Thanks! Your request has been sent. We’ll get back to you shortly.";
        quoteForm.reset();
      } else {
        quoteNote.textContent =
          "Something went wrong. Please try again later.";
      }
    } catch (error) {
      quoteNote.textContent =
        "Network error. Please check your connection and try again.";
    }
  });
}

const quickQuoteBtn = document.getElementById("quickQuoteBtn");

if (quickQuoteBtn) {
  quickQuoteBtn.addEventListener("click", () => {
    // Get Quick Quote form
    const quickForm = document.getElementById("quickQuoteForm");
    const mainForm = document.getElementById("quoteForm");

    if (!quickForm || !mainForm) return;

    // Helper to copy value by name
    const copyField = (name) => {
      const from = quickForm.querySelector(`[name="${name}"]`);
      const to = mainForm.querySelector(`[name="${name}"]`);
      if (from && to && from.value) {
        to.value = from.value;
      }
    };

    // Copy matching fields
    copyField("name");
    copyField("email");
    copyField("service");

    // Copy size into details
    const sizeField = quickForm.querySelector('[name="size"]');
    const detailsField = mainForm.querySelector('[name="details"]');

    if (sizeField && detailsField && sizeField.value) {
      const prefix = `Bedrooms / Bathrooms: ${sizeField.value}\n`;
      if (!detailsField.value.includes(prefix)) {
        detailsField.value = prefix + detailsField.value;
      }
    }

    // Scroll to main form
    document
      .getElementById("quote")
      .scrollIntoView({ behavior: "smooth" });

    // Focus first input for accessibility
    setTimeout(() => {
      mainForm.querySelector('[name="name"]')?.focus();
    }, 600);
  });
}
