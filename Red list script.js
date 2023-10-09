const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-bt");
const taskList = document.getElementById("task-list");
let selectedTask = null;

function addTask() {
  const taskText = taskInput.value;

  if (taskText !== "") {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    const taskLabel = document.createElement("label");
    taskLabel.innerText = taskText;

    const dateTime = document.createElement("span");
    dateTime.innerText = getFormattedDateTime();
    dateTime.classList.add("task-date");

    const completeDiv = document.createElement("div");
    completeDiv.classList.add("complete-div");

    const completedCheckbox = document.createElement("input");
    completedCheckbox.type = "checkbox";
    completedCheckbox.classList.add("complete-checkbox");

    taskContent.appendChild(taskLabel);
    taskContent.appendChild(dateTime);
    taskItem.appendChild(taskContent);
    taskItem.appendChild(completeDiv);
    completeDiv.appendChild(completedCheckbox);
    taskContent.appendChild(completeDiv)

    taskList.appendChild(taskItem);

    taskInput.value = "";
  }
}


function deleteSelectedTask() {
  if (selectedTask) {
    if (selectedTask.classList.contains("hover")) {
      selectedTask.remove();
      selectedTask = null;
    }
  }
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

taskList.addEventListener("change", function (event) {
  const target = event.target;

  if (target.tagName === "INPUT" && target.type === "checkbox") {
    const taskItem = target.parentElement;

    if (target.checked) {
      const completedLabel = document.createElement("span");
      completedLabel.innerText = " completada";
      completedLabel.classList.add("completed-label");

      taskItem.appendChild(completedLabel);
      taskItem.classList.add("completed");
    } else {
      const completedLabel = taskItem.querySelector(".completed-label");
      if (completedLabel) {
        taskItem.removeChild(completedLabel);
      }
      taskItem.classList.remove("completed");
    }
  }
});

taskList.addEventListener("click", function (event) {
  const target = event.target;
  if (target.tagName === "LI") {
    if (selectedTask) {
      selectedTask.classList.remove("selected");
    }
    target.classList.add("selected");
    selectedTask = target;
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (selectedTask || selectedTask.classList.contains("hover")) {
      selectedTask.remove();
      selectedTask = null;
    }
    event.preventDefault();
  }
});

taskList.addEventListener("mouseover", function (event) {
  const target = event.target;
  if (target.tagName === "LI") {
    if (selectedTask) {
      selectedTask.classList.remove("hover");
    }
    target.classList.add("hover");
    selectedTask = target;
  }
});

taskList.addEventListener("mouseout", function (event) {
  const target = event.target;
  if (target.tagName === "LI") {
    target.classList.remove("hover");
  }
});




function getFormattedDateTime() {
  const currentDate = new Date();
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric' 
  };
  return currentDate.toLocaleDateString('es-ES', options);
}



