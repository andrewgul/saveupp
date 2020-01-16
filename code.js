const date = new Date();

const todayIs = document.getElementById("today-is");
const showStartDate = document.getElementById("start-date");
const showEndDate = document.getElementById("end-date");
const daysPassed = document.getElementById("days-passed");
const daysLeft = document.getElementById("days-left");

let currentDay = date.getDate();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

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

countEndDate();

todayIs.textContent = `${currentDay} ${showMonth(currentMonth)} ${currentYear}`
showStartDate.textContent = `${startDay} ${showMonth(startMonth)} ${startYear}`
showEndDate.textContent = `${endDay} ${showMonth(endMonth)} ${endYear}`
daysPassed.textContent = `${countDaysPassed()}`;
daysLeft.textContent = `${daysToSurvive - countDaysPassed()}`;

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






