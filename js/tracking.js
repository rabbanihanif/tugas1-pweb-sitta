document.addEventListener('DOMContentLoaded', function () {

  const trackingForm = document.getElementById('trackingForm');
  const doNumberInput = document.getElementById('doNumber');
  const doError = document.getElementById('doError');
  const trackingResult = document.getElementById('trackingResult');

  // untuk submit form
  trackingForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Mencegah reload
    doError.textContent = ''; // Reset pesan error
    trackingResult.innerHTML = ''; // Kosongkan hasil sebelumnya

    const inputDo = doNumberInput.value.trim().toUpperCase();

    if (inputDo === '') {
      doError.textContent = 'Nomor DO wajib diisi.';
      return;
    }

    // Cari data berdasarkan nomor DO di dataTracking
    const result = dataTracking[inputDo];

    if (result) {
      // Buat HTML hasil
      const resultHTML = `
        <div class="card-details">
          <h3>Data Mahasiswa</h3>
          <p><strong>Nama:</strong> ${result.nama}</p>
          <p><strong>Nomor DO:</strong> ${result.nomorDO}</p>

          <h3>Informasi Pengiriman</h3>
          <p><strong>Status:</strong> ${result.status}</p>
          <p><strong>Ekspedisi:</strong> ${result.ekspedisi}</p>
          <p><strong>Tanggal Kirim:</strong> ${result.tanggalKirim}</p>
          <p><strong>Jenis Paket:</strong> ${result.paket}</p>
          <p><strong>Total Pembayaran:</strong> ${result.total}</p>
        </div>
        <br>
        <h3>Perjalanan Paket</h3>
        ${generateStatusTable(result.perjalanan)}
      `;

      trackingResult.innerHTML = resultHTML;
    } else {
      trackingResult.innerHTML = '<p style="color:red; font-weight:bold;">Nomor Delivery Order tidak ditemukan.</p>';
    }
  });

  // Fungsi bantu untuk membuat tabel perjalanan
  function generateStatusTable(perjalananArray) {
    let tableHTML = '<table>';
    tableHTML += '<thead><tr><th>Tanggal</th><th>Waktu</th><th>Keterangan</th></tr></thead>';
    tableHTML += '<tbody>';

    perjalananArray.forEach(item => {
      const [tanggal, waktu] = item.waktu.split(' ');
      tableHTML += `
        <tr>
          <td>${tanggal}</td>
          <td>${waktu}</td>
          <td>${item.keterangan}</td>
        </tr>
      `;
    });

    tableHTML += '</tbody></table>';
    return tableHTML;
  }

});

