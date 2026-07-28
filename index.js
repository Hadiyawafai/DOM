
const toggleButton=document.getElementById('toggleBtn')

toggleButton.addEventListener('click',function(){
     if(toggleButton.innerText=='Light'){
    document.body.classList.add('darkBg')
    document.body.classList.add('darkColor')
    toggleButton.innerText='Dark'
 }
 else{
     document.body.classList.remove('darkBg')
    document.body.classList.remove('darkColor')
    toggleButton.innerText='Light'
 }
})

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
        title.innerText = "title"+ task.title

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

            const completeTask = document.createElement("h2");
            completeTask.innerText = "✔";
            completeTask.setAttribute('aria-label',"Completed")
            taskDiv.appendChild(completeTask)
            completedTask.appendChild(taskDiv)

        } else {
            const editBtn = document.createElement("button");
            editBtn.innerText = "✏️";
            editBtn.setAttribute('aria-label',"Edit")
             editBtn.dataset.action = "edit";
             editBtn.dataset.index = index;
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "❌";
            deleteBtn.setAttribute('aria-label','Delete')
            deleteBtn.dataset.action = "delete";
             deleteBtn.dataset.index = index;

            const completeBtn = document.createElement("button");
            completeBtn.innerText = "Complete";
            completeBtn.dataset.action = "complete";
            completeBtn.dataset.index = index;

            taskDiv.appendChild(editBtn);
            taskDiv.appendChild(deleteBtn);
            taskDiv.appendChild(completeBtn);

            pendingTask.appendChild(taskDiv);
        }

    });

}
pendingTask.addEventListener('click',function(){
    if(e.target.tagName === "BUTTON"){
          const action = e.target.dataset.action;
        const index = Number(e.target.dataset.index);
         if(action === "edit"){
            editTask(index);
        }
        else if(action === "delete"){
            deleteTask(index);
        }
        else if(action === "complete"){
            completeTask(index);
        }
    }
      
    }
)
function clearForm() {
    taskInput.value = ""
    taskDescription.value = ""
    taskPriority.checked = false
    taskDueDate.value = ""
}

let id=null;
taskSubmit.addEventListener("click", function (e) {

    e.preventDefault();
    if(taskInput.value.length>5){
        alert("more than 5 chars are allowed")
         return;
    }
    else if(taskDescription.value.length>20){
         alert("more than 20 chars are allowed")
          return;
    }
    else{
        alert("form submitted")
    }

    const task = {
        title: taskInput.value,
        description: taskDescription.value,
        priority: taskPriority.checked,
        dueDate: taskDueDate.value,
        completed: false

    };

    if (id == null) {
        tasks.push(task);
    }

  else {
    tasks[id] = {
        ...tasks[id],
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate
    }
      id = null
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
    