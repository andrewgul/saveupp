let main = document.getElementById("main")
let userData
let daysInfo
let name, money, currency, daysToSurvive
let selectedDay

// let checkLocalStorage = true

if (localStorage.getItem("userData") === null) {
    startState1()
} else {
    startState2()
}

// Создание состояния номер 1

function startState1(){
    setState1()
}

function setState1(){
    main.innerHTML = `
    <div class="container">
    <h2 class="title" id="greeting">Hello!</h2>
    <h3 class="subtitle" id="comment"> Please enter information below</h3>
    <div class="box columns">
        <!-- Левая часть -->
        <div class="column is-two-fifths">
                <div class="form">
                    <!-- Ввод имени -->
                    <div class="field">
                        <label class="label">What's your name?</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Name" maxlength="20" id="inputUserName">
                        </div>
                    </div>
                    <!-- Сколько денег -->
                    <div class="field">
                        <label class="label">How much money do you need to save?</label>
                        <div class="field has-addons">
                        <p class="control">
                            <span class="select">
                            <select id="selectCurrency">
                                <option>$</option>
                                <option>£</option>
                                <option>€</option>
                                <option>₽</option>
                            </select>
                            </span>
                        </p>
                        <p class="control is-expanded">
                            <input class="input" type="text" placeholder="50 – 99 999" maxlength="5" id="inputMoneyToSpend">
                        </p>
                        </div>
                    </div>
                    <div class="columns">
                        <!-- На сколько дней -->
                        <div class="field column">
                            <label class="label">How many days?</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="5 – 30" maxlength="2" id="inputDaysToSurvive">
                            </div>
                        </div>
                        <!-- Начало -->
                        <div class="field column">
                            <label class="label">Start day?</label>
                            <div class="control">
                                <div class="select is-fullwidth">
                                <select id="selectStartDate">
                                    ${optionsStartDay(5)}
                                </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <p class="help is-danger has-text-centered is-size-6" id="warningGoesHere"></p>
                        <button class="button is-info is-fullwidth" onclick="start()">Let's go!</button>
                    </div>
                </div class="form">
            </div>
        <!-- Правая часть -->
        <div class="column">
            <label class="label">How this app can help you?</label>
            <p>
            Sometimes you have limited amount of money for a certain time interval (example: 250$ for a week), so you need to spend this sum wisely. This app can help you track your spendings during the time you choose, it’ll show money you spent on a chart. Also it will count amount of money you should spend a day so you’ll be able  make it through without any problems. 
            Hope you’ll like it!
                        </p>
            <p>
                Also visit my <a href="https://github.com/andrewgul" targer="_blank"><i class="fab fa-github"></i>&nbsp;Github</a>!
            </p>
        </div>
    </div>
    </div>`
}

// Функция, которая добавляет selectStartDay дни
// сегодняшний и выбранное кол-во дней назад (я выбрал 5)

function optionsStartDay(daysToSubtract) {
    let days = ""
    let today = moment()
    for (let i = 0; i < daysToSubtract; i++) {
        days+= `<option>${moment(today).subtract(i, "days").format("LL")}</option>`
    }
    return days
}

function setState2() {
    main.innerHTML = `<div class="title">Состояние 2</div>`
}

// Вызывается при нажатии на кнопку
// Если все введено верно, данные сохраняются в localStorage,
// потом должно рисоваться state2 ( setState2() либо setState(state2) )

function start() {
    if (validateForm()) {
        let data  = JSON.stringify(getDataFromForm())
        localStorage.setItem("userData", data)
        startState2()
    } else {
        showWarning()
    }
}

// Валидация формы!
// Все должно работать, если не менять айди

function validateForm() {
    return ((userNameNotEmpty() && moneyToSpendProper() && daysToSurviveProper()) ? true : false)
}

let userNameNotEmpty = function() {
    if (document.getElementById("inputUserName").value !== ""){
        return true
    } else {
        return false
    }
}

let moneyToSpendProper = function() {
    let money = parseInt(document.getElementById("inputMoneyToSpend").value)

    if ((Number.isInteger(money)) && (money > 49)) {
        return true
    } else {
        return false
    }
}

let daysToSurviveProper = function() {
    let days = parseInt(document.getElementById("inputDaysToSurvive").value)

    if ((Number.isInteger(days)) && (days > 4) && (days < 31)) {
        return true
    } else {
        return false
    }

    // return (((Number.isInteger(days)) && (days > 4) && (days < 31)) ? true : false)
}

