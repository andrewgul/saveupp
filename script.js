let checkLocalStorage = true
let main = document.getElementById("main")
let userName = "Andrew"

if (checkLocalStorage) {
    setState1()
}

// Создание состояния номер 1

function setState1(){
    main.innerHTML = `
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
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi quam facere reiciendis magnam porro blanditiis quibusdam quos officiis atque culpa doloribus, repellat repudiandae reprehenderit error architecto. Earum laudantium aliquam explicabo.
            </p>
            <p>
                Also visit my <a href="https://github.com/andrewgul" targer="_blank"><i class="fab fa-github"></i>&nbsp;Github</a>!
            </p>
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
        alert("All right!")
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

// Черновики

function getDataFromLocalStorgae() {
    return JSON.parse(localStorage.getItem("userData"))
}
