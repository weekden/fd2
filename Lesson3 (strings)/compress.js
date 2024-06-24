function compress(str) {
    let count = 1;
    let compressStr = '';
    let strArray = str.split('');
    for (let i = 0; i < strArray.length; i++) {
        while (strArray[i] === strArray[i + 1]) {
            count = count + 1;
            i++;
        }
        if (count > 1) {
          compressStr += `${strArray[i]}${count}`;
        } else compressStr += `${strArray[i]}`;
    }
    return compressStr;
};




function isNumber(char) {
    const symbol = Number(char);
    if (isNaN(symbol))  {
        return false;
    }  
    return true;
}



function uncompress(str) {
    let uncompressStr = "";
    let strArray = str.split('');
    for (let j = 0; j < strArray.length; j++) {
        let currentChar = strArray[j];

        if (j === 0) {
            uncompressStr = currentChar;
            continue;
        }
        
        let prevChar = strArray[j - 1];

        if (isNumber(strArray[j])) {
            let kof =  strArray[j];
            uncompressStr += prevChar.repeat(kof - 1);
            while (isNumber(strArray[j + 1])) {
                kof = kof + strArray[j + 1];
                j++;
                uncompressStr += prevChar.repeat(kof - 1);
            }  
        } else uncompressStr += currentChar; 
    }
    return uncompressStr;
}


let compressStr = compress('taaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaccb');
console.log(compressStr);

let uncompressStr = uncompress(compressStr);
console.log(uncompressStr);