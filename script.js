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
  const nomorWhatsAppDesa = '6285797907451'; // nomor tujuan pengajuan layanan
  const emailDesa = 'info@desa-cihirup.kuningankab.go.id';

  // Pratinjau foto yang diunggah
  const fotoInput = document.getElementById('lFoto');
  const fotoPreview = document.getElementById('lFotoPreview');
  const fotoNote = document.getElementById('lFotoNote');
  fotoInput.addEventListener('change', () => {
    const file = fotoInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        fotoPreview.src = e.target.result;
        fotoPreview.hidden = false;
      };
      reader.readAsDataURL(file);
      fotoNote.hidden = false;
    } else {
      fotoPreview.hidden = true;
      fotoNote.hidden = true;
    }
  });

  function susunPesan() {
    const jenis = document.getElementById('lJenis').value;
    const nama = document.getElementById('lNama').value;
    const nik = document.getElementById('lNIK').value.trim();
    const jk = document.getElementById('lJK').value;
    const tempatLahir = document.getElementById('lTempatLahir').value;
    const tanggalLahir = document.getElementById('lTanggalLahir').value;
    const agama = document.getElementById('lAgama').value;
    const pekerjaan = document.getElementById('lPekerjaan').value;
    const dusun = document.getElementById('lDusun').value;
    const rt = document.getElementById('lRT').value.padStart(3, '0');
    const rw = document.getElementById('lRW').value.padStart(3, '0');
    const kontak = document.getElementById('lKontak').value;
    const keterangan = document.getElementById('lKeterangan').value;

    if (!jenis || !nama || !nik || !jk || !tempatLahir || !tanggalLahir || !agama || !pekerjaan || !dusun || !rt || !rw || !kontak || !keterangan) {
      alert('Mohon lengkapi semua kolom terlebih dahulu.');
      return null;
    }
    if (!/^\d{16}$/.test(nik)) {
      alert('NIK harus terdiri dari 16 digit angka.');
      return null;
    }

    const tglLahirFormat = new Date(tanggalLahir + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const alamat = `Dusun ${dusun} RT. ${rt} RW. ${rw}, Desa Cihirup, Kecamatan Ciawigebang, Kabupaten Kuningan`;

    let pesan = `Assalamu'alaikum, saya ingin mengajukan layanan desa.\n\n`
      + `Jenis Layanan: ${jenis}\n`
      + `Nama: ${nama}\n`
      + `NIK: ${nik}\n`
      + `Jenis Kelamin: ${jk}\n`
      + `Tempat, Tanggal Lahir: ${tempatLahir}, ${tglLahirFormat}\n`
      + `Agama: ${agama}\n`
      + `Pekerjaan: ${pekerjaan}\n`
      + `Alamat: ${alamat}\n`
      + `Kontak Balasan: ${kontak}\n`
      + `Keperluan/Isi: ${keterangan}`;

    if (fotoInput.files[0]) {
      pesan += `\n\n(Ada foto pendukung — akan dilampirkan menyusul secara manual)`;
    }
    return pesan;
  }

  document.getElementById('kirimWA').addEventListener('click', () => {
    const pesan = susunPesan();
    if (!pesan) return;
    if (fotoInput.files[0]) {
      alert('Foto tidak ikut terkirim otomatis. Setelah WhatsApp terbuka, lampirkan foto tersebut secara manual dari galeri sebelum mengirim.');
    }
    window.open(`https://wa.me/${nomorWhatsAppDesa}?text=${encodeURIComponent(pesan)}`, '_blank');
  });

  document.getElementById('kirimEmail').addEventListener('click', () => {
    const pesan = susunPesan();
    if (!pesan) return;
    if (fotoInput.files[0]) {
      alert('Foto tidak ikut terkirim otomatis. Setelah aplikasi email terbuka, lampirkan foto tersebut secara manual sebelum mengirim.');
    }
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
