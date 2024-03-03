// Used for freeCodeCamp's tests. Completely hidden by default.
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
// Drawer terminal related elements.
const changeInDrawer = document.querySelectorAll(".drawer-change")
const priceTotalSpan = document.getElementById("price-total-span");
const customerCashSpan = document.getElementById("customer-cash-span");
// Used to show a logging message after each event.
const changeDue = document.getElementById("change-due");
const messageToLog = document.getElementById("message-to-log");

// freeCodeCamp's Variables used in their tests with example values.
let price = 19.5;
let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];

`
[+] "Change" refers to the amount of money to give when the payment is greater than the price total.
`

class Drawer {
  currencyRateMap = {
    "ONE HUNDRED": 100,
    "TWENTY": 20,
    "TEN": 10,
    "FIVE": 5,
    "ONE": 1,
    "QUARTER": 0.25,
    "DIME": 0.1,
    "NICKEL": 0.05,
    "PENNY": 0.01,
  };

  constructor(maxMultiplier = 4) {
    this.maxMultiplier = maxMultiplier;
    this.cashInDrawer = {};
    this._startDrawer();
  }

  // "Private" DOM methods prefixed with an underscore. \\

  _startDrawer() {
    for (let currency in this.currencyRateMap) {

      const randomChange = 
        this.currencyRateMap[currency] * this._randomMultiplier(this.maxMultiplier);

      // Sets a higher multiplier for decimal units lower than one dollar bill.
      this.cashInDrawer[currency] = 
        this.currencyRateMap[currency] >= 1
          ? randomChange
          : +parseFloat(randomChange * this._randomMultiplier(30)).toFixed(2)
    } 

    this._updateDrawer();
  }

  _updateDrawer() {
    changeInDrawer.forEach((element) => {
      // Variable "currency" is used access properties in the this.cashInDrawer object.
      const currency = (element.id !== "one-hundred") 
        ? element.id.toUpperCase()
        : "ONE HUNDRED"
      element.textContent = this.cashInDrawer[currency];
    });
  }

  _randomMultiplier(multiplier, numToMultiply = 1) {
    return Math.floor(Math.random() * multiplier)
  }

  _displayMessage(message) {
    messageToLog.innerHTML = message;
    changeDue.classList.toggle("hidden")
    setTimeout(() => {
      changeDue.classList.toggle("hidden")
    }, 5000)
  }

  // "Public" methods to be accessed outside an instance. \\

  processChange(price, cash) {
    // Difference between cash and the price in total, reflecting the change to give.
    let difference = (cash - price).toFixed(2);
    // Just to show the difference in the final message.
    const diff = difference; 
    const change = {};
    // To avoid mutating before checking if there's actually enough change in the drawer.
    const cashInDrawer = JSON.parse(JSON.stringify(this.cashInDrawer));

    // Handle cases when customer inputs less cash than the total price.
    if (difference < 0) {
      this._displayMessage("Enter an amount equal to or higher than the price total!")
      return;
    }

    for (let currency in this.currencyRateMap) {
      const currencyRate = this.currencyRateMap[currency];

      while (currencyRate <= difference && cashInDrawer[currency] > 0) {
        cashInDrawer[currency] = (cashInDrawer[currency] - currencyRate).toFixed(2);
        difference = (difference - currencyRate).toFixed(2);

        change[currency] = change[currency]
          ? +parseFloat(change[currency] + currencyRate).toFixed(2)
          : currencyRate
      }
    }

    // Handle cases when there's no enough change in the drawer.
    if (difference > 0) {
      this._displayMessage("Not enough change.")
      return;
    }

    this.cashInDrawer = cashInDrawer;

    this._displayMessage(`
      <p>The difference between the price and cash received was:
      <br/>$${diff}.</p>
      <br/><br/>
      <p>Change given was:<br/>
      ${JSON.stringify(change)}.</p>
    `)

    this._updateDrawer();
  }

  __fccTestProcessChange__() {
    `
    Similar to the above method, but personalized to pass fCC's tests. 
    Only called whenever #purchase-btn is clicked, completely ignored otherwise.
    `  
    // Global variables to use:
    // cid is short for cash in drawer.
    price;
    cid;

    const customerCash = cashInput.value 
    const cidCopy = [...cid].reverse();
    let changeArray = [];
    let difference = customerCash - price;
    let drawerCash = 0;
    

    if (difference < 0) {
      alert("Customer does not have enough money to purchase the item")
      return;
    }

    if (difference === 0) {
      this._displayMessage("No change due - customer paid with exact cash")
      return;
    }

    for (let innerArray of cidCopy) {
      let 
      currency = innerArray[0], 
      currencyAmount = innerArray[1], 
      currencyRate = this.currencyRateMap[currency], 
      currencyAggregate = 0; 


      while (currencyRate <= difference && currencyAmount > 0) {
        currencyAmount = +parseFloat(currencyAmount - currencyRate).toFixed(2);
        difference = +parseFloat(difference - currencyRate).toFixed(2);
        currencyAggregate += currencyRate
      };

      if (currencyAggregate > 0) {
        changeArray.push([currency, +parseFloat(currencyAggregate).toFixed(2)])
      }

      drawerCash += currencyAmount
    }

    // Handle the messages
    if (difference > 0) {
      this._displayMessage("Status: INSUFFICIENT_FUNDS");
      return
    }

    changeArray = changeArray.map((innerArray) => {
      return `${innerArray[0]}: $${innerArray[1]} `
    })

    if (!drawerCash) {
      this._displayMessage(`Status: CLOSED ${changeArray.join(" ")}`);
      return
    }

    this._displayMessage(`Status: OPEN ${changeArray.join(" ")}`)
  }

  randomPriceTotal() {
    let price = +parseFloat(Math.random() * 10).toFixed(2);
    priceTotalSpan.textContent = price;
    customerCashSpan.textContent = "";
    cashInput.value = "";
  }

  restartDrawer() {
    this._startDrawer();
    this.randomPriceTotal();
    customerCashSpan.textContent = "";
    cashInput.value = "";
  }
}

const cashDrawer = new Drawer();

// DOM Functions
const enterKeypadInput = (key) => {
  `
  Enters whatever key has been pressed on the keypad on both,
  cashInput and customerCashSpan.
  `
  switch (key) {
    case "Enter":
      const price = priceTotalSpan.textContent;
      const customerCash = customerCashSpan.textContent;

      cashDrawer.processChange(price, customerCash);
      cashDrawer.randomPriceTotal();
      break;
    case "Delete":
      removeLast();
      break;
    case "Restart":
      cashDrawer.restartDrawer()
      break;
    default:
      appendKey(key)
  }

  function appendKey (key) {
    cashInput.value += key;
    customerCashSpan.textContent += key;
  }

  function removeLast() {
    cashInput.value = cashInput.value.slice(0, -1);
    customerCashSpan.textContent = customerCashSpan.textContent.slice(0, -1);
  }
}

// to pass freeCodeCamp's tests.
purchaseBtn.addEventListener("click", () => {
  const value = cashInput.value;
  if (!value) return;

  cashDrawer.__fccTestProcessChange__();
})
