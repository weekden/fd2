function qadraticEqation(a, b, c) {
    if (a === 0) {
      return console.log(`Это не квадратное уравнение!`);
    }
    
     if (a  === undefined || b === undefined || c === undefined) {
        return console.log(`Вы указали не все параметры уравнения`);
    }
    
    let discr = b**(2) - 4*a*c;
    let symbolA = a >= 0 ? "" : "-";
    let symbolB = b >= 0 ? "+" : "-";
    let symbolC = c >= 0 ? "+" : "-";
    let kofA = a === 1 || a === -1 ? "" : Math.abs(a);
    let kofB = b === 0 || b === 1 || b === -1 ? "" : Math.abs(b) ;
    const vyvod = `уравнение ${symbolA}${kofA}x^2 ${symbolB} ${kofB}x ${symbolC} ${Math.abs(c)} = 0 `;
    if (discr > 0) {
        let x1 = ((-b) - discr**(1/2))/(2*a);
        let x2 = ((-b) + discr**(1/2))/(2*a);
        console.log(`${vyvod} имеет корни x1 = ${x1} и x2 = ${x2}`);
    } else if (discr === 0) {
        let x = -b/(2*a);
        console.log(`${vyvod} имеет один корень x = ${x}`);
    } else 
        console.log(`${vyvod} не имеет вещественных корней`);
}

qadraticEqation(4,-8,1);




//  function qadraticEqation(a, b, c) {
//     if (a === 0) { 
//        return `Это не квадратное уравнение!`;
//     }

//     if (a  === undefined || b === undefined || c === undefined) {
//        return `Вы указали не все параметры уравнения`;
//     }

//     let discr = b**(2) - 4*a*c;
//     let symbolA = a >= 0 ? "" : "-";
//     let symbolB = b >= 0 ? "+" : "-";
//     let symbolC = c >= 0 ? "+" : "-";
//     let kofA = a === 1 || a === -1 ? "" : Math.abs(a);
//     let kofB = b === 0 || b === 1 || b === -1 ? "" : Math.abs(b) ;
//     const vyvod = `уравнение ${symbolA}${kofA}x^2 ${symbolB} ${kofB}x ${symbolC} ${Math.abs(c)} = 0 `;

//     if (discr > 0) {
//         let x1 = ((-b) - discr**(1/2))/(2*a);
//         let x2 = ((-b) + discr**(1/2))/(2*a);
//         return `${vyvod} имеет корни x1 = ${x1} и x2 = ${x2}`;
//     }

//     if (discr === 0) {
//         let x = -b/(2*a);
//         return  `${vyvod} имеет один корень x = ${x}`;
//     }
 
//     return `${vyvod} не имеет вещественных корней`; 
// }
// qadraticEqation(4,-8,1)




