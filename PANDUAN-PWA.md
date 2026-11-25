# Instal di HP dan pop up pembaruan

Ketiga aplikasi (Dashboard Analisa Homeconnect, Form Daily Report Sales Internal, Form Follow Up Isolir Mitra) sekarang bisa **diinstal sebagai aplikasi** di HP (bukan sekadar pintasan) dan menampilkan **pop up pembaruan**.

## File yang harus ada di GitHub Pages (satu folder)
Upload semua file berikut, menimpa yang lama:
- `index.html`, `sales.html`, `form.html`
- `version.json` (daftar nomor versi; **wajib ikut diupload setiap ada pembaruan**)
- `sw.js`, `manifest-dashboard.webmanifest`
- Ikon: `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` (Starlite, form follow up mitra), `dash-icon-192.png`, `dash-icon-512.png`, `dash-icon-512-maskable.png`, `dash-apple-touch-180.png` (dashboard) dan `sales-icon-192.png`, `sales-icon-512.png`, `sales-icon-512-maskable.png`, `sales-apple-touch-180.png` (Daily Report Sales)
- `.nojekyll`

## Cara instal
- **Android (Chrome):** tombol **Instal di HP** muncul di aplikasi (dashboard: menu samping atau header; form: pojok atas). Tekan, lalu **Instal**. Bila tombol belum muncul: menu **⋮ > Instal aplikasi**.
- **iPhone/iPad (Safari):** iOS tidak menyediakan tombol instal otomatis. Buka di **Safari**, ketuk **Bagikan > Tambah ke Layar Utama**. Tombol **Instal di HP** menampilkan langkahnya.
- **Komputer (Chrome/Edge):** ikon instal di kolom alamat.
- Setelah terinstal, tombol instal hilang otomatis.

## Pop up pembaruan
- **Pembaruan aplikasi:** bila Anda mengupload `index.html`/`sales.html`/`form.html` baru beserta `version.json`, pengguna yang sedang membuka aplikasi melihat pop up **Pembaruan aplikasi tersedia > Perbarui**. Pengecekan saat dibuka, tiap 4 menit, dan saat kembali ke aplikasi.
- **Pembaruan data:** bila data di server dibuat ulang, muncul pop up **Data terbaru tersedia > Perbarui data**. Data dimuat tanpa menutup halaman, jadi isian yang sedang dikerjakan tidak hilang.
- **Jeda pop up data:** paling cepat **40 menit sekali**, dihitung sejak data terakhir dimuat atau sejak tombol **Perbarui data** ditekan. **Nanti** pada pop up data juga menunda 40 menit; pada pop up aplikasi 30 menit. Pop up pembaruan aplikasi menunggu bila masih ada proses berjalan (misalnya foto yang belum terunggah).
- Aplikasi tidak menyimpan cache halaman atau data, jadi tidak ada versi lama yang tertahan.

## Ikon aplikasi
- Dashboard: panel grafik batang naik dengan lencana sinyal internet (biru-hijau).
- Daily Report Sales: papan laporan bercentang dengan bintang Starlite (biru).
- Form follow up mitra: logo Starlite.

## Daily Report Sales: link
Ikon khusus berupa papan laporan bercentang dengan bintang Starlite. Aplikasi yang diinstal dari link `sales.html?t=TOKEN` membawa token itu di alamat awalnya, jadi tidak perlu membuka link WhatsApp lagi.

## Layar tunggu saat membuka
Saat pertama dibuka, ketiga aplikasi menampilkan layar **Mohon menunggu data sedang di ambil dan di perbarui** dengan progress bar dan persentase sampai data siap.
