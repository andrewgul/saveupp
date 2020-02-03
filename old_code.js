
const date = new Date();

const todayIs = document.getElementById("today-is");
const showStartDate = document.getElementById("start-date");
const showEndDate = document.getElementById("end-date");
const daysPassed = document.getElementById("days-passed");
const daysLeft = document.getElementById("days-left");
const calendar = document.getElementById("calendar");
const moneySpentADayDate = document.getElementById("money-spent-a-day-date")
const moneySpentADay = document.getElementById("money-spent-a-day");

let prevDay;

let currentDay = date.getDate();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

let moneyToSpend = prompt("How much money you have?")

// Временный блок
// В дальнейшем эти данные будут вводиться пользователем,
// а потом браться из локального хранлилища
//  
// let startDay = currentDay
// let startMonth = currentMonth
// let startYear = currentYear
let startDay = 12
    let startMonth = 0
    let startYear = currentYear

    let daysToSurvive = 18;
    // Временный блок
// В дальнейшем эти данные будут рассчитываться 
// после введения пользователем, сохраняться,
// а потом браться из локального хранлилища
//  
    let endDay; // = 18;
    let endMonth; // = 0;
    let endYear; // = 2020;

    let data = [
        {dayNum: 1, day: 12, month: 0, year: 2020, moneySpent: 22.67},
        {dayNum: 2, day: 13, month: 0, year: 2020, moneySpent: 23.12},
        {dayNum: 3, day: 14, month: 0, year: 2020, moneySpent: 26.65},
        {dayNum: 4, day: 15, month: 0, year: 2020, moneySpent: 11.33},
        {dayNum: 5, day: 16, month: 0, year: 2020, moneySpent: 67.45},
        {dayNum: 6, day: 17, month: 0, year: 2020, moneySpent: 24.17},
        {dayNum: 7, day: 18, month: 0, year: 2020, moneySpent: 25.17},
    ]
//
// Конец временного блока

let months = [
    {days: 31, name: "January"},
    {days: 28, name: "February"},
    {days: 31, name: "March"},
    {days: 30, name: "April"},
    {days: 31, name: "May"},
    {days: 30, name: "June"},
    {days: 31, name: "July"},
    {days: 31, name: "August"},
    {days: 30, name: "September"},
    {days: 31, name: "October"},
    {days: 30, name: "November"},
    {days: 31, name: "December"}
]

if (currentYear == (2020 || 2025 || 2030 || 2035)) { months[2].days = 29 }

// Подсчитывает конечную дату
countEndDate();
fillCalendar();

todayIs.textContent = `${currentDay} ${showMonth(currentMonth)} ${currentYear}`
showStartDate.textContent = `${startDay} ${showMonth(startMonth)} ${startYear}`
showEndDate.textContent = `${endDay} ${showMonth(endMonth)} ${endYear}`
daysPassed.textContent = `${countDaysPassed()}`;
daysLeft.textContent = `${daysToSurvive - countDaysPassed()}`;

calendar.addEventListener('click', function (event) {
    let clickedCalDay = event.target
    let numToCompare = (+clickedCalDay.id)
    for (let i = 0; i < data.length; i++) {
        if (data[i].dayNum == numToCompare) {
            moneySpentADayDate.textContent = `${data[i].day} ${showMonth(data[i].month)} ${data[i].year}`
            moneySpentADay.textContent = `${data[i].moneySpent}`
            document.getElementById(`${prevDay}`).classList.toggle("day-chosen")
            document.getElementById(`${i + 1}`).classList.toggle("day-chosen")
            prevDay = i + 1;
        }
    }
}); 

function showMonth(month) {
    for (let i = 0; i < months.length; i++) {
        if (month == i) {
            return months[i].name;
        }
    }
}

function countEndDate() {
    if ((daysToSurvive - 1) <= (months[startMonth].days - (startDay - 1))) { // -1 потому что мы считаем и тот день, который сегодня
        endDay = startDay + daysToSurvive - 1;
        endMonth = startMonth;
        endYear = startYear;
    } else  {
        endDay = daysToSurvive - (months[startMonth].days - (currentDay - 1));
        if (startMonth != 11){
            endMonth = startMonth + 1;
            endYear = startYear;
        } else {
            endMonth = startMonth + 1;
            endYear = startYear + 1;
            endMonth = 0;
        }
    }
}

function countDaysPassed() {
    if (currentMonth == startMonth) {
        return currentDay - startDay;
    } else if (currentMonth == startMonth + 1) {
        return
    }
}

function fillCalendar() {
    for (let i = 0; i < data.length; i++) {
        calendar.insertAdjacentHTML('beforeend', `<div class="day" id="${data[i].dayNum}">${data[i].dayNum}</div>`)
        if ((currentDay == data[i].day) && (currentMonth == data[i].month) && (currentYear == data[i].year)) {
            document.getElementById(`${data[i].dayNum}`).classList.toggle("today")
            document.getElementById(`${data[i].dayNum}`).classList.toggle("day-chosen")
            prevDay = data[i].dayNum;
            moneySpentADayDate.textContent = `${data[i].day} ${showMonth(data[i].month)} ${data[i].year}`
            moneySpentADay.textContent = `${data[i].moneySpent}`
        }
    }
}



// Эта функция считает потраченные деньги за все время
function countMoneySpent(arr) {
    let sum = 0
    for (let i = 0; i < arr.length; i++){
        sum += arr[i].moneySpent
    }
    return sum
}

function countMoneyLeft(){return moneyToSpend - countMoneySpent(data)}


alert(moment().format('MMMM Do YYYY, HH:mm:ss'))