const myHref = document.querySelectorAll("a");

myHref.forEach(element => {
    element.addEventListener('mouseover', function mouseOverHandler() {
        element.innerHTML = `${element.title}(${element.href})`;
        element.removeEventListener('mouseover', mouseOverHandler);
    });
});





const myInputs = document.querySelectorAll("input");

myInputs.forEach(element => {
    element.addEventListener('blur', function myInputsBlurHandler(event) {
        console.log(event.target.value);
        element.removeEventListener('blur', myInputsBlurHandler)
    })
})




const numbers = document.querySelectorAll('.numbers');

numbers.forEach(element => {
    element.style.width = "max-content"
    element.style.cursor = "pointer";
    element.addEventListener('click', function numbersClickHandler() {
        let newNumbers = element.innerHTML ** 2;
        element.innerHTML = newNumbers;
        element.removeEventListener('click', numbersClickHandler);
    })
})




const validInput = document.querySelectorAll('.valid-input');

validInput.forEach(input => {
    input.addEventListener('blur', function(){
        if(input.value.length === parseInt(input.getAttribute('data-length'))) {
            input.style.border = "2px solid green";
        } else  input.style.border = "2px solid red";
    });  
    input.addEventListener('focus', () => input.value = ""); // очистка форму для повторного ввода
    
    
})






