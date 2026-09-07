// Menu mobile
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Tahun otomatis di footer
const tahunEl = document.getElementById('tahun');
if (tahunEl) tahunEl.textContent = new Date().getFullYear();

// Form kontak — placeholder, perlu dihubungkan ke layanan seperti Formspree
// agar bisa mengirim email tanpa server sendiri (lihat README.md).
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    if (contactForm.getAttribute('action') === '#') {
      e.preventDefault();
      alert('Formulir belum terhubung ke layanan pengirim. Lihat README.md untuk cara mengaktifkannya (mis. Formspree), atau hubungi kami langsung lewat telepon/email di atas.');
    }
  });
}

document.querySelectorAll('.sidebar-widget a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
