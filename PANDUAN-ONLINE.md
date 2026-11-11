# Panduan: menjalankan aplikasi secara online (Supabase + Vercel)

Waktu: sekitar 15 menit. Semua gratis.

## Langkah 1 — Buat database di Supabase
1. Buka https://supabase.com, tekan **Start your project**, lalu daftar (bisa memakai akun GitHub atau email sekolah).
2. Tekan **New project**. Isi:
   - Name: `gp6-lms`
   - Database password: buat sandi yang kuat dan simpan.
   - Region: **Southeast Asia (Singapore)** (paling dekat dengan Indonesia).
3. Tunggu 1–2 menit sampai proyek siap.
4. Di menu kiri, buka **SQL Editor** → **New query**.
5. Buka file `supabase/schema.sql` dari folder aplikasi, salin **seluruh** isinya, tempel, lalu tekan **Run**. Hasilnya harus "Success. No rows returned".
6. Buka **Project Settings → API** (atau tombol **Connect**). Salin dua hal:
   - **Project URL** (contoh `https://abcdefgh.supabase.co`)
   - **anon public key** / **publishable key** (teks panjang)
   Kunci ini memang dirancang untuk dipasang di aplikasi; jangan bagikan kunci **service_role / secret**.

## Langkah 2 — Masukkan kunci ke aplikasi
Buka `js/config.js` dan isi:
```js
window.GP_CONFIG = {
  supabaseUrl: "https://abcdefgh.supabase.co",
  supabaseAnonKey: "eyJhbGciOi...",
};
```
(Atau kirimkan Project URL dan anon key ke Claude, nanti Claude yang mengisinya.)

## Langkah 3 — Pasang di Vercel
1. Buat repository kosong di GitHub (mis. `gp6-lms`), lalu unggah seluruh isi folder aplikasi (atau minta Claude yang mengunggahnya).
2. Buka https://vercel.com → daftar dengan akun GitHub yang sama.
3. Tekan **Add New… → Project**, pilih repository `gp6-lms`, tekan **Deploy**. Tidak ada pengaturan yang perlu diubah.
4. Setelah selesai, Vercel memberi link seperti `https://gp6-lms.vercel.app`. Link inilah yang dibagikan ke siswa.

## Langkah 4 — Mulai dipakai
1. Buka link aplikasi → **Guru → Daftar** → buat akun guru.
2. Buat kelas (mis. "Kelas 6A"). Anda mendapat kode kelas, misalnya `GP6-AB12`.
3. Buka **Kelola siswa** → tempel daftar nama siswa (satu per baris) → **Tambahkan**.
4. Tekan **Cetak kartu login** dan bagikan kartu ke siswa.
5. Siswa membuka link yang sama, mengisi kode kelas, memilih nama, dan memasukkan PIN.

## Keamanan yang sudah disiapkan
- Tabel database terkunci; aplikasi hanya bisa memakai fungsi khusus yang memeriksa siapa yang login.
- Siswa hanya bisa melihat dan menyimpan progresnya sendiri. Guru hanya bisa melihat siswa di kelasnya sendiri.
- Kata sandi guru disimpan dalam bentuk terenkripsi (bcrypt).
- Setelah 5 kali salah PIN atau sandi, login dikunci 5 menit.
- Saat guru membuat PIN baru, siswa tersebut otomatis keluar dari semua perangkat.
- Catatan: siapa pun yang tahu kode kelas bisa melihat daftar nama siswa di kelas itu (diperlukan untuk memilih nama saat login), tetapi tidak bisa masuk tanpa PIN.

## Catatan Supabase gratis
Proyek gratis akan "tidur" bila tidak dipakai selama 7 hari. Jika itu terjadi (misalnya saat libur), buka dashboard Supabase dan tekan **Restore project**. Data tidak hilang.
