const myArray = ["Brest", "Warsaw", "Barcelona", "Paris", "Rome", "Bratislava", "Portu"];

const toDoList = document.createElement("div");
document.body.prepend(toDoList);

const ol = document.createElement("ol");
toDoList.append(ol);

const input = document.createElement("input");
input.type = "text";
input.placeholder = "Enter the city!";
input.style.height = "30px";
input.style.margin = "0 20px";
toDoList.append(input);
input.focus();

const buttonAdd = document.createElement("button");
buttonAdd.innerHTML = `Add`;
toDoList.append(buttonAdd);

const buttonRemove = document.createElement("button");
buttonRemove.innerHTML = `Remove`;
toDoList.append(buttonRemove);

function generateList(item) {
    const li = document.createElement("li");
    li.innerHTML = item;
    ol.append(li);
    li.classList.add("city-name")
    li.style.padding = "10px 20px";
    li.style.width = "max-content";
}

myArray.forEach((item) => generateList(item));

function addLiItem() {
    const inputValue = document.querySelector("input").value;

    if (inputValue !== "") {
        myArray.push(inputValue);
        generateList(inputValue);
        buttonRemove.disabled = false;
        if (!buttonRemove.disabled) {
            buttonRemove.style.opacity = "1";
            buttonRemove.style.cursor = "pointer";
        }
    }
    document.querySelector("input").value = "";
}

function deleteLiItem() {
    if (myArray.length > 0) {
        myArray.pop();
        ol.lastElementChild.remove();
        if (myArray.length === 0) {
            buttonRemove.disabled = true;
            if (buttonRemove.disabled) {
                buttonRemove.style.opacity = "0.5";
                buttonRemove.style.cursor = "default";
            }
        }
    }
}

buttonAdd.addEventListener("click", function () {
    addLiItem();
});

document.querySelector("input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addLiItem();
    }
});

buttonRemove.addEventListener("click", function () {
    deleteLiItem();
});


const olContainer = document.querySelector("ol");

function editListItem(event) {
    if (event.target.classList.contains("city-name")) {
        const newInput = document.createElement("input");
        newInput.value = event.target.innerHTML;
        event.target.innerHTML = "";
        event.target.append(newInput);
        newInput.focus();
        newInput.onblur = function () {
            event.target.innerHTML = newInput.value;
            olContainer.addEventListener("click", editListItem);
        };
        olContainer.removeEventListener("click", editListItem);
    }
}

olContainer.addEventListener("click", editListItem);



const buttons = document.querySelectorAll("button");
buttons.forEach(function (button) {
    button.style.padding = "10px 20px";
    button.style.backgroundColor = "#4CAF50";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "4px";
    button.style.cursor = "pointer";
    button.style.marginRight = "10px";
});

const inputs = document.querySelectorAll("input");
inputs.forEach(function (inputs) {
    inputs.style.height = "30px";
    inputs.style.marginRight = "10px";
});