![Vercel](https://vercelbadge.vercel.app/api/GesangPJ/KasbonManajer?style=for-the-badge)

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.

# KASBON MANAJER

Aplikasi Manajemen Kasbon pengembangan lebih lanjut dari versi sebelumnya (Kasbon-JS),
menggunakan NextJS 14 Full Stack dengan Database PostgreSQL atau SQLite (akan tersedia di Branch lain).


https://github.com/GesangPJ/KasbonManajer/assets/26625652/bd2fe23c-ba7d-4281-9fc3-c162a7805261



## Fitur Website

1. App Router.
2. Next-Auth untuk Autentikasi.
3. Json Web Token (JWT) untuk mengamankan session.
4. MUI DataGrid untuk penyajian data lebih baik.
5. Multi-Role account, akun terbagi menjadi 2 tipe : Admin dan Karyawan.
6. Bcrypt untuk password hashing.
7. API Protection menggunakan JWT Token Validation.
8. Pages protection menggunakan session.
9. Admin Master Key autentikasi bagi admin untuk mengganti password akun dan data akun.

## Fitur Kasbon

1. Dashboard (Admin & Karyawan).
2. Form tambah kasbon (Karyawan).
3. Halaman Status Request.
4. Halaman Status Bayar.
5. Export kasbon ke PDF, Excel, JSON.
6. Mengambil Laporan Kasbon per Bulan.
7. Menampilkan jumlah total nilai kasbon yang diminta, yang telah disetujui, yang telah lunas, yang belum lunas.
8. Halaman Bantuan yang berisi penjelasan setiap halaman dan bagaimana cara mengirim dan menampilkan data.
9. Edit Data Akun Karyawan.
10. Edit Data Akun Admin.
11. Reset Password Akun Karyawan.
12. Reset Password Akun Admin.

# Container Deploy

Docker compose sudah tersedia. Gunakan sesuai versi image (PostgreSQL / SQLite)
jangan lupa dengan environment variables yang ada.

# Container Image

Container Image tersedia di repository package (ghcr.io)

- kasbon-manager-pg : adalah versi dengan PostgreSQL
- kasbon-manager-sqlite : adalah versi dengan SQLite

## Changelog

### v.1.3.1 Update Patch #5

- Edit Data Admin
- Edit Data Admin API
- Refactor some codes
- Remove Unnecessary files

### v.1.2.7 Update Patch #4

- Add Bantuan page.
- Add Dokumentasi API page.
- Add Tentang Page.
- Sidebar Update.
- Refactor some codes.

### v.1.1.8 Update Patch #3

- Add more page protection.
- Refactor some codes.
- Remove unused files.

### v.1.1.7 Update Patch #2

- Add Reset Password for Karyawan.
- Add Reset Password for Admin.
- Add master Key validation for Admin password reset.

### v.1.0.10 Update Patch #1

- Fix API Endpoint protection error.
- Refactor some codes.

### v.1.0.7PG-Release

- Rilis pertama.
- PostgreSQL Version.
- Semua fitur kasbon (tambah, ganti status, ambil laporan perbulan, export ke pdf ; excel ; json).
