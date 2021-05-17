var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function() {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
};

buttonEl.addEventListener("click", createTaskHandler); //on a button click, create a task
// var listItemEl = document.createElement("li");
// listItemEl.className = "task-item";
// listItemEl.textContent = "This is a new Task.";
// tasksToDoEl.appendChild(listItemEl);
// console.log(buttonEl);