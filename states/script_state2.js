// Вот это должно быть в общем скрипте
// это приветствие и комментарий
let greeting = document.getElementById("greeting")
let comment = document.getElementById("comment")

// В первую очередь получаем данные из localStorage

    // парсим массив с данными, введенными ранее
    let userData = JSON.parse(localStorage.getItem("userData"))
    console.log(userData)
    // получаем массив дней и информации о них (номер дня -- номер в массиве + 1)
    let {daysInfo} = userData
    console.log(daysInfo)

    let {name, money, currency, daysToSurvive} = userData
// А вот это уже в зависимости от 
greeting.textContent = `Hello, ${name}!`
comment.textContent = "How's it going?"

// Нам нужна эта переменная, чтобы знать у какого дня менять данные
// меняется при выборе дня
let selectedDay = today()

// Получаем данные, которые не будут меняться
// это должно произойти до отрисовки state2

console.log("Сегодня " + today() + " день экономии")

let todayIs = moment().format("LL")
// ------------------------------------------------------------
// ОЧЕНЬ ВАЖНАЯ ФУНКЦИЯ
// Обновляет все при изменении потраченных денег
// ------------------------------------------------------------

updateInfo()

function updateInfo() { // может loadInfo...
    document.getElementById("moneySpent").textContent = countMoneySpent() + currency
    document.getElementById("moneyLeft").textContent = countMoneyLeft() + currency
    document.getElementById("youShouldSpend").innerHTML = countShouldSpend() + currency
    fillCalSelectDay()
}

// Проверка того, какой сегодня день
// Функция говорит нам какой сегодня день по счету
function today() {
    let tday = moment().format("LL")
    let rtrn = null
    for (let i = 0; i < daysInfo.length; i++) {
        if (daysInfo[i].date == tday) {
            rtrn = i + 1
        }
    }
    return rtrn
}

// Из полученных данных рассчитываем:
// деньги потраченные, оставшиеся, и сколько денег нужно тратить в день

function countMoneySpent() {
    sum = 0
    for (let i = 0; i < daysInfo.length; i++) {
        sum += daysInfo[i].moneySpent
    }
    return sum
}

function countMoneyLeft() {
    return money - countMoneySpent() 
}

function countShouldSpend() {
    if (today()) {
        return (countMoneyLeft()/(daysToSurvive - today() + 1)).toFixed(2)
    } else {
        return ""
    }
}
 
// Заполняем выбор дня календаря в зависимости от длины массива userData

function fillCalSelectDay() {
    let calSelectDay = document.getElementById("calSelectDay")
    for (let i = 0; i < daysInfo.length; i++) {
        calSelectDay.insertAdjacentHTML('beforeend', `<button class="button cal-day" id="${i + 1}">${i + 1}</button>\n`)
    }
    if (today()) {
        changeSelectedDay(today())
        markToday()
    }
}

// Функция для смены выбранного дня
// Убирает выделение предыдущего дня,
// добавляет его для нового
// Меняет данные в соответствии с выбранным днем

function changeSelectedDay(dayId) {
    for (let i = 0; i < daysInfo.length; i++) {
        if (dayId == i + 1) {
            document.getElementById(`${selectedDay}`).classList.remove("is-info")
            document.getElementById("calDate").textContent = daysInfo[i].date
            document.getElementById("calMoneySpent").textContent = daysInfo[i].moneySpent + currency
            selectedDay = i + 1
            document.getElementById(`${selectedDay}`).classList.add("is-info")
            console.log(selectedDay)
        }
    }
}

// Если выбранный срок не прошел, отмечаем сегодняшний день

function markToday() {
    document.getElementById(`${today()}`).classList.add("is-today")
}

// Показ данных в зависимости от кнопки, на которую тыкнули
// eventListener вешаем только в случае загрузки state2!

document.getElementById("calSelectDay").addEventListener('click', function (event) {
    changeSelectedDay(event.target.id)
});




// Все, что ниже -- функции для кнопок

function btnChangePressed() {
    document.getElementById("changeAmount").classList.remove("display-none")
    document.getElementById("showAmount").classList.add("display-none")
}

function btnCancelPressed() {
    closeChangeAmount()
}

function btnOkPressed() {
    if (amountIsValid()) {
        let amount = document.getElementById("newAmount").value
        updateDayInfo(selectedDay, amount)
        alert("Yes!")
        closeChangeAmount()
    }
}

// проверка что введенное значение удовлетворяет требованиям
// (не больше оставшейся суммы, является числом)
// !!! возможно пихну это в функцию btnOkPressed
function amountIsValid() {
    let amount = document.getElementById("newAmount").value
    if (Number.parseInt(amount) < countMoneyLeft()) {
        return true
    } else {
        return false
    }
}

function closeChangeAmount() {
    document.getElementById("showAmount").classList.remove("display-none")
    document.getElementById("changeAmount").classList.add("display-none")
}

//Чтобы сравнивать дату с помощью момент
// нужен формат "LL", который я решил использовать
/*
     alert(moment().format("LL") == "February 4, 2020")
*/

// То, что ниже, нужно для таблицы, пока не трогай!
let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
        datasets: [{
            fill: false,
            lineTension: 0.25,
            label: 'My First dataset',
            backgroundColor: '#209CEE',
            borderColor: '#209CEE',
            data: [0, 10, 15, 2, 20, 30, 45, 0]
        },]
    },



    // Configuration options go here
    options: {
        // ...
    },

    
});

// Обновление инфы
// также обновление local storage
function updateDayInfo(day, newAmount) {
    let dayIndex = day - 1
    daysInfo[dayIndex].moneySpent = Number.parseInt(newAmount)
    localStorage.setItem("userData", JSON.stringify(userData))
    //
    // далее тут должна быть функция, которая обновляет все (т.к. данные изменились)
    //
    document.getElementById("moneySpent").textContent = countMoneySpent() + currency
    document.getElementById("moneyLeft").textContent = countMoneyLeft() + currency
    document.getElementById("youShouldSpend").innerHTML = countShouldSpend() + currency
} 
