# scope.md: Memahami var, let, const, Hoisting & TDZ

Di JavaScript, cara kita mendeklarasikan variabel sangat menentukan bagaimana variabel tersebut hidup dan dapat diakses (Scope & Hoisting).

## 1. Scope (Cakupan Akses)
- **`var` (Function Scope):** Variabel `var` tidak peduli dengan block `{}` (seperti `if` atau `for`), ia hanya terkunci di dalam fungsi. Jika dideklarasikan di luar fungsi, ia menjadi global.
- **`let` & `const` (Block Scope):** Keduanya terkunci di dalam block `{}` tempat mereka dideklarasikan.

## 2. Hoisting (Pengangkatan)
Hoisting adalah mekanisme JavaScript yang "mengangkat" deklarasi variabel ke bagian paling atas dari scope-nya sebelum kode dieksekusi.

### Hoisting pada `var`
`var` di-hoist dan **langsung diinisialisasi dengan `undefined`**.
```javascript
console.log(nama); // Output: undefined (Tidak error!)
var nama = "Alice";