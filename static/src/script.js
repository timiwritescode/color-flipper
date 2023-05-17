let button = document.querySelector('.flip-btn');
let colorCode = document.querySelector('#color-code');
console.log(button.parentNode.children[1])
let bodyElement = document.querySelector('body');
let simpleLink = document.querySelector('.simple');
let hexLink = document.querySelector('.hex');

let custom = document.querySelector('.custom')
let bodyStyles = window.getComputedStyle(bodyElement);

let currentBackgroundColor = bodyStyles.backgroundColor;

let randomColorCode;

let y = 1;

let x = 0;

function convertToHexValues (rgbValue) {
    // convert rgb(num, num, num) to [num, num, num]
    rgbValue = rgbValue.slice(4 , rgbValue.length - 1) 
    
    let rgbIntegers = rgbValue.split(',')
    
    // convert each of the numbers to hexadecimal
    for (let i = 0; i < rgbIntegers.length; i++) {
        let converter = parseInt(rgbIntegers[i].trim()).toString(16);
        rgbIntegers[i] = converter;
        
        if (rgbIntegers[i].length < 2) {
            rgbIntegers[i] = '0' + converter
        };   
    };
    
    return '#'  + rgbIntegers.join('')
};


function getRandomColorCode () {
    let hexValues = '123456789abcdef';
    let randomColorCode = '#';
    
    let codelength = 6;
    let x = 0
    while (x < codelength) {
        randomColorCode += hexValues[Math.floor(Math.random() * hexValues.length)];
        x ++
    }; 

    return randomColorCode;
};


function changeBackgroundWithHexValues() {
    y = 1;
    if (colorCode) {
        colorCode.textContent = convertToHexValues(currentBackgroundColor);
        console.log(y); 
};
    return colorCode.textContent
}


function changeBackgroundWithSimpleValues () {
    y = 0;
    
    if (colorCode) {
        
        colorCode.textContent = currentBackgroundColor;
        console.log('This:' + colorCode.textContent)
    };
    
    return colorCode.textContent;
};


function createInput () {
    let customInput = document.createElement('input');
    customInput.id = 'custom-color';
    customInput.placeholder = 'Input color code'
    let colorWheel =  document.createElement('input');
    colorWheel.type = 'color';
    colorWheel.id = 'color-wheel';
    getBgColor();
    colorWheel.value = currentBackgroundColor; 
    console.log(colorWheel.value)

    let colorCodeParent = colorCode.parentNode;
    colorCodeParent.replaceChild(customInput, colorCodeParent.children[0])
    colorCodeParent.appendChild(colorWheel)
};

function createButton () {
    let customBtn = document.createElement('button');
    customBtn.className = 'custom-btn';
    customBtn.textContent = "CUSTOM"
    
    let buttonParent = button.parentNode;
    buttonParent.replaceChild(customBtn, buttonParent.children[1])
}

function makeCustomKeys () {
    // create an input
    createInput()
    // replace the color code with the input

    // create button
    createButton()
    // replace the click me button with the button
};


function returnTodefault () {
    // get the custom keys
    let customInput = document.querySelector('#custom-color')
    let customBtn = document.querySelector('.custom-btn')
    let colorWheelInput = document.querySelector('#color-wheel')
    console.log(colorWheelInput)
    // replace the custom keys with the default guys
    colorCode = document.createElement('span');
    colorCode.id = 'color-code';
    
    button = document.createElement('button');
    button.className = 'flip-btn';
    button.textContent = 'CLICK ME';
    
    customInput.parentNode.replaceChild(colorCode, customInput.parentNode.children[0])
    customBtn.parentNode.replaceChild(button, customBtn.parentNode.children[1])
    colorWheelInput.parentNode.removeChild(colorWheelInput)
    console.log(button)
    
};


function getBgColor () {
    currentBackgroundColor = bodyStyles.backgroundColor;
};

function changeBackgroundColor () {
    randomColorCode = getRandomColorCode();
    bodyElement.style.backgroundColor = randomColorCode;
    currentBackgroundColor = bodyElement.style.backgroundColor;
    if (y === 1) {
        // display hex values
        colorCode.textContent = convertToHexValues(currentBackgroundColor);
    } else {
        // display simple values
        colorCode.textContent = bodyElement.style.backgroundColor; 
    };
    
};


button.addEventListener('click', () => {
    changeBackgroundColor();
});

hexLink.addEventListener('click', () => {
    if (x === 1) {
        returnTodefault()
        x = 0;
        button.addEventListener('click', () => {
            changeBackgroundColor();
        });
    };
    changeBackgroundWithHexValues()
})

simpleLink.addEventListener('click', () => {
    if (x === 1) {
        returnTodefault()
        x = 0;
        button.addEventListener('click', () => {
            changeBackgroundColor();
        });
    };
    changeBackgroundWithSimpleValues();
})

custom.addEventListener('click', () => {
            x = 1;
            console.log(colorCode)
            if (colorCode) {
                makeCustomKeys();
                let customButton = document.querySelector('.custom-btn');

                let colorWheelInput = document.querySelector('#color-wheel')
                getBgColor();
                colorWheelInput.value = convertToHexValues(currentBackgroundColor); 

                let customInput = document.querySelector('#custom-color')
                
                colorWheelInput.addEventListener('click', () => {
                    customInput.value = '';
                })

                customButton.addEventListener('click', () => {
                    
                    if (customInput.value) {
                        bodyElement.style.backgroundColor = customInput.value;
                        getBgColor();
                        colorWheelInput.value = convertToHexValues(currentBackgroundColor);        
                        if (convertToHexValues(currentBackgroundColor) !== 
                            convertToHexValues(customInput.value) &&
                            convertToHexValues(currentBackgroundColor) !== 
                            customInput.value) {
                            customInput.value = '';
                            customInput.placeholder = 'Please enter correct code';
                        } else {
                            console.log('Yes')
                        }
                    } else {
                        
                        bodyElement.style.backgroundColor = colorWheelInput.value;
                        customInput.value = colorWheelInput.value;
                        getBgColor()
                    };
                })
                                  
                colorCode = null;
            };
});