# GitHub User Activity CLI

Sebuah aplikasi command line interface (CLI) yang dibuat dengan TypeScript untuk menampilkan aktivitas terbaru pengguna GitHub. Program ini mengambil data dari GitHub API dan menampilkan aktivitas dalam format yang mudah dibaca.

## Fitur

- Mengambil aktivitas terbaru pengguna GitHub
- Menampilkan berbagai jenis aktivitas seperti:
  - Push commits ke repository
  - Membuka/menutup issues
  - Starring repositories
  - Membuat branch/tag baru
  - Forking repositories
- Format output yang mudah dibaca dengan timestamp
- Error handling untuk pengguna yang tidak ditemukan
- Menggunakan HTTPS native Node.js tanpa dependensi eksternal

## Prerequisites

Pastikan Anda memiliki:

- Node.js (versi 14 atau lebih tinggi)
- npm atau yarn package manager

## Instalasi

1. Clone atau download repository ini:

```bash
git clone <repository-url>
cd github-user-activity
```

2. Install dependencies:

```bash
npm install
```

3. Build project:

```bash
npm run build
```

## Cara Penggunaan

### Menjalankan dengan ts-node (Development)

```bash
npm start <username>
# atau
npm run github-activity <username>
# atau
npx ts-node src/index.ts <username>
```

### Menjalankan compiled version

```bash
# Setelah build
node dist/index.js <username>
```

### Install globally (Optional)

```bash
npm install -g .
github-activity <username>
```

## Contoh Penggunaan

```bash
# Melihat aktivitas pengguna 'octocat'
npm start octocat

# Output contoh:
Recent activity for GitHub user: octocat

- Pushed 3 commit(s) to octocat/Hello-World at 12/11/2025, 10:30:00 AM
- Starred defunkt/github-markup at 12/11/2025, 9:15:00 AM
- Opened issue #42 in octocat/Spoon-Knife at 12/11/2025, 8:45:00 AM
- Forked example/repository at 12/11/2025, 7:20:00 AM
```

## Jenis Aktivitas yang Didukung

| Jenis Event   | Deskripsi                   | Format Output                          |
| ------------- | --------------------------- | -------------------------------------- |
| `PushEvent`   | Push commits ke repository  | "Pushed X commit(s) to repo-name"      |
| `IssuesEvent` | Membuka atau menutup issues | "Opened/Closed issue #X in repo-name"  |
| `WatchEvent`  | Starring repository         | "Starred repo-name"                    |
| `CreateEvent` | Membuat branch/tag baru     | "Created branch/tag name in repo-name" |
| `ForkEvent`   | Forking repository          | "Forked repo-name"                     |

## Struktur Project

```
github-user-activity/
├── src/
│   └── index.ts          # File utama aplikasi
├── dist/                 # Compiled JavaScript files (setelah build)
├── package.json          # Dependencies dan scripts
├── tsconfig.json         # Konfigurasi TypeScript
└── README.md            # Dokumentasi (file ini)
```

## Scripts yang Tersedia

| Script                               | Deskripsi                        |
| ------------------------------------ | -------------------------------- |
| `npm run build`                      | Compile TypeScript ke JavaScript |
| `npm start <username>`               | Jalankan aplikasi dengan ts-node |
| `npm run github-activity <username>` | Alias untuk menjalankan aplikasi |

## Error Handling

Program menangani berbagai jenis error:

- **User not found (404)**: Ditampilkan ketika username tidak ditemukan
- **Network errors**: Ditampilkan ketika ada masalah koneksi
- **Invalid JSON**: Ditampilkan ketika response dari API tidak valid
- **Missing username**: Ditampilkan ketika tidak ada username yang diberikan

## API yang Digunakan

Program ini menggunakan GitHub API v3:

- **Endpoint**: `https://api.github.com/users/{username}/events`
- **Headers**:
  - `User-Agent: github-activity-cli`
  - `Accept: application/vnd.github.v3+json`

## Teknologi yang Digunakan

- **TypeScript**: Bahasa pemrograman utama
- **Node.js HTTPS**: Untuk HTTP requests tanpa dependensi eksternal
- **GitHub API v3**: Sumber data aktivitas pengguna

## Pengembangan

Untuk berkontribusi atau mengembangkan lebih lanjut:

1. Fork repository ini
2. Buat branch fitur baru: `git checkout -b feature-name`
3. Commit perubahan: `git commit -m 'Add new feature'`
4. Push ke branch: `git push origin feature-name`
5. Buat Pull Request

## Batasan

- Menampilkan maksimal 30 aktivitas terbaru (limitasi GitHub API)
- Membutuhkan koneksi internet untuk mengakses GitHub API
- Rate limiting GitHub API (60 requests per jam untuk unauthenticated requests)

## License

ISC License

## Author

Dibuat sebagai project pembelajaran untuk memahami:

- TypeScript development
- Node.js HTTP requests
- GitHub API integration
- CLI application development

---
