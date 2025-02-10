const popupLinks = document.querySelectorAll('.popup_link');
const bodyEl = document.querySelector('.body');
const lockPadding = document.querySelectorAll('.lock_padding');
let unlock = true;
const timeout = 800;

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}


function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodylock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup_content')) {
                popupClose(e.target.closest('.popup'))
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

function bodylock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.index_main').offsetWidth + 'px';
    for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRigth = lockPaddingValue;
    }
    bodyEl.style.paddingRigth = lockPaddingValue;
    bodyEl.classList.add('lock');
    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
};

function bodyUnlock() {
    setTimeout(() => {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRigth = '0px';
        }
        bodyEl.style.paddingRigth = '0px'
        bodyEl.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(() => {
        unlock = true;
    }, timeout);
};


document.getElementById('form_popup').addEventListener('submit', function (event) {
    event.preventDefault(); // Отменяем стандартную отправку формы

    const formData = new FormData(this); // Получаем данные формы
    const data = {};

    // Преобразуем данные формы в объект
    for (const entry of formData.entries()) {
        data[entry[0]] = entry[1];
    }

    console.log(data);

    // Преобразуем объект в строку JSON
    const jsonString = JSON.stringify(data, null, 2);

    // Сохранение данных в файл JSON (здесь используется просто консоль)
    console.log(jsonString);
    document.querySelector('.popup.open').classList.remove('open');
});
