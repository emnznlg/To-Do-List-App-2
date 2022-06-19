//Selectors

const userInput = document.querySelector(".input-area input");
const addBtn = document.querySelector(".input-area button");
const todoListContainer = document.querySelector(".todos");
const completedBtn = document.querySelector(".todo-area .fa-check");

//Event Listeners

document.addEventListener("DOMContentLoaded", getTasksFromLocalStorage);
addBtn.addEventListener("click", addTodo);
todoListContainer.addEventListener("click", markTaskAsCompleted);
todoListContainer.addEventListener("click", deleteTask);

//Functions

function addTodo() {
  let li = `<li class="todo">
                <p>${userInput.value}</p>
                <div class="buttons">
                    <i class="fa-solid fa-check uncompleted"></i>
                    <i class="fa-solid fa-trash deleted"></i>
                </div>
            </li>`;

  if (userInput.value.trim().length == 0 || !userInput.value) {
    alert("Please enter a task");
  } else {
    todoListContainer.insertAdjacentHTML("beforeend", li);
    saveLocalStorage(userInput.value.trim());
    userInput.value = "";
  }
}

function saveLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    tasks.forEach(function (task) {
      let li = `<li class="todo">
                  <p>${task}</p>
                    <div class="buttons">
                        <i class="fa-solid fa-check uncompleted"></i>
                        <i class="fa-solid fa-trash deleted"></i>
                    </div>
                </li>`;

      todoListContainer.insertAdjacentHTML("beforeend", li);
    });
  }
}

function markTaskAsCompleted(e) {
  const clickedBtn = e.target;

  if (clickedBtn.classList[2] === "uncompleted") {
    clickedBtn.parentElement.previousElementSibling.style.textDecoration =
      "line-through";
    clickedBtn.parentElement.previousElementSibling.style.opacity = "0.5";

    clickedBtn.classList.add("completed");
    clickedBtn.classList.remove("uncompleted");
  } else if (clickedBtn.classList[2] === "completed") {
    clickedBtn.parentElement.previousElementSibling.style.textDecoration =
      "none";
    clickedBtn.parentElement.previousElementSibling.style.opacity = "1";
    clickedBtn.classList.add("uncompleted");
    clickedBtn.classList.remove("completed");
  }

  // I couldn't save the task as completed on Local Storage, so when you refresh the page, they will appear as "uncompleted" :(((
}

function deleteTask(e) {
  clickedBtn = e.target;
  listItem = clickedBtn.parentElement.parentElement;
  if (clickedBtn.classList[2] == "deleted") {
    listItem.remove();
    deleteTaskFromLocalStorage(listItem);
  }
}

function deleteTaskFromLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  const listItemInnerText = task.innerText;
  tasks.splice(tasks.indexOf(listItemInnerText), 1);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
