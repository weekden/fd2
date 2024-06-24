const calculate = function(a) {
    return function(operant) {
        return function(b) {
            let result = null;
            switch(operant) {
                case "+":
                    result = a + b;
                    return `${a}+${b} = ${result}`;
                case '-':
                    result = a - b;
                    return `${a}-${b} = ${result}`;
                case '*':
                    result = a * b;
                    return `${a}*${b} = ${result}`
                case '/':
                    if (b !== 0) {
                        result = a / b;
                        return `${a}/${b} = ${result}`
                    } else return `на ноль делить нельзя`;
            }
        }
    }
}
console.log(calculate(5)("/")(10));

const pow = function(x) {
    return function(y) {
    let result = 1; 
    let vyvod = `${x}^${y} =`;


    if (y === 0) {
        return `${vyvod} 1`;
    }


    if (y > 0) {
        for(let i = 0; i < y; i++) {
            result = x * result;
        }
        return `${vyvod} ${result}`;
    }

    
    if (y < 0) {
        for (let i = 0; i < Math.abs(y); i++) {
            result = (1 / x) * result;
        }
        return `${vyvod} ${result}`;
    }
    }
}
console.log(pow(2)(0));