function showWarning() {
    let warning = document.getElementById("warningGoesHere")
    warning.textContent = 'Check information you entered one more time please'
}

// ^^^
// |||
// Это стопудово можно сделать короче, надо будет попробовать
// ---
// Конец валидации формы 

// Класс Day нужен чтобы при инициализации создать
// нужное кол-во дней и сохранить в localStorage

class Day {
    constructor(date, moneySpent){
        this.date = date
        this.moneySpent = moneySpent
    }
}

// Класс для создания массива с данными, которые ввел пользователь
// Последнее -- массив, из объектов класса Day (это мы назначаем при вызове)

class UserData {
    constructor(name, money, currency, startDate, daysToSurvive, daysInfo) {
        this.name = name
        this.money = money
        this.currency = currency
        this.startDate = startDate
        this.daysToSurvive = daysToSurvive
        this.daysInfo = daysInfo
    }
}

// Создание массива из объектов класса Day

function createDaysArray(startDate, days){
    let arr = []
    for (let i = 0; i < days; i++){
        date = moment(startDate).add(i, "days").format("LL")
        arr[i] = new Day(date, 0)
    }
    return arr
}

// Из формы получаем пять значений, введенных пользователем
// шестое -- это массив дней, который создается с помощью функции createDaysArray
// на основе этих данных возвращаем объект, который записываем в localStorage

function getDataFromForm() {
    let name = document.getElementById("inputUserName").value
    let money = parseInt(document.getElementById("inputMoneyToSpend").value)
    let currency = document.getElementById("selectCurrency").value
    let startDate = document.getElementById("selectStartDate").value
    let daysToSurvive = parseInt(document.getElementById("inputDaysToSurvive").value)
    let daysInfo = createDaysArray(startDate, daysToSurvive)
    let data = new UserData(name, money, currency, startDate, daysToSurvive, daysInfo)
    
    return data
}

// В первую очередь получаем данные из localStorage
 

// Нам нужна эта переменная, чтобы знать у какого дня менять данные
// меняется при выборе дня
// Изначнально выбирается сегодняшний день,
// если его нет, то последний день в списке

function startState2() {
    userData = JSON.parse(localStorage.getItem("userData"))
    // let {name, money, currency, daysToSurvive} = userData    
    daysInfo = userData.daysInfo   
    name = userData.name
    money = userData.money
    currency = userData.currency
    daysToSurvive = userData.daysToSurvive

    // Рисуем state2
    setState2()

    // Обновление информации (это происходит каждый раз,
    // когда изменяются данные о потраченных деньгах)
    updateInfo()

    // Определяем, какой день выбирается по дефолту
    defineSelectedDay()

    // Заполняем календарь, смотрим отмечать ли сегодня
    // переключаемся на выбранный день по дефолту
    fillCalSelectDay()

    // Показ данных в зависимости от кнопки, на которую тыкнули
    // eventListener вешаем только в случае загрузки state2!
    document.getElementById("calSelectDay").addEventListener('click', function (event) {
        changeSelectedDay(event.target.id)
    });
}

