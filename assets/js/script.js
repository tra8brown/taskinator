//hi:)
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content"); //4.3.7

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

    console.dir(listItemEl); //(from snapcode)

    // JB New code 4.2.9
    // Vanilla JS
    var ul = document.getElementById("tasks-to-do");
    ul.appendChild(listItemEl);

    var taskActionsEl = createTaskActions(taskIdCounter); //4.3.6
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);

    // tracees old code
    // jquery
    // tasksToDoEl.appendChild(listItemEl); //undid comment at 4.3.5 //commented again bc of errors:'appendchild' of null
    // tasksToDoEl mentioned again in 4.3.6!!! 

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

    actionContainerEl.appendChild(deleteButtonEl); //4.3.6.

    var statusSelectEl = document.createElement("select"); //4.3.6
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do", "In Progress", "Completed"]; //4.3.6
    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select 4.3.6
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
}
var taskButtonHandler = function(event) { //4.3.7
    console.log(event.target);
};


formEl.addEventListener("submit", taskFormHandler); //on a button click, create a task

pageContentEl.addEventListener("click", taskButtonHandler); //4.3.7