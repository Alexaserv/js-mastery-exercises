# Memahami Scope, Hoisting, dan Temporal Dead Zone (TDZ)

Dalam ekosistem JavaScript dan TypeScript, deklarasi variabel sangat memengaruhi bagaimana memori dialokasikan dan kapan sebuah variabel bisa diakses.

## 1. `var` (Function Scope & Hoisted)
Variabel yang dideklarasikan dengan `var` bersifat **Function Scoped** (atau *globally scoped* jika di luar fungsi). Ia tidak peduli pada blok `{ ... }` seperti `if` atau `for`.
`var` juga mengalami **Hoisting** dan diinisialisasi dengan nilai `undefined` saat tahap kompilasi memori.

```javascript
console.log(nama); // Output: undefined (Tidak Error, hanya undefined)
var nama = "Budi";

if (true) {
  var usia = 30;
}
console.log(usia); // Output: 30 (Bisa diakses dari luar blok if)

## 2. `let` dan `const` (Block Scope & TDZ)
let dan const bersifat Block Scoped. Artinya, mereka hanya hidup dan dapat diakses di dalam kurung kurawal { ... } tempat mereka dideklarasikan.
Meskipun keduanya tetap di-hoist (diangkat ke atas scope), mereka TIDAK diinisialisasi dengan undefined. Area waktu antara awal blok dieksekusi hingga deklarasi sebenarnya disebut Temporal Dead Zone (TDZ).

Perbedaan let dan const:
let: Nilainya dapat di-assign ulang (mutable binding).

const: Nilainya harus diinisialisasi saat deklarasi dan tidak dapat di-assign ulang (immutable binding), meskipun properti objek/array di dalamnya tetap bisa diubah (mutated).
// Contoh Block Scope
if (true) {
  let kota = "Jakarta";
  const negara = "Indonesia";
}
// console.log(kota); // Error: kota is not defined

// Contoh Temporal Dead Zone (TDZ)
console.log(pekerjaan); // ReferenceError: Cannot access 'pekerjaan' before initialization
let pekerjaan = "Developer";
// Pada baris 1, 'pekerjaan' ada di dalam TDZ. Mesin tahu variabel ini ada, tapi kita dilarang menyentuhnya sampai baris inisialisasi dieksekusi.