const display = document.querySelector('#content');
const btns = document.querySelectorAll('.btn');
let result=0
let firstNum=0;
let secondNum=0;
let operator;
let negative = false;
let waiting = false;

function add(a,b){    
    return Number(a)+Number(b);
}
function subtract(a,b){
    return Number(a)-Number(b);    
}
function multiply(a,b){
    return Number(a)*Number(b);
}
function divide(a,b){   
    return Number(a)/Number(b);
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
            if (b == 0){
                result = 'Never gonna give you up~'
            }
            else {result = divide(a,b);}
            break;
}return result;}

function getInput(butt){
    if (butt.textContent == 'Clear'){
        clearDisplay();
    //remove waiting status if true, else regular backspace
    }else if(butt.textContent == 'Back'){
        if (waiting === true){
            waiting = false;
            operator = null;
            firstNum = null;
        }else{
        display.textContent = display.textContent.slice(0,-1);}
    //toggle positive/negative       
    }else if(butt.textContent == '+/-'){            
        if (negative === true){negative = false}
        else negative = true;
    //operators button
    }else if(butt.classList.contains('op')){        
        //enter "waiting" mode so user can switch operator after clicked on one,
        //like can click '+' first but then switch to '*'
        if (waiting === false){
        waiting = true;        
        checkOperation();  
        operator = `${butt.textContent}`;              
        }else{
            if (operator == `${butt.textContent}`){}
            if (operator != `${butt.textContent}`){
                operator = `${butt.textContent}`;
            }} 
    //equal button, prevent spam clicking with waiting
    }else if(butt.textContent == '='){
        if (waiting === false){
        checkOperation();
        waiting = true;}
        
    }
    //numbers button, inputing numbers turn off waiting mode
    //
    else {
        if(waiting === true){
            negative = false;
            waiting = false;
            display.textContent = butt.textContent;}                                          
        else if(waiting ===false){
            display.textContent += butt.textContent;
        }
    }

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
    //disable decimal button when decimal point exists
    if (display.textContent.includes('.')){
        document.querySelector('#decimal').disabled = true;}
        else{document.querySelector('#decimal').disabled = false; } 
    //setting max display length
        if (display.textContent.length > 12){
            if(display.textContent === result){
            display.textContent = display.textContent;
        }else {display.textContent = display.textContent.slice(0,12);}
    }
    if (waiting ===true){
        document.querySelector('#negativeToggle').disabled = true;}
        else{document.querySelector('#negativeToggle').disabled = false;
         
    }
    
        
};

function clearDisplay(){
    display.textContent = '0';
    negative = false;
    waiting = false;
    firstNum = null;
    secondNum = null;
    operator = null;
    result = 0;
}
function checkOperation(){
    if (!!firstNum){
        secondNum = display.textContent;
        display.textContent = operate(firstNum,secondNum,operator);
        firstNum = display.textContent;
        secondNum = null;        
    }
    if (!firstNum ||
        (!!firstNum && waiting === true) ){
        firstNum = display.textContent;
    }
    if (result < 0){
        negative = true;
    }
}