let a = ''; //first number
let b = ''; //second number
let sign = '';//operator
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '.'];
const operators = ['/', '*', '-', '+'];

 //monitor
 const out = document.getElementById('display');

 function clearAll () {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.value = 0;
 }

 document.getElementById('AC').addEventListener('click', clearAll);

 const buttons = document.querySelectorAll('input[type="button"]');
 buttons.forEach(btn => {
   btn.addEventListener('click', () => {
      const key = btn.value;
      //console.log(key);

      if (digit.includes(key)) {
         if (key === '.' && ((sign === '' && a.includes('.')) || (sign !== '' && b.includes('.')))) return;

         if (b === '' && sign === '') {
            a += key;
            out.value = a
         } else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            out.value = b;
         } else {
            b += key;
            out.value = b;
         }
      }

      if (operators.includes(key)) {
         sign = key;
         out.value = sign;
         return;
      }

      if (key === '=') {
         if (b === '') b = a;

         let result;

         switch (sign) {
            case '+':
               result = +a + +b;
               break;
            
            case '-':
               result = +a - +b;
               break;
            case '*':
               result = +a * +b;
               break;
            case '/':
               if (b === '0') {
                  out.value = "you can't!";
                  a = '';
                  b = '';
                  sign = '';
                  return;
               }
               result = +a / +b;
               break;
         }
         
         result = Math.round(result * 100000) / 100000;
         out.value =  result;
         a = result.toString();
         finish = true;
      }
   })
 })