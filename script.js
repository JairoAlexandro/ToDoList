document.getElementById('toggleDarkMode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  });
  
  document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      addTask(taskText);
      taskInput.value = '';
    }
  });
  
  function addTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTask = {
      text: taskText,
      completed: false
    };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
  
  function renderTasks(filter = 'all') {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task, index) => {
      if (filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'incomplete' && !task.completed)) {
        const taskItem = document.createElement('li');
        taskItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        if (task.completed) {
          taskItem.classList.add('completed');
        }
        taskItem.innerHTML = `
          ${task.text}
          <div>
            <button class="btn btn-success btn-sm complete-btn">Completar</button>
            <button class="btn btn-danger btn-sm delete-btn">Eliminar</button>
          </div>
        `;
        taskList.appendChild(taskItem);
  
        taskItem.querySelector('.complete-btn').addEventListener('click', function() {
          tasks[index].completed = !tasks[index].completed;
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks(filter);
        });
  
        taskItem.querySelector('.delete-btn').addEventListener('click', function() {
          tasks.splice(index, 1);
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks(filter);
        });
      }
    });
  }
  
  document.getElementById('showAllTasks').addEventListener('click', function() {
    renderTasks('all');
  });
  
  document.getElementById('showCompletedTasks').addEventListener('click', function() {
    renderTasks('completed');
  });
  
  document.getElementById('showIncompleteTasks').addEventListener('click', function() {
    renderTasks('incomplete');
  });
  
  window.onload = function() {
    renderTasks();
  };