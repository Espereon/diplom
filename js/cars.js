async function loadcarDetails() {
    const params = new URLSearchParams(window.location.search);
    const carId = params.get("id");

    if (!carId) {
        console.error("ID машины не найден в URL");
        return;
    }

    try {
        const response = await fetch("./data.json");
        if (!response.ok) {
            throw new Error("Сетевая ошибка: " + response.statusText);
        }
        const allCars = await response.json();

        const car = allCars.find((prod) => prod.id === Number(carId));
        console.log(car);

        if (!car) {
            console.error("Машина не найдена");
            return;
        }

        displaycarDetails(car);
    } catch (error) {
        console.error("Ошибка при загрузке данных о машине:", error);
    }
}

function displaycarDetails(car) {
    const carDetailsEl = document.querySelector(".car-page");

    carDetailsEl.innerHTML = `
         <img src="${car.image}" alt="photo" class="car-page_img" />
            <div class="car-page_info">
              <h2 class="car-page_title">${car.name}</h2>
              <p class="car-page_description">
              </br>
              Год ${car.year}
              </br>
              Пробег ${car.kilometer}
              </br>
              Двигатель ${car.engine}
              </br>
              Страна: ${car.country}
              </br></br>
              ${car.description}
              </p></br></br>
              <p class="car-page_price">${car.price} рублей</p>
            </div>
        `;

}

loadcarDetails();
