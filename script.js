let allCars = [];
let currentFilterType = "Весь ассортимент";

async function loadCars() {
    try {
        const response = await fetch("./data.json");
        if (!response.ok) {
            throw new Error("Ошибка: " + response.statusText);
        }
        allCars = await response.json();
        displayCars(allCars);
        initializeFilters();
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
}

function updateCarsDisplay() {
    let filteredcars = filterCarsByType(currentFilterType);
    displayCars(filteredcars);
}

function displayCars(cars) {
    const carsEl = document.querySelector(".cars");
    carsEl.innerHTML = "";

    cars.forEach((item) => {
        const card = document.createElement("div");
        card.className = "car";
        card.innerHTML = `
    <img class="car_img" src="${item.image}" alt="el1" />
          <div class="car_info">
            <h3 class="car_name">
              ${item.name}
            </h3>
            </a>
            <p class="car_description">
              Год ${item.year}
              </br>
              Пробег ${item.kilometer}
              </br>
              Двигатель ${item.engine}
              </br>
              Страна: ${item.country}
            </p>
            <p class="car_price">${item.price} рублей</p>
            <button class="car_button" data-id="${item.id}">Подробнее</button>

      `;
        carsEl.appendChild(card);
    });
}

function filterCarsByType(type) {
    return allCars.filter(
        (product) => type === "Весь ассортимент" || product.type === type
    );
}

function initializeFilters() {
    const filterLinks = document.querySelectorAll(".filter_link");

    filterLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            currentFilterType = link.innerText;
            updateCarsDisplay(); // Обновление списка продуктов
        });
    });
}

loadCars();

