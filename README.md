# Situs Desa Cihirup

Situs statis (HTML/CSS/JS murni, tanpa perlu server atau instalasi apa pun) untuk Desa Cihirup, Kecamatan Ciawigebang, Kabupaten Kuningan, Jawa Barat.

## Isi folder

```
desa-cihirup/
├── index.html   → seluruh isi & struktur halaman
├── style.css    → tampilan (warna, font, tata letak)
├── script.js    → menu mobile, tahun otomatis di footer, form kontak
└── README.md    → panduan ini
```

## Cara mengedit konten

Semua teks ada langsung di `index.html`, dibagi per bagian dengan komentar `<!-- ... -->`:
`#beranda`, `#profil`, `#pemerintahan`, `#potensi`, `#berita`, `#galeri`, `#kontak`.

- **Menambah kegiatan/berita**: salin satu blok `<article class="berita-item">...</article>` di bagian `#berita`, lalu ganti tanggal dan isinya.
- **Mengganti galeri ilustrasi dengan foto asli**: di bagian `#galeri`, ganti isi `<div class="galeri-item">` dari SVG menjadi `<img src="images/nama-foto.jpg" alt="...">`. Simpan foto di folder baru `images/`.
- **Data yang masih perlu dilengkapi admin desa**: jumlah penduduk, luas wilayah persis, daftar lengkap perangkat desa, dan riwayat kepala desa antara 1822–2025 (data yang tersedia saat situs ini dibuat hanya mencakup Buyut Maskar sebagai pendiri, Lina Herlina, dan Tata Suharta, S.E. sebagai Pj Kepala Desa sejak Mei 2025).

## Mengaktifkan formulir kontak (opsional)

Karena hosting gratis di bawah ini bersifat statis (tidak ada server), formulir kontak butuh layanan pihak ketiga agar bisa mengirim email, contohnya **Formspree** (gratis untuk pemakaian dasar):

1. Daftar di https://formspree.io lalu buat form baru, salin URL endpoint yang diberikan (bentuknya `https://formspree.io/f/xxxxxxx`).
2. Di `index.html`, cari `<form id="contactForm" action="#" method="post">` dan ganti `action="#"` menjadi `action="https://formspree.io/f/xxxxxxx"`.

Alternatif paling sederhana tanpa layanan tambahan: hapus formulir dan cukup andalkan tombol telepon/email yang sudah ada di bagian Kontak.

## Hosting gratis — pilih salah satu

**Opsi termudah (drag & drop, tanpa akun Git): Netlify Drop**
1. Buka https://app.netlify.com/drop
2. Seret (drag) folder `desa-cihirup` ke halaman tersebut.
3. Situs langsung online dengan alamat acak (mis. `nama-acak.netlify.app`); bisa diganti nama di pengaturan situs setelah membuat akun gratis.

**Opsi paling umum untuk jangka panjang: GitHub Pages**
1. Buat akun gratis di https://github.com jika belum punya.
2. Buat repository baru, misalnya `desa-cihirup`.
3. Unggah ketiga file (`index.html`, `style.css`, `script.js`) ke repository tersebut (bisa lewat tombol "Add file → Upload files" di web, tanpa perlu command line).
4. Buka tab **Settings → Pages** di repository, pada bagian "Source" pilih branch `main` folder `/root`, lalu simpan.
5. Setelah beberapa menit, situs aktif di `https://<username-github>.github.io/desa-cihirup/`.

**Alternatif lain yang juga gratis selamanya untuk situs statis:** Cloudflare Pages (https://pages.cloudflare.com) dan Vercel (https://vercel.com) — caranya mirip GitHub Pages, tinggal hubungkan repository GitHub.

## Domain sendiri (opsional, berbayar terpisah)

Hosting di atas gratis, tapi memakai alamat bawaan (`.netlify.app`, `.github.io`, dst). Jika desa ingin alamat sendiri seperti `desacihirup.id`, domain perlu dibeli terpisah (biasanya sekitar Rp150–300 ribu/tahun), baru dihubungkan ke hosting gratis tersebut lewat pengaturan DNS.
