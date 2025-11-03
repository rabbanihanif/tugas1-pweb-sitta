document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // reset error
    emailError.textContent = '';
    passwordError.textContent = '';

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    let isValid = true;
    if (email === '') {
      emailError.textContent = 'Email tidak boleh kosong.';
      isValid = false;
    }
    if (password === '') {
      passwordError.textContent = 'Password tidak boleh kosong.';
      isValid = false;
    }
    if (!isValid) return;

    // cari user di dataPengguna
    const user = dataPengguna.find(u => u.email === email && u.password === password);

    if (user) {
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userEmail', user.email);
      sessionStorage.setItem('userName', user.nama);
      sessionStorage.setItem('userRole', user.role);

      alert(`Login berhasil! Selamat datang, ${user.nama}`);
      window.location.href = "dashboard.html";
    } else {
      passwordError.textContent = 'Email atau password yang Anda masukkan salah.';
    }
  });
});
