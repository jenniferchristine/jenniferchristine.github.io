"use strict";

let newtodobuttonEl = document.getElementById("newtodobutton");
let messageEl = document.getElementById("message");
let newtodoEl = document.getElementById("newtodo");
let todolistEl = document.getElementById("todolist");
let clearbuttonEl = document.getElementById("clearbutton");

clearbuttonEl.addEventListener("click", clearStorage); 
newtodoEl.addEventListener("keyup", checkInput, false);
newtodobuttonEl.addEventListener("click", addToDo, false); 
window.onload = init;

function init() {
    console.log("Initierar...");
    newtodobuttonEl.disabled = true; 

    loadToDo(); 
}

function checkInput() {
    console.log("Input kontrolleras...");

    let input = newtodoEl.value;

    if (input.length > 4) { 
        messageEl.innerHTML = "";
        newtodobuttonEl.disabled = false;
    } else {
        messageEl.innerHTML = "Minst fem tecken";
        newtodobuttonEl.disabled = true;
    }
}

function addToDo() {
    console.log("Lägger till att-göra...");

    let input = newtodoEl.value;
    let newEl = document.createElement("article");
    let newTextNode = document.createTextNode(input);

    newEl.appendChild(newTextNode);
    newEl.className = "todoItems";
    todolistEl.appendChild(newEl); 
    newtodoEl.value = "";
    newtodobuttonEl.disabled = true;

    // Hanterare
    newEl.addEventListener("click", function (e) {
        e.target.remove();

        saveToDo(); 
    });
    saveToDo();
}

function saveToDo() {
    console.log("Lagrar att-göra-lista...");

    let todoItem = document.getElementsByClassName("todoItems");
    let tempArr = [];

    for (let i = 0; i < todoItem.length; i++) {
        tempArr.push(todoItem[i].innerHTML);
    }

    let jsonStr = JSON.stringify(tempArr);
    localStorage.setItem("todoItems", jsonStr);

    console.log(tempArr);
}

function loadToDo() {
    console.log("Läser in att-göra-lista");

    let todoItem = JSON.parse(localStorage.getItem("todoItems"));

    if (todoItem != null) {

        for (let i = 0; i < todoItem.length; i++) {

            let newEl = document.createElement("article");
            let newTextNode = document.createTextNode(todoItem[i]);
            newEl.appendChild(newTextNode);
            newEl.className = "todoItems";

            todolistEl.appendChild(newEl);

            newEl.addEventListener("click", function (e) {
                e.target.remove();

                saveToDo(); 
            });
            console.log(todoItem);
        }
    }
}

function clearStorage() {
    localStorage.clear(); 

    if (localStorage.length === 0) { 
        todolistEl.innerHTML = ""; 

        loadToDo();
    }
}
