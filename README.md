# FastLink

Link shortener sederhana dengan redirect langsung.

## Jalankan di komputer

1. Install Node.js 18 atau lebih baru.
2. Ekstrak folder project.
3. Buka terminal di folder `fastlink`.
4. Jalankan:

```bash
npm install
npm start
```

5. Buka `http://localhost:3000`.

## Deploy agar bisa dipakai publik

Deploy project ini ke layanan hosting Node.js yang mendukung persistent disk/storage. Atur start command ke `npm start`, lalu hubungkan domain sendiri (misalnya `fastlink.example.com`).

**Penting:** file `links.json` menyimpan semua pemetaan URL. Hosting harus menyediakan penyimpanan persisten agar short link tidak hilang saat aplikasi restart atau redeploy. Untuk penggunaan ramai/multi-instance, ganti penyimpanan JSON dengan database.

## Catatan keamanan

- Hanya menerima URL `http` dan `https`.
- Siapa pun yang memiliki short link dapat menggunakannya untuk redirect. Jangan gunakan untuk menyamarkan tautan berbahaya atau menipu pengunjung.
- Tambahkan rate limiting, moderasi, dan perlindungan spam sebelum membuka layanan ke publik.
