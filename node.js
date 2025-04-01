const buttonItem = document.querySelectorAll(".button_item")
const display = document.querySelector(".calculater_display")

let firstOperand = null;
let operator = null;
let secondOperand = false;

buttonItem.forEach(button=> {
   

    button.addEventListener("click", function(){
        let value = this.getAttribute("data-value");
        console.log(value)
        
        if(!isNaN(value)){
            // 숫자 입력 처리
            if(display.innerText === "0" || secondOperand){
                display.innerText = value;
                secondOperand = false;
                
            }else{
                
                if(display.innerText.length < 10){
                    display.innerText += value;
                }
            }
        }else if(operators.includes(value)){
            // 연산자 처리
            if(firstOperand === null){
                firstOperand = display.innerText
            }else if(operator){
                firstOperand = calculate(firstOperand, operator, display.innerText)
                display.innerText = firstOperand;
            }  
            operator = value;
            secondOperand = true;
            
        }else if(value === "="){
            // 계산 처리
            if(firstOperand !== null && operator !== null){
                let result = calculate(firstOperand, operator, display.innerText);
                display.innerText = result;
                firstOperand = null
                secondOperand = true;
                operator = null;
                
            }
        }else if(value === "."){
            
            if(!display.innerText.includes(".")){
                display.innerText += ".";
                }

        }else if (value === "delete") { 
            // 초기화
            display.innerText = "0";
            firstOperand = null;
            operator = null;
            secondOperand = false;
          
        } else if (value === "±") { 
            // 부호 변경
            if (display.innerText.startsWith("-")) {
                display.innerText = display.innerText.slice(1);
            } else {
                display.innerText = "-" + display.innerText;
            }
        }
    });
});

function calculate(n1, op, n2) {
    // 숫자로 변환
    n1 = parseFloat(n1);
    n2 = parseFloat(n2);

    
    // 연산 수행
    switch (op) {
        case "+": return Number((n1 + n2).toFixed(8));
        case "-": return Number((n1 - n2).toFixed(8));
        case "*": return Number((n1 * n2).toFixed(8));
        case "/": 
            if(n2 === 0) return "Error";
            return Number((n1 / n2).toFixed(8));
        case "%": return Number((n1 % n2).toFixed(8));
        default: return n2;
    }
}