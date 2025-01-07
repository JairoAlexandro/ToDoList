document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
 
    loadTasks();
  
    addTaskBtn.addEventListener("click", addTask);
  
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === "") return alert("Por favor, escribe una tarea.");
  
      const taskItem = createTaskItem(taskText);
      taskList.appendChild(taskItem);
      saveTasks();
  
      taskInput.value = ""; 
    }
  
    function createTaskItem(text) {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${text}</span>
        <div class="buttons">
          <button class="complete-btn">Completar</button>
          <button class="delete-btn">Eliminar</button>
        </div>
      `;

      li.querySelector(".complete-btn").addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
      });

      li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
        saveTasks();
      });
  
      return li;
    }
  
    function saveTasks() {
      const tasks = [];
      taskList.querySelectorAll("li").forEach(task => {
        tasks.push({
          text: task.querySelector("span").innerText,
          completed: task.classList.contains("completed")
        });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => {
        const taskItem = createTaskItem(task.text);
        if (task.completed) taskItem.classList.add("completed");
        taskList.appendChild(taskItem);
      });
    }
  });
  