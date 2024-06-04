//DOM elements

const tipPerPerson = document.getElementById('tip-per-person');
const totalPerPerson = document.getElementById('total-per-person');
const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const tipButtonsList = document.querySelectorAll('.tip-item-default');
const customTip = document.getElementById('tip-custom');
const resetButton = document.querySelector('.reset');

// Split logic
function splitBill (totalBill, tipPercentage, numberOfPeople) {
    const billPerPerson = ((totalBill * (tipPercentage/100)) + totalBill ) / numberOfPeople;

    return billPerPerson.toFixed(2);
}

function calculateTipPerPerson (totalBill, tipPercentage, numberOfPeople) { 
    const tipPerPerson = (totalBill * (tipPercentage/100)) / numberOfPeople;

    return tipPerPerson.toFixed(2);
} 

// Tip selection logic

let tip = 0;

tipButtonsList.forEach(button => {button.addEventListener('click', function () {
        tipButtonsList.forEach(btn => btn.classList.remove('tip-item-selected'));

        button.classList.add('tip-item-selected');
        tip = button.getAttribute('value');
        console.log(tip);
    });
});

function clearTipSelection(tipButtonsList) {
    tipButtonsList.forEach(button => button.classList.remove('tip-item-selected'));
}

customTip.addEventListener('focus', function() {
    this.setAttribute('placeholder', '');
    clearTipSelection(tipButtonsList);
    customTip.addEventListener('input', () => {
        tip = this.value
        console.log(tip);
    });
    
});

customTip.addEventListener('blur', function() {
    if (!this.value.trim()) {
        this.setAttribute('placeholder', 'Custom');
        tip = 0;
        console.log(tip);
    }
});

// Manipulate elements on page

function updateTipValue() {
    const totalBill = parseFloat(billInput.value);
    const numberOfPeople = parseInt(peopleInput.value);
    const tipSplitted = calculateTipPerPerson(totalBill, tip, numberOfPeople);

    if (tipSplitted.length < 6) 
        tipPerPerson.style.fontSize = '2rem';
    else if (tipSplitted.length >= 9)
        tipPerPerson.style.fontSize = '1.1rem';
    else if (billSplitted.length > 6) 
        tipPerPerson.style.fontSize = '1.6rem';

    tipPerPerson.innerHTML = `$ ${tipSplitted}`;
}

function updateTotalValue() {
    const totalBill = parseFloat(billInput.value);
    const numberOfPeople = parseInt(peopleInput.value);
    const billSplitted = splitBill(totalBill, tip, numberOfPeople);

    if (billSplitted.length < 6) 
        totalPerPerson.style.fontSize = '2rem';
    else if (billSplitted.length >= 9)
        totalPerPerson.style.fontSize = '1.1rem';
    else if (billSplitted.length > 6) 
        totalPerPerson.style.fontSize = '1.6rem';

    totalPerPerson.innerHTML = `$ ${billSplitted}`;

}


billInput.addEventListener('input', function () {
    updateTipValue();
    updateTotalValue();
});


peopleInput.addEventListener('input', function () {
    updateTipValue();
    updateTotalValue();
});

resetButton.addEventListener('click', () => {
    tipPerPerson.innerHTML = '$';
    totalPerPerson.innerHTML = '$';
    billInput.value = 0;
    peopleInput.value = 1;
    tip = 0;
});
