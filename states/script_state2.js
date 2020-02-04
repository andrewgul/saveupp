
// В первую очередь получаем данные из localStorage

    // парсим массив с данными, введенными ранее
    let userData = JSON.parse(localStorage.getItem("userData"))
    console.log(userData)
    // получаем массив дней и информации о них (номер дня -- номер в массиве + 1)
    let {daysInfo} = userData
    console.log(daysInfo)

// Нам нужна эта переменная, чтобы знать у какого дня менять данные
// меняется при выборе дня
let selectedDay

// Получаем данные, которые не будут меняться
// это должно произойти до отрисовки state2
let {name, money, currency} = userData

// Из полученных данных рассчитываем:
// деньги потраченные, оставшиеся, и сколько денег нужно тратить в день

updateInfo()

function updateInfo() { // может loadInfo...
    document.getElementById("moneySpent").textContent = countMoneySpent() + currency
    document.getElementById("moneyLeft").textContent = countMoneyLeft() + currency
    document.getElementById("youShouldSpend").textContent = countShouldSpend() + currency
}

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
    return (money / daysInfo.length).toFixed(2)
}
 
// Заполняем выбор дня календаря в зависимости от длины массива userData
function fillCalSelectDay() {
    let calSelectDay = document.getElementById("calSelectDay")
    for (let i = 0; i < daysInfo.length; i++) {
        calSelectDay.insertAdjacentHTML('beforeend', `<button class="button cal-day" id="${i + 1}">${i + 1}</button>\n`)
    }
}

fillCalSelectDay()




// Показ данных в зависимости от кнопки, на которую тыкнули
// eventListener вешаем только в случае загрузки state2!
document.getElementById("calSelectDay").addEventListener('click', function (event) {
    let selected = event.target
    for (let i = 0; i < daysInfo.length; i++) {
        if (selected.id == i + 1) {
            document.getElementById("calDate").textContent = daysInfo[i].date
            document.getElementById("calMoneySpent").textContent = daysInfo[i].moneySpent + currency
            selectedDay = i + 1
            console.log(selectedDay)
        }
    }
}); 

// Все, что ниже -- функции для кнопок

function btnChangePressed() {
    document.getElementById("changeAmount").classList.remove("display-none")
    document.getElementById("showAmount").classList.add("display-none")
}

function btnCancelPressed() {
    document.getElementById("showAmount").classList.remove("display-none")
    document.getElementById("changeAmount").classList.add("display-none")
}

function btnOkPressed() {
    if (amountIsValid()) {
        // обновить массив
        daysInfo[selectedDay - 1].moneySpent = parseInt(document.getElementById("newAmount").value)
    }
}

function amountIsValid() {
    // проверка что введенное значение удовлетворяет требованиям
    // (не больше оставшейся суммы, является числом)
    return true
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


