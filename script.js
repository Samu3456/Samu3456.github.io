document.addEventListener('DOMContentLoaded', function() {
    const inputBox = document.getElementById('inputbox');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.textContent;

            if (value === 'AC') {
                currentInput = '';
                operator = '';
                firstOperand = '';
                inputBox.value = '0';
            } else if (value === 'DE') {
                currentInput = currentInput.slice(0, -1);
                inputBox.value = currentInput || '0';
            } else if (value === '%' || value === '/' || value === '*' || value === '+') {
                if (currentInput) {
                    firstOperand = currentInput;
                    operator = value;
                    currentInput = '';
                    inputBox.value = firstOperand + ' ' + value;
                }
            } else if (value === '=') {
                if (firstOperand && operator && currentInput) {
                    const result = calculate(parseFloat(firstOperand), parseFloat(currentInput), operator);
                    inputBox.value = result;
                    currentInput = result.toString();
                    operator = '';
                    firstOperand = '';
                }
            } else {
                currentInput += value;
                inputBox.value = currentInput;
            }
        });
    });

    function calculate(a, b, operator) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            case '%':
                return a % b;
            default:
                return 0;
        }
    }
});