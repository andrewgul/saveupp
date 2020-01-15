const date = new Date();

const todayIs = document.getElementById("today-is");
const daysLeft = document.getElementById("days-left")

// Временный блок
// В дальнейшем эти данные будут вводиться пользователем,
// а потом браться из локального хранлилища
//  
    let startDay = 12;
    let startMonth = 0;
    let startYear = 2020;
//
// Конец временного блока

let currentDay = date.getDate();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

// Временный блок
// В дальнейшем эти данные будут рассчитываться 
// после введения пользователем, сохраняться,
// а потом браться из локального хранлилища
//
    let endDay = 18;
    let endMonth = 0;
    let endYear = 2020;
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

console.log(months[2].days)

todayIs.textContent = `Today is ${currentDay} ${showMonth()} ${currentYear}`
daysLeft.textContent = `${countDaysLeft()} days left`;



function showMonth() {
    for (let i = 0; i < months.length; i++) {
        if (currentMonth == i) {
            return months[i].name;
        } else {
            return "some month"
            // Этот думаю стоит потом убрать
        }
    }
}

// let countedEndDay;

// function countEndDay() {
//     if ()
// }

// function countDaysLeft() {
//     let days;
//     if (currentMonth == startMonth) {
//         return day - startDay;
//     } 
// }

