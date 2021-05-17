var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {
    event.preventDefault(); //4.2.5 tells browser to not to refresh/default browser behavior (and keep remainder in text box)
    var taskNameInput = document.querySelector("input[name='task-name']").value; //4.2.6
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl); //???

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    // var listItemEl = document.createElement("li");
    // listItemEl.className = "task-item";
    // listItemEl.textContent = taskNameInput;
    // tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler); //on a button click, create a task