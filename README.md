# Dashboard Isolir FTTH

Dashboard satu file (`index.html`) untuk memantau pelanggan FTTH yang diisolir per hari. Tidak perlu server, build, atau Node.js: cukup file statis yang bisa dibuka langsung atau dipasang di GitHub Pages.

Data dibaca langsung dari Google Sheets (CSV hasil "Publikasikan ke web") oleh browser pengunjung. **Tidak ada data pelanggan yang tersimpan di repositori.**

## Isi paket

| File | Fungsi |
|---|---|
| `index.html` | Seluruh dashboard (HTML, CSS, JavaScript). Pengaturan ada di bagian `PENGATURAN` di atas file. |
| `.nojekyll` | Menyuruh GitHub Pages menyajikan file apa adanya. |
| `README.md` | Petunjuk ini. |

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
  refreshMinutes: 30
};
```

- **`csvUrl`**: alamat CSV dari Google Sheets (**File → Bagikan → Publikasikan ke web**, pilih sheet, format **CSV**).
- **`dataFile`**: cadangan berupa file CSV di folder yang sama. Dipakai bila `csvUrl` gagal. Boleh dikosongkan (`''`).
- **`refreshMinutes`**: jeda muat ulang otomatis. Isi `0` untuk mematikan. Tombol **Perbarui data** di header memuat ulang kapan saja.

Kolom CSV yang dibutuhkan: `stasiun`, `mitra`, `customer_code`, `customer_name`, `phone_number`, `customer_status`, `active_at`, `customer_updated_at`. Hanya baris `customer_status = suspend` yang dihitung. `customer_updated_at` ditampilkan sebagai **Tanggal Isolir** dalam waktu WIB (UTC+7).

## Penting: data pribadi

CSV ini memuat **nama dan nomor HP pelanggan**.

- Halaman GitHub Pages bersifat **publik**: siapa pun yang mengetahui alamatnya bisa melihat nama dan nomor HP pelanggan di dashboard, dan bisa mengunduhnya lewat tombol Excel.
- Alamat CSV di `csvUrl` ikut terlihat di kode halaman. Siapa pun yang membukanya bisa mengunduh seluruh data.
- Repositori privat **tidak** membuat situs Pages menjadi privat, kecuali memakai paket GitHub Enterprise Cloud dengan akses Pages privat.

Bila datanya tidak boleh terbuka untuk umum, jangan pasang di Pages publik. Pilihan yang lebih aman: simpan dan buka `index.html` di komputer sendiri atau jaringan internal, atau pakai hosting yang mendukung kata sandi atau login (misalnya Cloudflare Access).

## Kebutuhan dan catatan

- Perlu koneksi internet: huruf dimuat dari Google Fonts dan pustaka Excel (SheetJS) dari cdnjs saat tombol Excel pertama kali ditekan.
- Jika dashboard menampilkan "Data tidak bisa dimuat": periksa `csvUrl`, pastikan Sheet sudah dipublikasikan ke web, dan pastikan baris berstatus `suspend` ada.
- CSV hasil publikasi Google dapat terlambat mengikuti isi Sheet beberapa menit.
- Untuk mencoba di komputer sendiri, sajakan folder ini lewat server lokal (misalnya `python -m http.server`) daripada membuka file langsung dari disk, karena browser sering membatasi `file://`.
