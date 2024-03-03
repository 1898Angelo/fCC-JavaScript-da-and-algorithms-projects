const textInput = document.getElementById("text-input");
const submitBtn = document.getElementById("submit-btn");
const resultText = document.getElementById("result-text");

// Utility functions
const isPalindrome = (string) => {
    const word = string
                .replace(/[^a-z0-9]/gi, "")
                .toLowerCase();
    
    function invertedWord(word) {
        const inverted = [];
        for (let char of word) {
            inverted.unshift(char);
        } 
        return inverted.join("");
    }

    return word === invertedWord(word);
}

// DOM functions
const domResultText = (value) => {
    if (isPalindrome(value)) {
        resultText.textContent = `${value} is a palindrome`
    } else {
        resultText.textContent = `${value} is not a palindrome`
    }
    return
}

// Submit events
textInput.addEventListener("keypress", (event) => {
    const value = event.target.value;
    if (!value) return;
    if (event.key === "Enter") {
        domResultText(value)
        return
    } 
    resultText.textContent = ""
})

submitBtn.addEventListener("click", (event) => {
    const value = textInput.value;
    if (!value) {
        alert("Please input a value");
        return
    }
    domResultText(value);
})