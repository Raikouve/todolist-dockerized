const taskArray = [];
const tasksCompleted = [];
const taskList = document.querySelector(".todo-list");
let taskInput = document.querySelector(".task-input");
const buttonAddTask = document.querySelector(".add-task");

if (localStorage.getItem("tasks")) {
  taskArray.push(...JSON.parse(localStorage.getItem("tasks")));
  updateList();
}

if (localStorage.getItem("completed")) {
  tasksCompleted.push(JSON.parse(localStorage.getItem("completed")));
  tasksCompleted.map((taskC, index) => {
    taskC.map((task, index2) => {
      taskList.childNodes[index2].classList.add("completed");
    });
  });
}

function updateList() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  taskArray.map((task) => {
    const newItemList = document.createElement("li");
    newItemList.classList.add("task");
    newItemList.innerHTML = task;
    newItemList.addEventListener("dblclick", setCompleted);
    newItemList.addEventListener("click", setSelected);
    taskList.appendChild(newItemList);
  });
}

function addTodo() {
  taskArray.push(taskInput.value);
  updateList();
  localStorage.setItem("tasks", JSON.stringify(taskArray));
  taskInput.value = "";
}

function setSelected(event) {
  if (event.target.classList.contains("task")) {
    event.target.classList.toggle("selected");
  }
}

function setCompleted(event) {
  if (event.target.classList.contains("task")) {
    event.target.classList.add("completed");
    tasksCompleted.push(event.target.innerHTML);
    if (!localStorage.getItem("completed")) {
      localStorage.setItem("completed", JSON.stringify(tasksCompleted));
    } else {
      localStorage.setItem(
        "completed",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("completed")),
          event.target.innerHTML,
        ])
      );
    }
  }
}

buttonAddTask.addEventListener("click", addTodo);
