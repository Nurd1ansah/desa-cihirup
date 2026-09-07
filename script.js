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

// Sidebar (panel geser dibuka lewat tombol garis tiga)
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarPanel = document.getElementById('sidebarPanel');
const sidebarClose = document.getElementById('sidebarClose');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
  sidebarPanel.classList.add('open');
  sidebarOverlay.classList.add('visible');
  sidebarToggle.setAttribute('aria-expanded', 'true');
}
function closeSidebar() {
  sidebarPanel.classList.remove('open');
  sidebarOverlay.classList.remove('visible');
  sidebarToggle.setAttribute('aria-expanded', 'false');
}

if (sidebarToggle && sidebarPanel && sidebarOverlay) {
  sidebarToggle.addEventListener('click', () => {
    sidebarPanel.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  sidebarClose.addEventListener('click', closeSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });
  sidebarPanel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeSidebar);
  });
}

// Tahun otomatis di footer
const tahunEl = document.getElementById('tahun');
if (tahunEl) tahunEl.textContent = new Date().getFullYear();

// Formulir Layanan Masyarakat — susun pesan lalu buka WhatsApp/email
const layananForm = document.getElementById('layananForm');
if (layananForm) {
  const nomorWhatsAppDesa = '6281144336654'; // dari nomor kontak desa; ganti jika perlu
  const emailDesa = 'info@desa-cihirup.kuningankab.go.id';

  function susunPesan() {
    const jenis = document.getElementById('lJenis').value;
    const nama = document.getElementById('lNama').value;
    const kontak = document.getElementById('lKontak').value;
    const keterangan = document.getElementById('lKeterangan').value;

    if (!jenis || !nama || !kontak || !keterangan) {
      alert('Mohon lengkapi semua kolom terlebih dahulu.');
      return null;
    }
    return `Assalamu'alaikum, saya ingin mengajukan layanan desa.\n\nJenis Layanan: ${jenis}\nNama: ${nama}\nKontak Balasan: ${kontak}\nKeperluan/Isi: ${keterangan}`;
  }

  document.getElementById('kirimWA').addEventListener('click', () => {
    const pesan = susunPesan();
    if (!pesan) return;
    window.open(`https://wa.me/${nomorWhatsAppDesa}?text=${encodeURIComponent(pesan)}`, '_blank');
  });

  document.getElementById('kirimEmail').addEventListener('click', () => {
    const pesan = susunPesan();
    if (!pesan) return;
    const jenis = document.getElementById('lJenis').value;
    window.location.href = `mailto:${emailDesa}?subject=${encodeURIComponent('Pengajuan Layanan: ' + jenis)}&body=${encodeURIComponent(pesan)}`;
  });
}

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
