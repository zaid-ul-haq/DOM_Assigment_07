// Get elements
var taskInput = document.getElementById("taskInput");
var addBtn    = document.getElementById("addBtn");
var clearBtn  = document.getElementById("clearBtn");
var taskList  = document.getElementById("taskList");

// ── Load tasks from localStorage when page opens ──────────────────
window.addEventListener("load", function() {
  var savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(function(task) {
    createTaskItem(task.text, task.completed);
  });
});


// ── Task 1: Add Task ──────────────────────────────────────────────
addBtn.addEventListener("click", function() {
  var text = taskInput.value.trim();

  // Do not allow empty tasks
  if (text === "") {
    alert("Please enter a task!");
    return;
  }

  createTaskItem(text, false);
  taskInput.value = "";
  saveToLocalStorage();
});


// ── Create a task <li> element ────────────────────────────────────
function createTaskItem(text, isCompleted) {

  // Create <li>
  var li = document.createElement("li");

  // Create task text span
  var span = document.createElement("span");
  span.textContent = text;
  span.className = "task-text";

  // Task 2: Mark as completed on click
  if (isCompleted) {
    span.classList.add("completed");
  }
  span.addEventListener("click", function() {
    span.classList.toggle("completed");
    saveToLocalStorage();
  });

  // Task 4: Edit button
  var editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";
  editBtn.addEventListener("click", function() {
    var newText = prompt("Edit your task:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText.trim();
      saveToLocalStorage();
    }
  });

  // Task 3: Delete button
  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", function() {
    taskList.removeChild(li);
    saveToLocalStorage();
  });

  // Put everything inside <li>
  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  // Add <li> to <ul>
  taskList.appendChild(li);
}


// ── Task 5: Save all tasks to localStorage ────────────────────────
function saveToLocalStorage() {
  var allItems = taskList.querySelectorAll("li");
  var tasks = [];

  allItems.forEach(function(li) {
    var span = li.querySelector(".task-text");
    tasks.push({
      text: span.textContent,
      completed: span.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// ── Task 6: Clear All Tasks ───────────────────────────────────────
clearBtn.addEventListener("click", function() {
  taskList.innerHTML = "";
  localStorage.clear();
});
