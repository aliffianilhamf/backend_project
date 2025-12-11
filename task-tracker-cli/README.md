# Task Tracker CLI

Aplikasi CLI sederhana untuk mengelola tugas (task) yang ditulis dalam TypeScript. Aplikasi ini memungkinkan Anda untuk menambah, mengupdate, menghapus, dan mengelola status tugas melalui command line interface.

## Fitur

- Menambah tugas baru.
- Mengupdate deskripsi tugas.
- Menghapus tugas.
- Mengubah status tugas (todo, in-progress, done).
- Menampilkan daftar tugas dengan filter status.
- Penyimpanan data dalam format JSON.

## Instalasi

1. Clone repository atau download source code
2. Install dependencies:

```bash
npm install
```

3. Compile TypeScript ke JavaScript:

```bash
npm run build
```

4. Buat file executable dapat dijalankan:

```bash
chmod +x task-cli
```

## Penggunaan

### Syntax Umum

```bash
task-cli <command> [arguments]
```

### Perintah yang Tersedia

#### 1. Menambah Tugas Baru

```bash
task-cli add "<deskripsi tugas>"
```

**Contoh:**

```bash
task-cli add "Belajar TypeScript"
task-cli add "Membuat dokumentasi API"
```

#### 2. Mengupdate Tugas

```bash
task-cli update <id> "<deskripsi baru>"
```

**Contoh:**

```bash
task-cli update 1 "Belajar TypeScript dan Node.js"
```

#### 3. Menghapus Tugas

```bash
task-cli delete <id>
```

**Contoh:**

```bash
task-cli delete 1
```

#### 4. Mengubah Status Tugas

##### Mark as In Progress

```bash
task-cli mark-in-progress <id>
```

##### Mark as Done

```bash
task-cli mark-done <id>
```

**Contoh:**

```bash
task-cli mark-in-progress 1
task-cli mark-done 2
```

#### 5. Menampilkan Daftar Tugas

##### Tampilkan Semua Tugas

```bash
task-cli list
```

##### Tampilkan Tugas Berdasarkan Status

```bash
task-cli list todo
task-cli list in-progress
task-cli list done
```

### Status Tugas

Aplikasi ini mendukung 3 status tugas:

- `todo` - Tugas yang belum dikerjakan (ditampilkan dengan ikon `[ ]`)
- `in-progress` - Tugas yang sedang dikerjakan (ditampilkan dengan ikon `[~]`)
- `done` - Tugas yang sudah selesai (ditampilkan dengan ikon `[✓]`)

## Struktur Data

Aplikasi menyimpan data tugas dalam file `tasks.json` dengan struktur sebagai berikut:

```json
{
  "tasks": [
    {
      "id": 1,
      "description": "Belajar TypeScript",
      "status": "todo",
      "createdAt": "2025-12-11T10:30:00.000Z",
      "updatedAt": "2025-12-11T10:30:00.000Z"
    }
  ],
  "nextId": 2
}
```

### Field Penjelasan:

- `id`: ID unik untuk setiap tugas (auto-increment)
- `description`: Deskripsi tugas
- `status`: Status tugas (todo/in-progress/done)
- `createdAt`: Waktu pembuatan tugas (ISO string)
- `updatedAt`: Waktu terakhir tugas diupdate (ISO string)
- `nextId`: ID yang akan digunakan untuk tugas berikutnya

## Contoh Penggunaan

```bash
# Menambah beberapa tugas
task-cli add "Membaca dokumentasi TypeScript"
task-cli add "Mengerjakan project CLI"
task-cli add "Review kode dengan tim"

# Melihat semua tugas
task-cli list

# Mulai mengerjakan tugas dengan ID 1
task-cli mark-in-progress 1

# Menyelesaikan tugas dengan ID 1
task-cli mark-done 1

# Melihat hanya tugas yang sudah selesai
task-cli list done

# Update deskripsi tugas
task-cli update 2 "Mengerjakan project CLI dengan fitur tambahan"

# Menghapus tugas
task-cli delete 3
```

## Struktur File

```
task-tracker-cli/
├── src/
│   ├── index.ts          # File utama aplikasi
│   └── tasks.json        # File penyimpanan data (dibuat otomatis)
├── scripts/
│   └── add-shebang.js    # Script untuk menambah shebang
├── package.json          # Dependencies dan scripts npm
├── tsconfig.json         # Konfigurasi TypeScript
├── task-cli              # File executable (hasil build)
└── README.md            # Dokumentasi ini
```

## Teknologi yang Digunakan

- **TypeScript**: Bahasa pemrograman utama
- **Node.js**: Runtime environment
- **File System (fs)**: Untuk operasi file
- **Path**: Untuk mengelola path file

## Error Handling

Aplikasi dilengkapi dengan error handling yang komprehensif:

- Validasi input pengguna
- Penanganan file tidak ditemukan
- Penanganan ID tugas yang tidak valid
- Pesan error yang informatif

## Kontribusi

Jika Anda ingin berkontribusi pada project ini:

1. Fork repository
2. Buat branch baru untuk fitur Anda
3. Commit perubahan Anda
4. Push ke branch
5. Buat Pull Request

## Lisensi

Project ini bebas digunakan untuk keperluan pembelajaran dan pengembangan.

---
