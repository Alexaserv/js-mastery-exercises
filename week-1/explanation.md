# Urutan Pengerjaan

Urutan pengerjaan yang paling aman adalah **bottom-up** (fondasi → logika → CLI).

## Struktur Folder

```text
task-cli/
│
├── package.json
├── tsconfig.json
├── tasks.json              ← otomatis dibuat jika belum ada
│
├── src/
│   ├── index.ts            ← Entry Point CLI
│   ├── task-manager.ts     ← Business Logic
│   └── types.ts            ← Interface/Type
│
├── dist/                   ← hasil build TypeScript
│
├── node_modules/
│
└── .gitignore
```

---

# Tahap 1 — Inisialisasi Project (WAJIB)

Kerjakan terlebih dahulu.

```
package.json
```

berisi

* nama project
* scripts
* dependencies
* devDependencies

Install

```
typescript
ts-node
@types/node
chalk
```

Lalu buat

```
tsconfig.json
```

Setelah dua file ini selesai baru project bisa di-compile.

---

# Tahap 2 — Buat Struktur Data

File pertama di dalam folder `src`.

```
src/types.ts
```

File ini hanya berisi interface.

Misalnya

```
Task
```

dengan properti seperti

* id
* title
* completed
* createdAt

Tidak ada logika sama sekali.

Kenapa?

Karena file lain akan memakai type ini.

---

# Tahap 3 — Bangun Business Logic (Paling Besar)

Sekarang buat

```
src/task-manager.ts
```

Inilah inti project.

Di sinilah seluruh operasi file dilakukan.

Urutan implementasinya saya sarankan:

### 1. Tentukan lokasi file

```
tasks.json
```

menggunakan

```
path
```

---

### 2. Buat helper

Misalnya

```
readTasks()
```

Fungsi ini

* membaca file
* parse JSON
* kalau file belum ada
* return []

---

### 3. Buat helper

```
writeTasks()
```

yang bertugas

* stringify JSON
* simpan ke file

---

### 4. Baru buat fitur

secara berurutan

```
addTask()
```

↓

```
listTasks()
```

↓

```
completeTask()
```

↓

```
deleteTask()
```

↓

```
clearTasks()
```

Semua fungsi menggunakan helper

```
readTasks()

writeTasks()
```

jadi tidak ada kode yang berulang.

---

# Tahap 4 — Entry Point CLI

Baru sekarang kerjakan

```
src/index.ts
```

Tugas file ini hanya:

* membaca command

```
process.argv
```

* validasi argument

* memanggil

```
TaskManager
```

* menampilkan output menggunakan

```
chalk
```

Jadi

```
index.ts
```

tidak boleh berisi logika membaca file.

Semua logika ada di

```
task-manager.ts
```

---

# Tahap 5 — Error Handling

Tambahkan penanganan error setelah semua fitur selesai.

Contohnya

* ID tidak ditemukan

```
Task dengan ID 5 tidak ditemukan
```

---

Task kosong

```
Belum ada task
```

---

tasks.json belum ada

otomatis buat.

---

JSON rusak

beri pesan error.

---

Input kurang

misalnya

```
add
```

tanpa judul task.

---

# Tahap 6 — Testing Manual

Jalankan satu per satu.

```
npm run dev add "Belajar TS"
```

↓

```
npm run dev list
```

↓

```
npm run dev complete 1
```

↓

```
npm run dev delete 1
```

↓

```
npm run dev clear
```

---

# Tahap 7 — Build Production

Pastikan

```
npm run build
```

menghasilkan

```
dist/
    index.js
    task-manager.js
    types.js
```

Lalu jalankan

```
npm start list
```

atau

```
node dist/index.js list
```

---

# Dependency Antar File

Diagram berikut menunjukkan alur ketergantungan sehingga Anda tahu file mana yang harus selesai lebih dulu.

```text
                package.json
                      │
                      ▼
               tsconfig.json
                      │
                      ▼
                 src/types.ts
                      │
                      ▼
            src/task-manager.ts
             │      │       │
             │      │       │
             ▼      ▼       ▼
       fs/promises  path   chalk (opsional untuk pesan)
             │
             ▼
          tasks.json
                      ▲
                      │
                      ▼
                src/index.ts
                      │
                      ▼
               process.argv
                      │
                      ▼
              Terminal (CLI)
```

Urutan ini meminimalkan konflik dan error kompilasi karena setiap file dibangun di atas fondasi yang sudah tersedia. Setelah `types.ts` selesai, Anda dapat fokus pada `task-manager.ts` hingga semua operasi data berfungsi, baru kemudian membuat antarmuka CLI di `index.ts`.
