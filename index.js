
const darkMode = document.getElementById("dark");
const lightMode = document.getElementById("light");

darkMode.addEventListener("click", function () {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
});

lightMode.addEventListener("click", function () {
    document.body.style.backgroundColor = "beige";
    document.body.style.color = "brown";
});

const taskInput = document.getElementById("add-task-title");
const taskDescription = document.getElementById("add-task-description");
const taskPriority = document.getElementById("add-task-priority");
const taskDueDate = document.getElementById("add-task-date");

const taskSubmit = document.getElementById("add-submit-btn");

const pendingTask = document.getElementById("pending-tasks")
const completedTask = document.getElementById("completed-tasks")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function displayTask() {
    pendingTask.innerHTML = "";
    completedTask.innerHTML = "";

    tasks.forEach(function (task,index) {

        const taskDiv = document.createElement("div")
        taskDiv.className = "task"

        const title = document.createElement("h3")
        title.innerText = task.title

        const description = document.createElement("p")
        description.innerText = "Description: " + task.description;

        const priority = document.createElement("p");
        priority.innerText = task.priority ? "Yes" : "No"

        const dueDate = document.createElement("p");
        dueDate.innerText = task.dueDate

        taskDiv.appendChild(title);
        taskDiv.appendChild(description);
        taskDiv.appendChild(priority);
        taskDiv.appendChild(dueDate);

        if (task.completed) {

            const completedTask = document.createElement("h2");
            completedTask.innerText = "Completed";
            taskDiv.appendChild(completeTask);

        } else {

            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.onclick = function () {
                editTask(index);
            };

            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.onclick = function () {
                deleteTask(index);
            };

            const completeBtn = document.createElement("button");
            completeBtn.innerText = "Complete";
            completeBtn.onclick = function () {
                completeTask(index);
            };

            taskDiv.appendChild(editBtn);
            taskDiv.appendChild(deleteBtn);
            taskDiv.appendChild(completeBtn);

            pendingTask.appendChild(taskDiv);
        }

    });

}

function clearForm() {
    taskInput.value = ""
    taskDescription.value = ""
    taskPriority.checked = false
    taskDueDate.value = ""
}
let id=-1;
taskSubmit.addEventListener("click", function (e) {

    e.preventDefault();
    const task = {
        title: taskInput.value,
        description: taskDescription.value,
        priority: taskPriority.checked,
        dueDate: taskDueDate.value,
        completed: false

    };

    if (id == -1) {
        tasks.push(task);
    }

    else {
        task.completed = tasks[id].completed;
        tasks[id] = task;
        id = -1;
    }
    saveTask();
    displayTask();
    clearForm();

});
function editTask(index) {
    id = index;
    taskInput.value = tasks[index].title;
    taskDescription.value = tasks[index].description;
    taskPriority.checked = tasks[index].priority;
    taskDueDate.value = tasks[index].dueDate;

}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTask();
    displayTask();
}

function completeTask(index) {
    tasks[index].completed = true;
    saveTask();
    displayTask();
}

displayTask();
    
