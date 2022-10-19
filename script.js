const display = document.querySelector('#content');
const btns = document.querySelectorAll('.btn');
const decimalBtn = document.querySelector('#decimal');
let result=0
let firstNum=0;
let secondNum=0;
let operator;
let negative = false;
let allowDecimal = true;

function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;    
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}
function operate(a,b,op){    
    switch(op){
        case '+':
            result = add(a,b);
            break;
        case '-':
            result = subtract(a,b);
            break;
        case '*':
            result = multiply(a,b);
            break;
        case '/':
            result = divide(a,b);
            break;
}return result;}

function getInput(butt){
    if (butt.textContent == 'Clear'){
        display.textContent = '0';
        negative = false;
    }else if(butt.textContent == 'Back'){
        display.textContent = display.textContent.slice(0,-1);        
    }else if(butt.textContent == '+/-'){
        if (negative === true){negative = false}
        else negative = true;
    }
    else{
    display.textContent += butt.textContent;}
    checkDisplay();
}

for (let btn of btns){
    btn.addEventListener('click',(e) => getInput(btn))
}

//prevent display from being empty when user keeps pressing 'back'
//or check to prevent 'numbers' that start with 0 like 001123
function checkDisplay(){
    //by default display 0 on screen
    if(display.textContent == undefined ||
         display.textContent == null || 
         display.textContent == '')            
      {display.textContent = '0';}
    //allow 0.xxx but no numbers like 000456 allowed
    if (display.textContent.length >1){
        if (display.textContent.startsWith('0.')){
            display.textContent = display.textContent;
        }
        else if(display.textContent.startsWith('0')){
            display.textContent = display.textContent.slice(1);
        }}
    //negative toggle, makes sure no funky things like double negative signs
    //on display
    if (negative === true){        
        if (display.textContent.startsWith('0')){            
            display.textContent = display.textContent;    
            negative = false;        
        }
        else if (display.textContent.startsWith('-')){
            display.textContent = display.textContent;
        } 
        else {display.textContent = '-'+display.textContent;}
    }if (negative === false){
        if (display.textContent.startsWith('-')){
            display.textContent = display.textContent.slice(1);
        }}
    //no lone '-' sign allowed on display
    if (display.textContent.startsWith('-') &&
        display.textContent.length == 1){
            display.textContent = '0';
        }
    //in case user backspace to 0 and kept negative = true
    if (display.textContent == '0'){
        negative = false;
    }
    if (display.textContent.includes('.')){
        document.querySelector('#decimal').disabled = true;   }
        else {document.querySelector('#decimal').disabled = false;}  
    if (display.textContent.length > 12){
        if(display.textContent === result){
            display.textContent = display.textContent;
        }else {display.textContent = display.textContent.slice(0,12);}
    }
        
};
