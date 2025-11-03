document.addEventListener('DOMContentLoaded', function () {
  
  // ===== 1. Gatekeeper: Cek Status Login (Perbaikan Bug Kritis) =====
  // Ini harus dijalankan pertama kali.
  const loginStatus = sessionStorage.getItem('isLoggedIn');
  
  if (loginStatus !== 'true') {
    // BUG FIX: Arahkan ke index.html (login), bukan dashboard.html
    // Jika tidak, ini akan menyebabkan infinite refresh loop.
    window.location.replace('index.html');
    // window.location.replace('dashboard.html');
    return; // Hentikan eksekusi skrip jika belum login
  }

  // ===== 2. Seleksi Elemen DOM =====
  // Kumpulkan semua seleksi elemen di satu tempat agar rapi.
  const userEmailDisplay = document.getElementById('userEmailDisplay');
  const greetingEl = document.getElementById('greeting');
  const logoutBtn = document.getElementById('logoutBtn');

  // ===== 3. Fungsi Helper untuk Greeting =====
  // Memisahkan logika murni (logic) dari manipulasi DOM (view).
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 11) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  }

  // ===== 4. Inisialisasi Halaman & Tampilkan Data =====
  
  // Tampilkan email user (dengan pengecekan jika elemen ada)
  if (userEmailDisplay) {
    userEmailDisplay.textContent = sessionStorage.getItem('userEmail') || '';
  }

  // Tampilkan greeting (dihapus try...catch yang tidak perlu)
  if (greetingEl) {
    greetingEl.textContent = getGreeting();
  }

  // ===== 5. Event Listener untuk Logout =====
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      
      // Gunakan konfirmasi langsung di dalam 'if' agar lebih ringkas
      if (confirm('Yakin ingin logout?')) {
        
        // OPTIMASI: sessionStorage.clear() lebih bersih dan future-proof
        // Ini akan menghapus 'isLoggedIn', 'userEmail', dan item lain
        sessionStorage.clear();
        
        // Kembali ke halaman login
        window.location.replace('index.html');
      }
    });
  } else {
    // Peringatan ini bagus untuk debugging
    console.warn("Tombol logout (#logoutBtn) tidak ditemukan.");
  }

});