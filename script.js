document.addEventListener("DOMContentLoaded", () => {
  // Navigation Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Intersection Observer for Overlay
  const valueMessage = document.getElementById("value-message");
  const contactButton = document.getElementById("contactButton");

  if (valueMessage && contactButton) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          valueMessage.style.display = "none";
        } else {
          valueMessage.style.display = "block";
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(contactButton);
  }
});
