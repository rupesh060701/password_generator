
let inputSlider = document.querySelector("[data-LengthSlider]");
let lengthDisplay = document.querySelector("[data-lengthNumber]");
let passwordDisplay = document.querySelector("[data-passwordDisplay]");
let indicator = document.querySelector(".strength_indicator")
let upperCaseCheck = document.querySelector("#uppercase");
let lowerCaseCheck = document.querySelector("#lowercase");
let numCaseCheck = document.querySelector("#numbers");
let symbolCaseCheck = document.querySelector("#symbols");
let allCheckBox = document.querySelectorAll("input[type=checkbox]");
let generateBtn = document.querySelector("[data-GeneratePassword]");
let copyMsg = document.querySelector("[data-copyMsg]");
let copyBtn = document.querySelector("[data-copy]");





let password = "";
let passwordLength = 10;
let checkCount = 0;

// -----handle Slider Change--------

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    passwordLength = inputSlider.value;
}
handleSlider();
setIndicator("#ccc");

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

// -------Set Indicator colour--------

function setIndicator(color) {
    
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow="0px 0px 30px";
     indicator.style.boxShadowColor=color;
}

// ---------Generate Random things-------

function getRandInteger(min, max) {
    return (Math.floor(Math.random() * (max - min))) + min;
}

function generateRandNumber() {
    return getRandInteger(0, 9);
}

function generateLowerCase() {
    return String.fromCharCode(getRandInteger(97, 123));
}

function generateUpperCase() {
    return String.fromCharCode(getRandInteger(65, 91));
}

let symbol = "!@#$%^&*()_=-=`~;:',.><?/[{]}\|";
function generateSymbol() {
    let randNum = getRandInteger(0, symbol.length);
    return symbol.charAt(randNum);
}


// -------calculate strength----------

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSymbol = false;
    if (upperCaseCheck.checked) hasUpper = true;
    if (lowerCaseCheck.checked) hasLower = true;
    if (numCaseCheck.checked) hasNum = true;
    if (symbolCaseCheck.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNum || hasSymbol) && passwordLength >= 8)
        setIndicator("#0f0");
    else if ((hasLower || hasUpper) && (hasNum || hasSymbol) && passwordLength >= 6)
        setIndicator("#ff0");
    else
        setIndicator("#f00")
}

// -------Copy password from display-----------

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch (e) {
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value)
        copyContent();
    hideMsg();
})


function hideMsg(){
    setTimeout(showMsg,1000);
}
function showMsg(){
    copyMsg.style.display="none";
}


// ---------handle check box change-----------

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    });
   
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

// ------Generate Random Password-----------

function shufflePassword(array) {
    //Fisher Yates Metod
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => {
        str += el;
    })

    return str;
}


generateBtn.addEventListener('click', () => {

    if (checkCount <= 0) return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    password = "";
    let funArr = [];

    if (upperCaseCheck.checked)
        funArr.push(generateUpperCase);
    if (lowerCaseCheck.checked)
        funArr.push(generateLowerCase);
    if (numCaseCheck.checked)
        funArr.push(generateRandNumber);
    if (symbolCaseCheck.checked)
        funArr.push(generateSymbol);

    for (let i = 0; i < funArr.length; i++) {
        password += funArr[i]();
    }

    for (let i = 0; i < passwordLength - funArr.length; i++) {
        let randInd = getRandInteger(0, funArr.length);
        password += funArr[randInd]();
    }

    password = shufflePassword(Array.from(password));
    passwordDisplay.value = password;

    calcStrength();


})





// ------Loader-----------

function myFunction() {
    setTimeout(showPage, 2000);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}