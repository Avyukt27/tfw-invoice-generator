let state = [];

const form = document.getElementById("invoice-form");
const invoice = document.getElementById("invoice");
const invoiceBody = document.getElementById("invoice-body");
const grandTotalLabel = document.querySelector(".total");

function renderTable() {
  invoiceBody.innerHTML = "";
  let subtotal = 0.0;

  state.forEach((entry) => {
    subtotal += entry.total;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.qty}</td>
      <td>₹${entry.price.toFixed(2)}</td>
      <td>₹${entry.total.toFixed(2)}</td>
      <td><button type="button" class="delete" data-id="${entry.id}">Delete</button></td>
    `;
    invoiceBody.appendChild(row);
  });

  const grandTotal = subtotal * 1.18;
  grandTotalLabel.textContent = `Grand Total: ₹${grandTotal.toFixed(2)}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const item = data.get("item");
  const qty = Number(data.get("qty"));
  const price = Number(data.get("price"));
  const total = price * qty;

  state.push({
    id: Date.now(),
    name: item,
    qty: qty,
    price: price,
    total: total,
  });

  renderTable();
  form.reset();
});

invoiceBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const id = Number(e.target.dataset.id);
    state = state.filter((item) => item.id !== id);
    renderTable();
  }
});
