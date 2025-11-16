// Список товаров: название, цена
const products = [
  { name: "Товар 1", price: 100 },
  { name: "Товар 2", price: 280 },
  { name: "Товар 3", price: 499 },
  { name: "Товар 4", price: 1500 },
  { name: "Товар 5", price: 2699 }
];

document.addEventListener('DOMContentLoaded', function () {
  const productsContainer = document.getElementById('products');
  const calculateBtn = document.getElementById('calculateBtn');
  const resultDiv = document.getElementById('result');

  // Генерация списка товаров
  products.forEach((product, index) => {
    const item = document.createElement('div');
    item.className = 'product-item';
    item.innerHTML = `
      <input type="checkbox" id="prod-${index}" data-price="${product.price}">
      <div class="product-info">
        <p class="product-name">${product.name}</p>
        <p class="product-price">${product.price} ₽</p>
      </div>
      <input type="number" class="product-quantity" id="qty-${index}" value="1" min="1" disabled>
    `;
    productsContainer.appendChild(item);

    // Включить/выключить поле количества при выборе чекбокса
    const checkbox = item.querySelector(`#prod-${index}`);
    const quantityInput = item.querySelector(`#qty-${index}`);
    checkbox.addEventListener('change', () => {
      quantityInput.disabled = !checkbox.checked;
      if (checkbox.checked) quantityInput.focus();
    });
  });

  // Обработчик кнопки "Рассчитать"
  calculateBtn.addEventListener('click', () => {
    let total = 0;
    let hasSelection = false;

    products.forEach((product, index) => {
      const checkbox = document.getElementById(`prod-${index}`);
      const qtyInput = document.getElementById(`qty-${index}`);

      if (checkbox.checked) {
        hasSelection = true;
        const qty = parseInt(qtyInput.value) || 0;
        if (qty <= 0) {
          alert(`Укажите корректное количество для товара: ${product.name}`);
          qtyInput.focus();
          return;
        }
        total += product.price * qty;
      }
    });

    if (!hasSelection) {
      alert('Пожалуйста, выберите хотя бы один товар.');
      return;
    }

    resultDiv.textContent = `Общая стоимость заказа: ${total} ₽`;
    resultDiv.style.display = 'block';
  });
});