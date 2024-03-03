const statusBarClock = document.getElementById("status-bar-clock");
const userInput = document.getElementById("user-input");
const resultsDiv = document.getElementById("results-div");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");

// Utility Functions
function getCurrentTime() {
    const currentTime = new Date();
    const hour = appendZero(currentTime.getHours());
    const minutes = appendZero(currentTime.getMinutes());

    function appendZero(unit) {
        return (unit < 10) ? `0${unit}` : unit;
    }

    return `${hour}:${minutes}`
}

function checkPhoneNumber(number, areaCode = 1) {
    let regex = new RegExp(`^(${areaCode}(-|\\s)?)?((\\d){3}|\\((\\d){3}\\))(-|\\s)?(\\d){3}(-|\\s)?(\\d){4}\$`)
    return regex.test(number)
}

// DOM Functions
const startClock = () => {
    statusBarClock.textContent = getCurrentTime();
    setTimeout(() => {
        statusBarClock.textContent = getCurrentTime();
    }, 10000)
}

const validationResult = (number) => {
    // To meet freeCodeCamp's conditions
    switch (true) {
        case (!number):
            return "Please provide a phone number."
        case (number.length > 25):
            return "Invalid US number."
        case (checkPhoneNumber(number)):
            return `Valid US number: ${number}`
        default:
            return `Invalid US number: ${number}`
    }
}

// Events
userInput.addEventListener("keypress", (event) => {
    const value = event.target.value;
    if (event.key === "Enter") {
        resultsDiv.innerHTML = validationResult(value)
        event.target.value = "";
    }
})

checkBtn.addEventListener("click", (event) => {
    const value = userInput.value
    resultsDiv.innerHTML = validationResult(value);
})

clearBtn.addEventListener("click", (event) => {
    resultsDiv.innerHTML = "";
})