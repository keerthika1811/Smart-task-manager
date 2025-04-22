// Add Task Function
function addTask() {
    let taskInput = document.getElementById("task").value.trim();
    let priorityInput = document.getElementById("priority").value;

    if (taskInput === "") {
        alert("Please enter a task!");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskInput, priority: priorityInput, completed: false });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    window.location.href = "tasks.html"; // Redirect to tasks page
}

// Load Tasks on tasks.html
function loadTasks(filter = "all") {
    let taskList = document.getElementById("task-list");
    if (!taskList) return;

    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        if (filter !== "all" && task.priority !== filter) return;

        let li = document.createElement("li");
        li.className = task.priority + (task.completed ? " completed" : "");
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleComplete(${index})">✅</button>
                <button onclick="deleteTask(${index})">🗑️</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Toggle Task Completion
function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks(); // Reload tasks
}

// Delete Task
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks(); // Reload tasks
}

// Filter Tasks
function filterTasks(priority) {
    loadTasks(priority);
}

// Go Back to Index Page
function goBack() {
    window.location.href = "index.html";
}

// Load tasks automatically on tasks.html
if (window.location.pathname.includes("tasks.html")) {
    document.addEventListener("DOMContentLoaded", () => loadTasks());
}
