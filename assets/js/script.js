//hi:)
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {
    event.preventDefault(); //4.2.5 tells browser to not to refresh/default browser behavior (and keep remainder in text box)
    var taskNameInput = document.querySelector("input[name='task-name']").value; //4.2.6
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //check if input values are empty strings 4.2.8
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset(); //4.2.8

    // reset form fields for next task to be entered (from snapcode)
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

    //package up data as an object 4.2.7
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an arguement to createTaskEl
    createTaskEl(taskDataObj);
};

//taskDataObj
var createTaskEl = function(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    console.dir(listItemEl); //(from snapcode)

    // add entire list item to list

    // JB New code
    // Vanilla JS
    var ul = document.getElementById("tasks-to-do");
    ul.appendChild(listItemEl);

    // tracees old code
    // jquery
    // tasksToDoEl.appendChild(listItemEl);

};

formEl.addEventListener("submit", taskFormHandler); //on a button click, create a task