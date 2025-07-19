const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const status = document.getElementById("status");

let tasks = [];

function updateStatus() {
  const completed = tasks.filter(t => t.completed).length;
  const uncompleted = tasks.length - completed;
  status.textContent = `Completed: ${completed} | Uncompleted: ${uncompleted}`;
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => {
      task.completed = checkbox.checked;
      renderTasks();
      updateStatus();
    };

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    const buttons = document.createElement("div");
    buttons.className = "task-buttons";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
      updateStatus();
    };

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => {
      const newTask = prompt("Edit task:", task.text);
      if (newTask !== null && newTask.trim() !== "") {
        task.text = newTask;
        renderTasks();
        updateStatus();
      }
    };

    buttons.appendChild(deleteBtn);
    buttons.appendChild(editBtn);

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(buttons);

    taskList.appendChild(li);
  });
}

function addTask() {
  const task = taskInput.value.trim();
  if (task !== "") {
    tasks.push({ text: task, completed: false });
    taskInput.value = "";
    renderTasks();
    updateStatus();
  }
}