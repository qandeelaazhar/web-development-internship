const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const remainingCount = document.getElementById("remainingCount");
const completedCount = document.getElementById("completedCount");
const clearBtn = document.getElementById("clearBtn");
const filterButtons = document.querySelectorAll(".filter-btn");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
renderTasks();
addTask.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text === "") {
        alert("Task cannot be empty!");
        return;
    }
    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        dueDate: dueDate.value,
        priority: priority.value
    };
    tasks.push(task);
    saveTasks();
    taskInput.value = "";
    dueDate.value = "";
    priority.value = "Low";
    renderTasks();
});
function renderTasks() {
    taskList.innerHTML = "";
    let filteredTasks = tasks;
    if (currentFilter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }
    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }
    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";
        if (task.completed) {
            li.classList.add("completed");
        }
        li.innerHTML = `
            <button class="complete-btn">
                <i class="${task.completed ? "fa-solid fa-circle-check" : "fa-regular fa-circle"}"></i>
            </button>
            <div style="flex:1; margin-left:15px;">
                <span class="task-text">${task.text}</span>
                <br>
                <small>
                    Priority:
                    <strong>${task.priority}</strong>
                    ${task.dueDate ? "| Due: " + task.dueDate : ""}
                </small>
            </div>
            <button class="delete-btn">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        li.querySelector(".complete-btn").addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });
        li.querySelector(".delete-btn").addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });
        li.querySelector(".task-text").addEventListener("dblclick", () => {
            const newText = prompt("Edit Task", task.text);
            if (newText !== null && newText.trim() !== "") {
                task.text = newText.trim();
                saveTasks();
                renderTasks();
            }
        });
        taskList.appendChild(li);
    });
    updateCounters();
}
function updateCounters() {
    const remaining = tasks.filter(task => !task.completed).length;
    const completed = tasks.filter(task => task.completed).length;
    remainingCount.textContent = remaining;
    completedCount.textContent = completed;
}
clearBtn.addEventListener("click", () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
});
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        currentFilter = button.dataset.filter;
        renderTasks();
    });
});
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));

}