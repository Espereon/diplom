let allProducts = [];
let currentFilterType = "Весь ассортимент";

const btnEl = document.querySelectorAll('.btn');
const bodyEl = document.querySelector('.body');

btnEl.forEach(e => {
    e.addEventListener('click', () => {
        bodyEl.style.opacity = 0.5;
        bodyEl.style.transition = "0.3s";
        const orderForm = document.createElement("form");
        orderForm.className = "order_form";
        orderForm.innerHTML = `<form class="order_form">
  <label for="name">Имя:</label>
  <input type="text" id="name" name="name" /><br />

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" /><br />

  <label for="message">Сообщение:</label><br />
  <textarea id="message" name="message"></textarea><br />

  <button type="submit" onclick=submitForm()">Отправить</button>
</form>`;
        bodyEl.append(orderForm);
    });
});

async function loadProducts() {
    try {
        const response = await fetch("./data.json");
        if (!response.ok) {
            throw new Error("Ошибка: " + response.statusText);
        }
        allProducts = await response.json();
        displayProducts(allProducts);
        initializeFilters();
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
}

function updateProductsDisplay() {
    let filteredProducts = filterProductsByType(currentFilterType);
    displayProducts(filteredProducts);
}

function displayProducts(products) {
    const productsEl = document.querySelector(".products");
    productsEl.innerHTML = "";

    products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product";
        card.innerHTML = `
    <img class="product_img" src="${product.image}" alt="el1" />
          <div class="product_info">
            <h3 class="product_name">
              ${product.name}
            </h3>
            </a>
            <p class="product_description">
              Год ${product.year}
              </br>
              Пробег ${product.kilometer}
              </br>
              Двигатель ${product.engine}
              </br>
              Страна: ${product.country}
            </p>
            <p class="product_price">${product.price} рублей</p>
            <button class="product_button" data-id="${product.id}">Подробнее</button>

      `;
        productsEl.appendChild(card);
    });
    const buttonEls = document.querySelectorAll(".product_button");
    buttonEls.forEach((e) => {
        e.addEventListener("click", (e) => {
            const productId = e.target.dataset.id;
            const product = products.find((prod) => prod.id == productId); // Находим продукт по ID

            // Добавляем продукт в корзину
            addToCart(product);
            e.target.innerText = "Товар в корзине";
            e.target.disabled = true;
        });
    });
}

function filterProductsByType(type) {
    return allProducts.filter(
        (product) => type === "Весь ассортимент" || product.type === type
    );
}

function initializeFilters() {
    const filterLinks = document.querySelectorAll(".filter_link");

    filterLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            currentFilterType = link.innerText;
            updateProductsDisplay(); // Обновление списка продуктов
        });
    });
}

loadProducts();

