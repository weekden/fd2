let widht = +prompt('Enter wight');
let lenght = +prompt('Enter lenght');
let p = 2*(widht + lenght);
let s = widht*lenght;
(widht === lenght) ? console.log(`This is a square p = ${p} s = ${s}`) : console.log(`p = ${p} s = ${s}`);






let numberMounth = +prompt('Enter number of months');
if (numberMounth <= 2 || numberMounth === 12) {
    console.log (`This is winter`)
    } else if (numberMounth <= 5) {
    console.log (`This is spring`)
    } else if (numberMounth <= 8) {
    console.log (`This is summer`)
    } else if (numberMounth <= 11) {
    console.log (`This is autumn`)
}


switch (numberMounth) {
    case 2:
        console.log("winter")
    break;
    case 3:
    case 4:
    case 5:
        console.log("spring")
         break;
    case 6:
    case 7:
    case 8:
        console.log("summer")
        break;
    case 9:
    case 10:
    case 11:
        console.log("autumn")
        break;
    case 12:
        console.log("winter")
    break; 
} 





let num = +prompt(`Enter number`);
if (isNaN(num))  {
    console.log('Вы ввели не число');
} else {
let isEven = num % 2 == 0;
let isInt = num % 1 === 0;
let symbol = (num === 0) ? "ноль" : (num > 0) ? 'положительное' : 'отрицательное';
console.log (`Число ${num}: ${(isEven) ? "четное" : "нечетное"},  ${(isInt) ? "целое" : "нецелое"},  ${symbol}`);
}
 

let symbol = '|_';

while (symbol.length <= 18) {
    console.log(symbol);
    symbol+='|_';
}  