function setState2() {
    main.innerHTML = `<div class="container">
    <!-- H2 меняется в зависимости от состояния (state1 - "Hello!", state2 - "Hello, ", state3 - "You've done it!") -->
    <h2 class="title" id="greeting">Hello, ${name}!</h2>
    <h3 class="subtitle" id="comment"> How's it going?</h3>
    <div class="columns" id="main">
        <div class="column">
            <!-- Тут информация про деньги в общем -->
            <div class="box">
                <div class="level">
                    <div class="level-item has-text-centered">
                        <div>
                        <p class="heading is-size-6">Money spent</p>
                        <!-- Сколько денег потрачено -->
                        <p class="title is-size-4 is-size-4" id="moneySpent"><i class="fas fa-ellipsis-h"></i></p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                        <p class="heading is-size-6">Money left</p>
                        <!-- Сколько денег осталось -->
                        <p class="title is-size-4" id="moneyLeft"><i class="fas fa-ellipsis-h"></i></p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                        <p class="heading is-size-6">You should spend</p>
                        <!-- Сколько стоит тратить в день -->
                        <p class="title is-size-4" id="youShouldSpend"><i class="fas fa-ellipsis-h"></i></p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Тут "календарь" -->
            <div class="box">
            <canvas id="myChart"></canvas>
        </div>
            
    </div>
    <div class="column">
        <div class="box">
        <div class="subtile has-text-centered">
            <span class="tag is-info is-large is-light"> <i class="fas fa-calendar-day"></i></span>
            <span class="subtitle">&nbsp;Calendar</span>
        </div>
        <hr>
        <div class="calendar has-text-centered" id="calSelectDay">
            <!-- Сюда рисуются календарные дни -->
        </div>
        <hr>
        <div class="calendar-info has-text-centered">
            <!-- тут будет выводиться информация в зависимости от выбранного дня -->
            <div class="level">
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading is-size-6">Date</p>
                        <p class="title is-size-4" id="calDate"><i class="fas fa-ellipsis-h"></i></p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading is-size-6">Money Spent</p>
                        <!-- Отображение кол-ва денег -->
                        <p class="title is-size-4" id="showAmount">
                            <span id="calMoneySpent"><i class="fas fa-ellipsis-h"></i></span>
                            &nbsp;<button class="button is-info" onclick="btnChangePressed()">Change</button>
                        </p>   
                        <!-- Изменение кол-ва денег -->
                        <div class="field has-addons display-none" id="changeAmount">
                            <div class="control">
                                <input class="input" type="text" placeholder="Enter new amount" id="newAmount">
                            </div>
                            <!-- Кнопка отмены -->
                            <button class="button is-danger" onclick="btnCancelPressed()"><i class="fas fa-times"></i></button>
                            <!-- Кнопка ок -->
                            <button class="button is-info" onclick="btnOkPressed()">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
</div>
<div class="restart has-text-centered">
    <button class="button is-danger is-light" onclick="btnRestartPressed()">Start new</button>
</div>`
}

// ------------------------------------------------------------
// ОЧЕНЬ ВАЖНАЯ ФУНКЦИЯ
// Обновляет все при изменении потраченных денег
// ------------------------------------------------------------

function updateInfo() { // может loadInfo...
    document.getElementById("moneySpent").textContent = "– " + countMoneySpent() + currency
    document.getElementById("moneyLeft").textContent = countMoneyLeft() + currency
    document.getElementById("youShouldSpend").innerHTML = countShouldSpend() + currency
    updateChart()
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
 
// Если сегодня уже день, который не входит в массив daysInfo, 
// то по дефолту выбранный день -- последний
function defineSelectedDay() {
    if (today()) {
        selectedDay = today()
    } else {
        selectedDay = daysInfo.length
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
    } else {
        changeSelectedDay(selectedDay)
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
        document.getElementById("newAmount").value = ""
        closeChangeAmount()
    }
}

// Проверка, что введенное значение удовлетворяет требованиям
// (не больше оставшейся суммы, является числом)
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


// "Экспериментальная" функция
function hideShow(hide, show) {
    document.getElementById(hide).classList.remove("display-none")
    document.getElementById(show).classList.add("display-none")
}


// Обновление инфы
// также обновление local storage
function updateDayInfo(day, newAmount) {
    let dayIndex = day - 1
    daysInfo[dayIndex].moneySpent = Number.parseInt(newAmount)
    localStorage.setItem("userData", JSON.stringify(userData))
    //
    // далее тут должна быть функция, которая обновляет все (т.к. данные изменились)
    //
    updateInfo()
    changeSelectedDay(selectedDay)
} 

// То, что ниже, нужно для таблицы

// Заново рисует таблицу с новыми данными
function updateChart() {

    let ctx = document.getElementById('myChart').getContext('2d');

    let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: chartLabels(),
            datasets: [{
                fill: false,
                lineTension: 0.25,
                label: 'Spendings',
                backgroundColor: '#209CEE',
                borderColor: '#209CEE',
                data: chartData()
            },]
        },
    
        // Configuration options go here
        options: {
            // ...
        },
    });

    return chart
}

function chartLabels() {
    let labels = []
    for (let i = 1; i < daysInfo.length + 1; i++){
        labels.push(i)
    }
    console.log(labels)
    return labels
}

function chartData() {
    let data = daysInfo.map(item => item.moneySpent)
    console.log(data)
    return data
}

function btnRestartPressed() {
    localStorage.clear()
    location.reload()
}
