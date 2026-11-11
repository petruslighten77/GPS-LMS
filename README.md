# Aplikasi LMS Global Perspectives Kelas 6 — SD Sinar Bangsa

Aplikasi web untuk materi *Global Perspectives Grade 6 — Student WorkText* (6 unit, 30 pelajaran).

## Cara membuka
- Cepat: klik dua kali `index.html` (Chrome/Edge).
- Untuk dipakai siswa: unggah seluruh folder ini ke hosting statis gratis (Netlify Drop, GitHub Pages, Vercel).

## Akun demo
Tekan "Siapkan kelas demo" di halaman depan.
- Siswa: kode kelas `GP6-DEMO`, nama Ayu Lestari, PIN `1111`
- Guru: `guru@demo.id` / `guru123`

## Fitur
- Siswa: materi per unit (bacaan, gambar, video, thinking tools), kotak jawaban tugas, kuis per unit (49 soal, nilai otomatis), aktivitas interaktif (Fact/Opinion, Push/Pull, Safe/Not safe, rating sumber, pelacak tidur 7 hari, urutan nilai), Reflect & Check, glosarium, halaman nilai.
- Guru: daftar akun, buat kelas (kode otomatis), tambah siswa (PIN otomatis, cetak kartu login), dasbor progres kelas, tugas masuk + penilaian Beginning/Developing/Secure + umpan balik, rubrik Unit Challenge, detail per siswa, catatan guru, cadangan data.

## Mode penyimpanan
- `js/config.js` kosong → **mode demo**: data tersimpan di browser perangkat itu saja.
- `js/config.js` diisi URL & anon key Supabase → **mode online**: siswa belajar dari perangkat masing-masing, guru melihat semuanya.
Langkah lengkap: lihat `PANDUAN-ONLINE.md`. Skrip database: `supabase/schema.sql`.

## Struktur
- `index.html` — halaman utama
- `js/content.js` — seluruh materi & soal kuis (ubah di sini untuk menambah/memperbaiki materi)
- `js/config.js` — alamat & kunci Supabase
- `js/store.js` — penyimpanan data (lokal & Supabase)
- `supabase/schema.sql` — tabel & fungsi database
- `js/app.js` — tampilan & alur aplikasi
- `css/style.css` — gaya tampilan
- `img/` — ilustrasi dari buku
