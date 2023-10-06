"use strict";

// Variabler

let newtodobuttonEl = document.getElementById("newtodobutton"); // Lägg-till-knapp
let messageEl = document.getElementById("message"); // Felmeddelande
let newtodoEl = document.getElementById("newtodo"); // Box för text
let todolistEl = document.getElementById("todolist"); //Listan items läggs inuti
let clearbuttonEl = document.getElementById("clearbutton"); // Återställ-knapp

// Events (för när något ska hända, så som knappar)

clearbuttonEl.addEventListener("click", clearStorage); // Event för clear
newtodoEl.addEventListener("keyup", checkInput, false); // Event för att stämma av input
newtodobuttonEl.addEventListener("click", addToDo, false); // Event för att addera till lsita
window.onload = init;

// Väntar på att läsa in data

function init() {
    console.log("Initierar...");
    newtodobuttonEl.disabled = true; // Knappen funkar ej

    loadToDo(); // Läs in att-göra-lista
}

// Stämmer av input

function checkInput() {
    console.log("Input kontrolleras...");

    let input = newtodoEl.value;

    if (input.length > 4) { // Villkor för om texten är mer än 4st
        messageEl.innerHTML = "";
        newtodobuttonEl.disabled = false; // = Knappen funkar
    } else {
        messageEl.innerHTML = "Minst fem tecken"; // Meddelande om mindre än 4st
        newtodobuttonEl.disabled = true; // = Knappen funkar ej
    }
}

// Lägg till punkt på listan

function addToDo() {
    console.log("Lägger till att-göra...");

    let input = newtodoEl.value;

    // För att få nya element
    let newEl = document.createElement("article"); // Skapa <article>
    let newTextNode = document.createTextNode(input);

    newEl.appendChild(newTextNode);
    newEl.className = "todoItems";
    todolistEl.appendChild(newEl); // Lägger till i föräldra-element

    newtodoEl.value = ""; // Lägger ej till om inget är skrivet
    newtodobuttonEl.disabled = true;

    // Hanterare
    newEl.addEventListener("click", function (e) { // Tar bort en "att-göra" via klick
        e.target.remove();

        saveToDo(); // Lagrar endast borttagningen
    });
    saveToDo(); // Lagrar tillägget
}

// Spara "att-göra" till Web Storage

function saveToDo() {
    console.log("Lagrar att-göra-lista...");

    let todoItem = document.getElementsByClassName("todoItems");

    let tempArr = []; // Tom array

    for (let i = 0; i < todoItem.length; i++) { // Loop för att beräkna array
        tempArr.push(todoItem[i].innerHTML); // Push för lägga i tom array
    }

    let jsonStr = JSON.stringify(tempArr); // Konvertera
    localStorage.setItem("todoItems", jsonStr); // Lagra i Web Storage

    console.log(tempArr); // Visar arrayena 
}

// Läs in "att-göra" till Web Storage

function loadToDo() {
    console.log("Läser in att-göra-lista");

    // Läs in och konvertera från JSON till array
    let todoItem = JSON.parse(localStorage.getItem("todoItems"));

    if (todoItem != null) {

        for (let i = 0; i < todoItem.length; i++) {

            let newEl = document.createElement("article");
            let newTextNode = document.createTextNode(todoItem[i]);
            newEl.appendChild(newTextNode);
            newEl.className = "todoItems";

            todolistEl.appendChild(newEl);

            // Klick-hanterare
            newEl.addEventListener("click", function (e) {
                e.target.remove();

                saveToDo(); // Lagra listan på nytt
            });
            console.log(todoItem);
        }
    }
}

function clearStorage() { // Funktion för att rensa sidan
    localStorage.clear(); // Rensa Web Storage

    if (localStorage.length === 0) { // Villkor för om webben tömts...
        todolistEl.innerHTML = ""; // ... Ska också listan göras det direkt

        loadToDo();
    }
}
