# Panduan deploy perubahan terbaru

Ada 2 bagian yang harus diperbarui: **GitHub Pages** (file halaman) dan **Apps Script** (Code.gs). Lakukan berurutan.

## Isi paket ini
| File | Tujuan |
|---|---|
| `index.html` | Dashboard Analisa Broadcast Isolir (admin) |
| `form.html` | Form Laporan Follow Up Pelanggan (mitra) |
| `sw.js` | BARU. Service worker untuk push notifikasi dan instal di HP |
| `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` | BARU. Ikon aplikasi Starlite |
| `apps-script/Code.gs` | Kode Apps Script terbaru |
| `apps-script/PETUNJUK.md` | Panduan teknis lengkap |

## Langkah 1. GitHub Pages
1. Buka repositori GitHub Pages dashboard Anda, lalu **Add file > Upload files**.
2. Seret **7 file** ini (dari folder paket, bukan dari `apps-script`): `index.html`, `form.html`, `sw.js`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`. Semua harus berada di folder yang sama (root, sejajar dengan `index.html` lama).
3. Pilih **Commit changes**. Tunggu 1 sampai 2 menit sampai GitHub Pages selesai.
4. Buka dashboard, tekan **Ctrl+F5** (di HP: tutup tab lalu buka lagi).

## Langkah 2. Apps Script
1. Buka proyek Apps Script dashboard.
2. Buka file `Code.gs`, **hapus seluruh isinya**, tempel seluruh isi `apps-script/Code.gs` dari paket, lalu **Simpan**. Jangan ubah kata sandi/kunci apa pun: nilainya tersimpan di Properti Skrip, bukan di kode.
3. **Deploy > Kelola deployment > ikon pensil > Versi: Versi baru > Deploy.** Alamat /exec tetap sama.
4. Pilih fungsi **setupPush** di bar atas editor, klik **Jalankan**, dan izinkan akses yang diminta (Mengelola pemicu / layanan eksternal). Ini membuat jadwal push **08.00 dan 15.00 WIB**.
5. Pilih fungsi **syncTokens** lalu klik **Jalankan** (sekali saja). Ini mengaktifkan jalur cepat: form memuat data langsung dari server dengan sangat cepat. Tanpa langkah ini form tetap jalan, hanya masih lambat seperti sebelumnya.
6. (Opsional, uji) pilih fungsi **fuPushPagi**, klik **Jalankan**, lihat hasil di **Log eksekusi**.

## Langkah 3. Cek hasilnya
- Dashboard admin: menu baru **Analisis Pelanggan Tidak Bersedia**; di **Hasil Follow Up Mitra** tombol Audit stasiun menyesuaikan pembagian baru.
- Form mitra: ikon lonceng di header; menu Hasil Follow Up, Analisis Tidak Berlangganan, dan Peringkat Mitra (grafik line + peringkat petugas).
- HP Android: buka link form mitra di Chrome, tekan lonceng, **Aktifkan notifikasi HP**, lalu **Instal dashboard di HP**.

## Daftar perubahan
1. **Menu Dismantled** kini berisi dismantled + dismantling. Menu RTD hanya ready to dismantle.
2. **Analisis Pelanggan Tidak Bersedia** (admin dan mitra): kelompok alasan, grafik, analisis dan rekomendasi (di paling bawah), daftar, Excel.
3. **Form laporan:** status Tidak bersedia lanjut wajib memilih kelompok alasan (tersimpan di Drive).
4. **Menu Hasil Follow Up** (mitra): per stasiun, per pelanggan, plus daftar semua pelanggan yang sudah di-follow up.
5. **Peringkat Mitra:** grafik akumulatif 5 mitra teratas, 10 besar petugas produktif, 10 besar petugas dengan aktif kembali.
6. **Notifikasi:** lonceng di header, push ke HP (08.00 dan 15.00 WIB), instal sebagai aplikasi.
7. **Tampilan seluler admin** diperbaiki (tidak lagi melebar).

## Yang TIDAK perlu Anda lakukan
- Server data (Node di 110.239.85.120) sudah saya perbarui: layanan push sudah aktif di sana.
- Jangan hapus file `vapid.json` dan `push-subs.json` di server (`~/isolir-data-api`).

## Bila ada masalah
- Lonceng tidak ada / menu lama tampil: cache. Tekan Ctrl+F5, atau buka dengan tambahan `&v=2` di alamat.
- Push tidak masuk: pastikan `setupPush` sudah dijalankan dan mitra sudah menekan **Aktifkan notifikasi HP**. iPhone butuh iOS 16.4+ dan dashboard diinstal ke Layar Utama dulu.
- Grafik peringkat petugas kosong: Apps Script belum di-deploy **Versi baru**.