# Dashboard Isolir FTTH

Dashboard satu file (`index.html`) untuk memantau pelanggan FTTH yang diisolir dan hasil blast WhatsApp-nya. Tidak perlu server, build, atau Node.js: cukup file statis yang bisa dipasang di GitHub Pages.

Data dibaca langsung dari Google Sheets (CSV hasil "Publikasikan ke web") oleh browser pengunjung. **Tidak ada data pelanggan yang tersimpan di repositori.**

## Menu

Menu ada di sidebar kiri (di HP dibuka lewat tombol ☰). **Analisa Blast FTTH & IRA** adalah menu utama dan tampil pertama. Tiap menu punya anak menu per kartu yang bisa dibuka atau ditutup lewat tanda panah; klik anak menu untuk langsung menuju kartunya.

| Menu | Isi |
|---|---|
| **Dashboard Isolir FTTH** | Ringkasan isolir, aktivitas harian/mingguan/bulanan, timeline per hari, pencarian dan filter mitra atau stasiun, daftar pelanggan, unduh Excel per hari. |
| **Analisa Blast FTTH & IRA** | Analisa data blast apa adanya dari CSV, tanpa mencocokkan data isolir. Dibagi dua kategori produk berdasarkan channel: **FWA IRA** (IRA - Internet Rakyat, Internet Rakyat, Internet Rakyat Support) dan **FTTH Starlite** (channel lainnya). Angka utama adalah **nomor WhatsApp unik** (satu nomor bisa punya beberapa room; dipakai hasil terbaik). Berisi ringkasan per kategori, **timeline blast per hari** dengan **filter tanggal blast** untuk seluruh halaman, tabel Hasil Blast per Tag (Jumlah dan % dari Total per kategori), kartu **kesimpulan Tag Lain (Layanan)** (tema, jumlah nomor, yang belum selesai, dan saran tindak lanjut), status room, channel, room per jam, agen, dan daftar room. Klik kartu atau angka tabel untuk membuka jendela pop up detail. |
| **Blast FTTH Isolir** | Mencocokkan pelanggan isolir dengan room blast lewat nomor telepon. Kartu ringkasan menampilkan semua status pelanggan yang terjangkau blast, lalu ada timeline blast per hari, tabel respon per tag dan tanggal blast (jumlah dan % dari total per batch), dan daftar follow-up pelanggan **mau lanjut yang masih berstatus isolir**. Klik kartu, hari timeline, atau angka tabel untuk membuka jendela pop up berisi daftar pelanggannya. Semua tabel bisa diunduh sebagai Excel. |

Alamat langsung tiap menu: `#blast`, `#isolir`, `#pencocokan`.

## Pasang di GitHub Pages

### Lewat situs GitHub (tanpa git)

1. Buat repositori baru di GitHub, misalnya `dashboard-isolir`.
2. Klik **Add file → Upload files**, unggah `index.html`, `.nojekyll`, dan `README.md`, lalu **Commit changes**.
3. Buka **Settings → Pages**. Pada **Build and deployment**, pilih **Source: Deploy from a branch**, **Branch: `main`**, folder **`/ (root)`**, lalu **Save**.
4. Tunggu 1–2 menit. Alamat dashboard: `https://NAMA-PENGGUNA.github.io/dashboard-isolir/`.

### Lewat git

```bash
git init
git add index.html .nojekyll README.md
git commit -m "Dashboard isolir FTTH"
git branch -M main
git remote add origin https://github.com/NAMA-PENGGUNA/dashboard-isolir.git
git push -u origin main
```

Lalu lakukan langkah 3 di atas.

## Pengaturan

Buka `index.html` dan ubah bagian `PENGATURAN` di dekat awal skrip:

```js
window.APP_CONFIG = {
  csvUrl: 'https://docs.google.com/spreadsheets/d/e/.../pub?gid=0&single=true&output=csv',
  dataFile: 'data.csv',
  apiUrl: '',
  refreshMinutes: 30
};
```

