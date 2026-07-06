//1. Implementasi deepClone
//Fungsi deepClone membutuhkan Generics (<T>) agar TypeScript mengetahui bahwa tipe data yang dikembalikan sama persis dengan tipe data yang dimasukkan. Kita juga perlu menangani primitives, Array, Date, dan Object.
function deepClone<T>(obj: T): T {
  // Tangani primitive values (string, number, boolean) dan null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Tangani tipe Date
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }

  // Tangani tipe Array
  if (Array.isArray(obj)) {
    // Rekursi untuk setiap elemen di dalam array
    return obj.map(item => deepClone(item)) as any;
  }

  // Tangani Object biasa
  const clonedObj = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Rekursi untuk menyalin properti bersarang (nested properties)
      clonedObj[key] = deepClone(obj[key]);
    }
  }

  return clonedObj;
}

// Contoh Penggunaan:
const original = { a: 1, b: { c: 2 }, d: [3, 4], date: new Date() };
const clone = deepClone(original);
clone.b.c = 99; // Hanya akan mengubah clone, tidak original

//2. Implementasi debounce dan throttle
// Kedua fungsi ini sangat bergantung pada konsep closures dan Higher-Order Functions. Dalam TypeScript, kita menggunakan Parameters<T> untuk mengekstrak tipe argumen dari fungsi asli agar type-safety tetap terjaga.
// Debounce
// Fungsi debounce menunda eksekusi fungsi sampai periode waktu tertentu berlalu sejak pemanggilan terakhir. Sangat cocok untuk search input.
function debounce<T extends (...args: any[]) => void>(
  func: T, 
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    // Jika fungsi dipanggil lagi sebelum waktu 'wait' habis, batalkan timer sebelumnya
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    // Set timer baru
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

// Contoh Penggunaan:
const search = debounce((query: string) => console.log(`Searching for ${query}`), 500);
// Throttle
// Fungsi throttle membatasi eksekusi fungsi agar hanya berjalan maksimal satu kali dalam setiap jeda waktu tertentu. Sangat cocok untuk window resize atau scroll events.
function throttle<T extends (...args: any[]) => void>(
  func: T, 
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function (...args: Parameters<T>) {
    // Jika tidak sedang dalam masa "throttle", jalankan fungsi
    if (!inThrottle) {
      func(...args);
      inThrottle = true; // Kunci fungsi
      
      // Buka kunci setelah waktu limit berlalu
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Contoh Penggunaan:
const onScroll = throttle(() => console.log('Scrolled!'), 1000);

//3. Custom EventEmitter Class
// Kita menggunakan Record<string, Listener[]> di TypeScript untuk mendefinisikan dictionary dari event names (sebagai kunci) yang berisi kumpulan fungsi/callback (sebagai nilai).
// Mendefinisikan tipe untuk fungsi callback
type Listener = (...args: any[]) => void;

class EventEmitter {
  // Menyimpan daftar event dan pendengarnya (listeners)
  private events: Record<string, Listener[]> = {};

  // Mendaftarkan listener ke sebuah event
  on(eventName: string, listener: Listener): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  // Menghapus listener dari sebuah event
  off(eventName: string, listenerToRemove: Listener): void {
    if (!this.events[eventName]) return;
    
    this.events[eventName] = this.events[eventName].filter(
      (listener) => listener !== listenerToRemove
    );
  }

  // Memanggil semua listener yang terdaftar pada sebuah event
  emit(eventName: string, ...args: any[]): void {
    if (!this.events[eventName]) return;
    
    this.events[eventName].forEach((listener) => {
      listener(...args);
    });
  }
}

// Contoh Penggunaan:
const emitter = new EventEmitter();
const onUserLogin = (user: string) => console.log(`User ${user} logged in!`);

emitter.on('login', onUserLogin);
emitter.emit('login', 'Yunas'); // Output: User Yunas logged in!
emitter.off('login', onUserLogin);