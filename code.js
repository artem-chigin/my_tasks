let input = document.getElementById("input-task");
let taskList = document.getElementById("task-list");
let info = document.getElementById("info")
let tasks = [];

function renderTasks(listValue) {
    let index = 0;
    for (let task of listValue) {
        let [taskContent, state] = task;
        let newLi = document.createElement("li");
        newLi.setAttribute("id", index.toString());
        index += 1;
        let newCheckbox = document.createElement("input");
        newCheckbox.setAttribute("type", "checkbox");
        newCheckbox.setAttribute("onclick", "taskDone(this)");
        newCheckbox.checked = state;
        newLi.appendChild(newCheckbox);
        let newSpan = document.createElement("span");
        newSpan.setAttribute("class", "task")
        newSpan.textContent = taskContent;
        if (state) {
            newSpan.style.textDecoration = "line-through";
        }
        newLi.appendChild(newSpan);
        let newButton = document.createElement("button");
        newButton.setAttribute("class", "delete-btn");
        newButton.setAttribute("onclick", 'deleteTask(this)');
        newButton.textContent = "Delete";
        newLi.appendChild(newButton);
        taskList.appendChild(newLi);
        input.value = "";
    }


}

function addTask() {
    taskList.innerHTML = "";
    let newTask = [input.value, false];
    tasks.push(newTask);
    renderTasks(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(element) {
    let liForDelete = element.parentNode;
    let indexForDelete = liForDelete.id;
    tasks.splice(indexForDelete, 1);
    taskList.innerHTML = "";
    renderTasks(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function taskDone(element) {
    let parentIndex = element.parentNode.id;
    tasks[parentIndex][1] = element.checked;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    let content = element.nextSibling;
    if (element.checked === true) {
        content.style.textDecoration = "line-through";
    } else {
        content.style.textDecoration = "none";
    }
}

function clearLocalStorage() {
    localStorage.clear();
}

tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks(tasks);

