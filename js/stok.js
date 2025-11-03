// Ambil elemen tbody
const tbody = document.getElementById("tabelBahanAjar");

// Fungsi menampilkan data dari dataBahanAjar
function tampilkanData() {
  tbody.innerHTML = ""; // kosongkan tabel

  dataBahanAjar.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img src="${item.cover}" alt="${item.namaBarang}" width="60"></td>
      <td>${item.kodeLokasi}</td>
      <td>${item.kodeBarang}</td>
      <td>${item.namaBarang}</td>
      <td>${item.jenisBarang}</td>
      <td>${item.edisi}</td>
      <td>${item.stok}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Jalankan fungsi saat halaman load
tampilkanData();

function filterStok() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const rows = tbody.getElementsByTagName("tr");
  let found = false; // indikator apakah ada data yang cocok

  for (let i = 0; i < rows.length; i++) {
    const kode = rows[i].cells[2].textContent.toLowerCase();
    const nama = rows[i].cells[3].textContent.toLowerCase();

    if (kode.includes(input) || nama.includes(input)) {
      rows[i].style.display = "";
      found = true; // ada data yang cocok
    } else {
      rows[i].style.display = "none";
    }
  }

  // hapus pesan lama kalo ada
  const noDataMsg = document.getElementById("noDataMsg");
  if (noDataMsg) noDataMsg.remove();

  // kalo tidak ditemukan data yang cocok
  if (!found) {
    const msgRow = document.createElement("tr");
    msgRow.id = "noDataMsg";
    msgRow.innerHTML = `<td colspan="7" style="text-align:center; color:#d9534f; font-weight:600;">Maaf, Data tidak ditemukan</td>`;
    tbody.appendChild(msgRow);
  }
}



