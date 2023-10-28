var selectedRow = null;

// Show Alerts
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".note");
  const main = document.querySelector(".list");
  container.insertBefore(div, main);

  setTimeout(() => div.remove(), 3000);
}

// Edit Data
document.querySelector("#to-do-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("btn-edit")) {
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#catatan").value = selectedRow.children[0].textContent;
    document.querySelector("#waktu").value = selectedRow.children[1].textContent;
  }
});

// Save Edited Data
document.querySelector("#to-do-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("btn-save")) {
    if (selectedRow) {
      selectedRow.children[0].textContent = document.querySelector("#catatan").value;
      selectedRow.children[1].textContent = document.querySelector("#waktu").value;
      showAlert("Catatan Sudah diperbarui", "success");
      clearFields();
    }
  }
});

// Delete Data
document.querySelector("#to-do-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("btn-hapus")) {
    let row = target.parentElement.parentElement;
    row.remove();
    showAlert("Catatan Sudah dihapus", "danger");
    clearFields();
  }
});

// Clear All Fields
function clearFields() {
  document.querySelector("#catatan").value = "";
  document.querySelector("#waktu").value = "";
}

// Add Data
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get Form Values
  const catatan = document.querySelector("#catatan").value;
  const waktu = document.querySelector("#waktu").value;

  if (selectedRow === null) {
    const list = document.querySelector("#to-do-list");
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${catatan}</td>
      <td>${waktu}</td>
      <td>
        <a href="#" class="btn-edit">Edit</a>
        <a href="#" class="btn-hapus">Hapus</a>
      </td>
    `;

    list.appendChild(row);
    showAlert("Catatan ditambahkan", "success");
  } else {
    selectedRow.children[0].textContent = catatan;
    selectedRow.children[1].textContent = waktu;
    showAlert("Catatan Sudah diperbarui", "success");
    selectedRow = null;
  }

  clearFields();
});
