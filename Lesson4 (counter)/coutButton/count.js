function makeCounter() {
    let count = 1;
    return function() {
        return count++;
    };
}

const buttons = document.querySelectorAll(".btn");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].innerHTML = `Button ${i + 1} clicks 0`;
    let counter = makeCounter();
    buttons[i].onclick = function() {
        buttons[i].innerHTML = `Button ${i + 1} cliсks ${counter()}`;
    };
} 