- **`csvUrl`**: alamat CSV data isolir (**File → Bagikan → Publikasikan ke web**, pilih sheet, format **CSV**).
- **`dataFile`**: cadangan data isolir berupa file CSV di folder yang sama. Dipakai bila alamat di atas gagal. Boleh dikosongkan (`''`).
- **`apiUrl`**: alamat web app Google Apps Script (database bersama, berakhiran `/exec`). Bila diisi, data blast dibaca dari database dan ada menu **Unggah Data Blast** di bawah sidebar (dikunci dengan kata sandi = `WRITE_KEY` di Script properties); hasil unggahan terlihat oleh semua pengunjung. Bila database masih kosong, dipakai `blastCsvUrl`; setelah data dipindahkan `blastCsvUrl` boleh dihapus. Petunjuk pemasangan ada di `apps-script/PETUNJUK.md` (kode di `apps-script/Code.gs`).
- **`refreshMinutes`**: jeda muat ulang otomatis. Isi `0` untuk mematikan. Tombol **Perbarui data** di header memuat ulang kedua data kapan saja.

Kolom CSV isolir: `stasiun`, `mitra`, `customer_code`, `customer_name`, `phone_number`, `customer_status`, `active_at`, `customer_updated_at`. Hanya baris `customer_status = suspend` yang dihitung. `customer_updated_at` ditampilkan sebagai **Tanggal Isolir** dalam waktu WIB (UTC+7).

Kolom CSV blast: `name`, `handler` (nomor telepon), `channel`, `agents`, `status`, `created_at`, `tag`, `note`, `first_response_time_in_seconds`, `resolved_time_in_seconds`, `first_response_time_in_seconds_by_agent`. Format dengan setiap baris dibungkus tanda kutip (seperti ekspor asli) juga terbaca.

## Cara pencocokan dan pengelompokan tag

- **Nomor telepon** dinormalisasi ke bentuk `62…`: awalan `0` atau `8` diubah menjadi `62`, dan angka sisa di depan `62…` (salah ketik pada data isolir) dibuang. Satu pelanggan dianggap terjangkau bila nomornya ada di salah satu room blast.
- **Tag hasil blast** dikelompokkan dari teks tag: `sudah bayar` → Sudah bayar; `tidak mau lanjut` → Tidak mau lanjut (dengan alasan); `mau lanjut` → Mau lanjut; `no respon` → Tidak respon; `reminder h-3/h+1`, `bc billing`, `bc isolir` → Reminder tagihan; tag lain → Tag lain (layanan); kosong → Tanpa tag.
- **Satu hasil per pelanggan**: bila ada beberapa room, dipakai hasil terbaik dengan urutan Sudah bayar, Mau lanjut, Tidak mau lanjut, Tidak respon, Reminder tagihan, Tag lain, Tanpa tag.
- Pelanggan yang sudah membayar dan diaktifkan kembali tidak lagi ada di data isolir, sehingga angka "Sudah bayar" pada pencocokan lebih kecil daripada yang sebenarnya terjadi.

## Penting: data pribadi

Kedua CSV memuat **nama dan nomor HP pelanggan**.

- Halaman GitHub Pages bersifat **publik**: siapa pun yang mengetahui alamatnya bisa melihat nama dan nomor HP pelanggan di dashboard, dan bisa mengunduhnya lewat tombol Excel.
- Alamat CSV di `csvUrl` ikut terlihat di kode halaman. Siapa pun yang membukanya bisa mengunduh seluruh data.
- Repositori privat **tidak** membuat situs Pages menjadi privat, kecuali memakai paket GitHub Enterprise Cloud dengan akses Pages privat.

Bila datanya tidak boleh terbuka untuk umum, jangan pasang di Pages publik. Pilihan yang lebih aman: simpan dan buka `index.html` di komputer sendiri atau jaringan internal, atau pakai hosting yang mendukung kata sandi atau login (misalnya Cloudflare Access).

## Kebutuhan dan catatan

- Perlu koneksi internet: huruf dimuat dari Google Fonts dan pustaka Excel (SheetJS) dari cdnjs saat tombol Excel pertama kali ditekan.
- Jika dashboard menampilkan "Data tidak bisa dimuat": periksa `csvUrl`, pastikan Sheet sudah dipublikasikan ke web, dan pastikan baris berstatus `suspend` ada. Bila hanya data blast yang gagal, menu Blast dan Pencocokan menampilkan pesannya, sedangkan Dashboard Isolir tetap jalan.
- CSV hasil publikasi Google dapat terlambat mengikuti isi Sheet beberapa menit.
- Untuk mencoba di komputer sendiri, sajakan folder ini lewat server lokal (misalnya `python -m http.server`) daripada membuka file langsung dari disk, karena browser sering membatasi `file://`.
