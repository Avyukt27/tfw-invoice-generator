const form = document.getElementById("invoice-form");
const invoice = document.getElementById("invoice");

form.addEventListener("input", () => {
  const data = new FormData(form);

  const items = data.getAll("item[]");
  const quantities = data.getAll("qty[]");
  const prices = data.getAll("price[]");

  console.log({ items, quantities, prices });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  invoice.hidden = false;
});
