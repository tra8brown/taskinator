//hi:)
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content"); //4.3.7
var tasksInProgressEl = document.querySelector("#tasks-in-progress"); //4.3.10
var tasksCompletedEl = document.querySelector("#tasks-completed"); //4.3.10
var tasks = []; //4.4.4

var taskFormHandler = function(event) {
    event.preventDefault(); //4.2.5 tells browser to not to refresh/default browser behavior (and keep remainder in text box)
    var taskNameInput = document.querySelector("input[name='task-name']").value; //4.2.6
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //check if input values are empty strings 4.2.8
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset(); //4.2.8 erases what's in the submit box (*not in snapcode)

    // reset form fields for next task to be entered (from snapcode)
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

    var isEdit = formEl.hasAttribute("data-task-id"); //4.3.9

    //has data attribute, so get task id and call function to complete edit process 4.3.9
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    //no data attribute, so create object as normal adn pass to createTaskEl function
    else {
        //package up data as an object 4.2.7
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        //send it as an argument to createTaskEl
        createTaskEl(taskDataObj);
    }
};

//taskDataObj CREATETASKEL ()
var createTaskEl = function(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //add task id as a custom attribute 4.3.5
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter); //4.3.6
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);

    taskDataObj.id = taskIdCounter;

    tasks.push(taskDataObj);

    saveTasks(); //4.4.5

    //increase task counter for next unique id 4.3.5
    taskIdCounter++;
};

var createTaskActions = function(taskId) { //4.3.6
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button 4.3.6
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    //create delete button 4.3.6
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select"); //4.3.6 
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);
    var statusChoices = ["To Do", "In Progress", "Completed"]; //4.3.6
    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select 4.3.6
        statusSelectEl.appendChild(statusOptionEl);
    }

    //To Do drop menu
    actionContainerEl.appendChild(statusSelectEl); //(*not in snapcode so i commented it out??)

    return actionContainerEl;
};

var completeEditTask = function(taskName, taskType, taskId) { //4.3.9
    //find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + ";]");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    //loop through tasks array and task object with new content 4.4.4
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }
    saveTasks(); //4.4.5

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    formEl.querySelector("#save-task").textContent = "Add Task"; //(*wrong in snapcode or lesson??? it's document.querySelector in lesson 4.3.9)
};


var taskButtonHandler = function(event) { //4.3.7
    //task target element from event 4.3.8
    var targetEl = event.target;

    //edit button was clicked 4.3.8
    if (targetEl.matches(".edit-btn")) {
        console.log("edit", targetEl);
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    //delete button was clicked 4.3.8
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var taskStatusChangeHandler = function(event) {
    // get the task items id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase(); //(*snapcode has 153, 156 switched)

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
    saveTasks(); //4.4.5
};

//update task's in tasks array
for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
        tasks[i].status = statusValue;
        console.log(tasks);
    }
}

var editTask = function(taskId) { //4.3.8
    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    formEl.querySelector("#save-task").textContent = "SaveTask";
    formEl.setAttribute("data-task-id", taskId);
};

var deleteTask = function(taskId) {
    console.log(taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    //create new array to hold updated list of tasks 4.4.4
    var updatedTaskArr = [];

    //loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        //if tasks[i].id doesn't match the value of taskId, let's keep that task
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    //reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    saveTasks(); //4.4.5
};

//saving tasks to localStorage 4.4.5
var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

//loadTasks()
var loadTask = function() {
    //get task items from localStorage
    var savedTasks = localStorage.getItem("tasks");

    //converts tasks from the string format back into an array of objects
    if (!savedTasks) {
        return false;
    }
    console.log("Saved tasks found!");

    savedTasks = JSON.parse(savedTasks);

    //iterates through a tasks array and creates task elements on the page from it.
    for (var i = 0; i < savedTasks.length; i++) {
        createTaskEl(savedTasks[i]);
    }
};



formEl.addEventListener("submit", taskFormHandler); //on a button click, create a task

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);