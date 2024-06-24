// //--------------------111111------------------
function currentSums(numbers) {
    let newArr = [];
    let resultArr = [];
    numbers.reduce((acc, num, index) => {
        let sum = acc + num;
        resultArr.push(sum);
        newArr.push(`${numbers.slice(0, index + 1).join(" + ")}`);
        return sum;
    }, 0);
    console.log(newArr, "=", resultArr);
    return resultArr;
}

const numbers = [2, 3, 5, 7, 11, 13, 17];
currentSums(numbers);






// function currentSums(numbers) {
//     let newArr = [];
//     numbers.reduce((acc, num) => {
//         let sum = acc + num;
//         newArr.push(sum);
//         return sum;
//     }, 0);
//     return newArr;
// };

// const numbers = [2, 3, 5, 7, 11, 13, 17];
// console.log(currentSums(numbers));


// //--------------------222222------------------
const getFirstLaters = (str) => str.split(' ').map(item => item[0]);
console.log(getFirstLaters("Каждый охотник желает знать, где сидит фазан."));



// const getFirstLaters = function(str) {
// const array = str.split(' ');
// return array.map(function(item) {
//     return item[0]});
// }  
// console.log(getFirstLaters("Каждый охотник желает знать, где сидит фазан."));


// //--------------------333333------------------

const getFilterArray = (startArray) => startArray.filter(item => item > 0 && item % 1 === 0);
console.log(getFilterArray([-1, 2, 3.5, -12, 4, 1.25, 16]));



// const getFilterArray = function(startArray) {
//     return startArray.filter(function(item) {
//         return  item > 0 && item % 1 === 0});
// }
// console.log(getFilterArray([-1, 2, 3.5, -12, 4, 1.25, 16]));


// //--------------------444444------------------

const moveZeros = (array) => array.sort((a,b) => {if (a === 0) return 1; if (b === 0) return -1 ; return 0});

console.log(moveZeros([false, 1, 0, NaN, 2, 0, null, 3, 4, 0, 5]));
console.log(moveZeros([0, 2, 0, 4, 0, 6]));
console.log(moveZeros([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));



// const moveZeros = function (array) {
//     const compareNumeric = function (a, b) {
//         if ((a === 0)) return 1;
//         if ((b === 0)) return -1;
//         return 0;
//     }
//     return array.sort(compareNumeric);
// }
// console.log(moveZeros([false, 1, 0, NaN, 2, 0, null, 3, 4, 0, 5]));
// console.log(moveZeros([0, 2, 0, 4, 0, 6]));
// console.log(moveZeros([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));


// //--------------------555555------------------

// // Наверно решение в лоб ctrl+X ctrl+V
const changeArray = function(array) {

   if (array.length % 2 === 0) {
    let a = array.splice(0, array.length / 2);
    return array.concat(a);
   } 
    let a = array.splice(0, array.length / 2);
    let b = array.splice(1, array.length);
    return b.concat(array,a);
   
}
console.log(changeArray([1, 2, 3, 4, 5, 6, 7, 8])); 
console.log(changeArray([1, 2, 3, 4, 5, 6, 7, 8, 9]));
console.log(changeArray([1, 2]));