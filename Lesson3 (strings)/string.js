

const countVowelLetters = function(str) {
    const russianVowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
    let lowerCaseStr = str.toLowerCase()
    let rewArray = lowerCaseStr.split('');
    let count = 0;
    for (let i = 0; i < rewArray.length; i++){
     if(russianVowels.indexOf(rewArray[i]) !== -1) {
         count = count + 1;
     }
    }
    return `количество гласных букв: ${count}`
 }
 console.log(countVowelLetters("Не будете ли Вы так любезны, Иван, передать мне блокнот и Известия"));
 