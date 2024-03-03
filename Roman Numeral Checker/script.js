const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const resultText = document.getElementById("output");

// Utility Functions
function toRomanNumerals(integer) {
    const romanNumerals = {
        "M": 1000,
        "CM": 900,
        "D": 500,
        "CD": 400,
        "C": 100,
        "XC": 90,
        "L": 50,
        "XL": 40,
        "X": 10,
        "IX": 9,
        "V": 5,
        "IV": 4,
        "I": 1
    }
    let romanized = "";

    for (let numeral in romanNumerals) {
        while (integer >= romanNumerals[numeral]) {
            integer -= romanNumerals[numeral];
            romanized += numeral
        };
    };
    return romanized
}

function numeralConditions(value) {
    // To pass freeCodeCamp's conditions.
    switch (true) {
        case (value === ""):
            return "Please enter a valid number";
        case (value < 0): 
            return "Please enter a number greater than or equal to 1";
        case (value >= 4000):
            return "Please enter a number less than or equal to 3999";
        default:
            return toRomanNumerals(value)
    }
}

// Event Listeners
numberInput.addEventListener("keypress", (event) => {
    const value = event.target.value;
    if (event.key === "Enter") {
        resultText.textContent = numeralConditions(value);
        return;
    } 
    resultText.textContent = "";
})


convertBtn.addEventListener("click", (event) => {
    resultText.textContent = numeralConditions(numberInput.value);
    return
})