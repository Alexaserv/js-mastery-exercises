//1. Fungsi deepClone
//Fungsi ini menggunakan teknik rekursi. Kita harus berhati-hati dengan tipe data primitif, Array, Object, dan kasus khusus seperti Date atau null (karena typeof null adalah "object" di JavaScript).
function deepClone(obj) {
    // 1. Handle nilai primitif dan null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 2. Handle object Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  // 3. Handle Array
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  // 4. Handle Object murni
  const clonedObj = {};
  for (let key in obj) {
    // Pastikan properti milik object itu sendiri, bukan dari prototype chain
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }

  return clonedObj;
}

// --- Contoh Penggunaan ---
const original = { a: 1, b: { c: 2 }, d: [3, 4], e: new Date() };
const copy = deepClone(original);

copy.b.c = 99; // Mengubah salinan
console.log(original.e); // Output: 2 (Original tidak terpengaruh, ini bukti deep clone berhasil)

//2. Fungsi Implementasi debounce dan throttle
//Keduanya menggunakan Closure untuk menyimpan referensi waktu antar pemanggilan fungsi.
//Debounce: Menunda eksekusi fungsi sampai pengguna berhenti melakukan aksi selama waktu tertentu (cocok untuk search bar).
//Throttle: Memaksa sebuah fungsi untuk dieksekusi maksimal satu kali dalam rentang waktu tertentu (cocok untuk scroll atau resize event).
// --- DEBOUNCE ---
function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    const context = this;
    
    // Jika fungsi dipanggil lagi sebelum delay habis, batalkan timer sebelumnya
    clearTimeout(timeoutId);
    
    // Buat timer baru
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

// --- THROTTLE ---
function throttle(func, limit) {
  let inThrottle;
  
  return function(...args) {
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args); // Eksekusi fungsi
      inThrottle = true;         // Kunci eksekusi
      
      // Buka kunci setelah waktu limit habis
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

//3. Custom Event Emitter class
//Kelas ini menggunakan Map untuk menyimpan event dan listener-nya. Kita bisa menambahkan, menghapus, dan memicu event dengan mudah.
class EventEmitter {
  constructor() {
    this.events = {};
  }

  // Mendaftarkan listener ke sebuah event
  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  // Menghapus spesifik listener dari sebuah event
  off(eventName, listenerToRemove) {
    if (!this.events[eventName]) return;
    
    this.events[eventName] = this.events[eventName].filter(
      listener => listener !== listenerToRemove
    );
  }

  // Memicu event dan mengirim data (arguments) ke semua listener
  emit(eventName, ...args) {
    if (!this.events[eventName]) return;
    
    this.events[eventName].forEach(listener => {
      listener(...args); // Jalankan setiap fungsi callback
    });
  }
}

// --- Contoh Penggunaan ---
const myEmitter = new EventEmitter();

const greetUser = (name) => console.log(`Hello, ${name}!`);

myEmitter.on('login', greetUser);
myEmitter.emit('login', 'Budi'); // Output: Hello, Budi!

myEmitter.off('login', greetUser);
myEmitter.emit('login', 'Andi'); // Tidak ada output, karena listener sudah dihapus

//4. perbedaan var, let, dan const
// scope.md: Memahami var, let, const, Hoisting & TDZ
// Di JavaScript, cara kita mendeklarasikan variabel sangat menentukan bagaimana variabel tersebut hidup dan dapat diakses (Scope & Hoisting).
//1. Scope (Cakupan Akses)
// `var` (Function Scope): Variabel `var` tidak peduli dengan block `{}` (seperti `if` atau `for`), ia hanya terkunci di dalam fungsi. Jika dideklarasikan di luar fungsi, ia menjadi global.
// `let` & `const` (Block Scope): Keduanya terkunci di dalam block `{}` tempat mereka dideklarasikan.
//2. Hoisting (Pengangkatan)
// Hoisting adalah mekanisme JavaScript yang "mengangkat" deklarasi variabel ke bagian paling atas dari scope-nya sebelum kode dieksekusi.
// Hoisting pada `var`
// `var` di-hoist dan langsung diinisialisasi dengan `undefined`.
// javascript
console.log(nama); // Output: undefined (Tidak error!)
var nama = "Alice";
// 3. Temporal Dead Zone (TDZ)
// TDZ adalah periode antara masuknya scope dan deklarasi variabel. Selama TDZ, variabel tidak dapat diakses.
// Contoh:
{
    // --- Awal Scope (Block) ---
    // TDZ untuk variabel 'umur' dimulai di sini.
    
    //console.log(umur); // ❌ ERROR: Cannot access 'umur' before initialization
    
    let umur = 25; // --- TDZ berakhir di sini ---
    console.log(umur); // ✅ Output: 25
}
// Re-assignment (Penugasan Ulang)
// var: Dapat di-redeclare dan di-hoist, memiliki scope function.
// let: Tidak dapat di-redeclare dalam scope yang sama, memiliki block scope.
// const: Tidak dapat di-redeclare atau di-reassign, memiliki block scope. Namun, jika const adalah object atau array, properti atau elemen dapat diubah.
// Hoisting pada let dan const
// let dan const juga di-hoist, tetapi mereka tidak diinisialisasi. Mencoba mengaksesnya sebelum baris deklarasi akan menyebabkan ReferenceError. Fase "terlarang" ini disebut Temporal Dead Zone (TDZ).
const user = { name: "Bob" };
user.name = "Charlie"; // ✅ Boleh (mutasi properti)
//user = {};             // ❌ TypeError: Assignment to constant variable.
console.log(user.name); // Output: Charlie