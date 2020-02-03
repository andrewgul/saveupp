


function btnChangePressed() {
    document.getElementById("changeAmount").classList.remove("display-none")
    document.getElementById("showAmount").classList.add("display-none")
}

function btnCancelPressed() {
    document.getElementById("showAmount").classList.remove("display-none")
    document.getElementById("changeAmount").classList.add("display-none")
}

function btnOkPressed() {
    if (amountIsValid) {
        // обновить массив
    }
}

// парсим массив с данными, введенными ранее
let userData = JSON.parse(localStorage.getItem("userData"))
// получаем массив дней и информации о них (номер дня -- номер в массиве + 1)
let {daysInfo} = userData

console.log(daysInfo)

// Заполняем выбор дня календаря в зависимости от длины массива userData
function fillCalSelectDay() {
    let calSelectDay = document.getElementById("calSelectDay")
    for (let i = 0; i < daysInfo.length; i++) {
        calSelectDay.insertAdjacentHTML('beforeend', `<button class="button cal-day" id="${i + 1}">${i + 1}</button>\n`)
    }
}

fillCalSelectDay()

// Нам нужна эта переменная, чтобы знать у какого дня менять данные
// меняется при выборе дня
let selectedDay

// Показ данных в зависимости от кнопки, на которую тыкнули
// eventListener вешаем только в случае загрузки state2!
document.getElementById("calSelectDay").addEventListener('click', function (event) {
    let selected = event.target
    for (let i = 0; i < daysInfo.length; i++) {
        if (selected.id == i + 1) {
            document.getElementById("calDate").textContent = daysInfo[i].date
            document.getElementById("calMoneySpent").textContent = daysInfo[i].moneySpent + userData.currency
            selectedDay = i + 1
            console.log(selectedDay)
        }
    }
}); 






