document.getElementById('toggleDarkMode').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  const icon = this.querySelector('i');
  if (document.body.classList.contains('dark-mode')) {
      icon.classList.remove('bi-moon');
      icon.classList.add('bi-brightness-high');
  } else {
      icon.classList.remove('bi-brightness-high');
      icon.classList.add('bi-moon');
  }
});

document.getElementById('addTaskBtn').addEventListener('click', function() {
  addTaskFromInput();
});

document.getElementById('taskInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTaskFromInput();
  }
});

function addTaskFromInput() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
    showAlert('Tarea añadida', 'success');
  }
}

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
          <button class="btn btn-success btn-sm complete-btn"><i class="bi bi-check"></i></button>
          <button class="btn btn-danger btn-sm delete-btn"><i class="bi bi-trash"></i></button>
        </div>
      `;
      taskList.appendChild(taskItem);

      taskItem.querySelector('.complete-btn').addEventListener('click', function() {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(filter);
        showAlert('Tarea completada', 'success');
      });

      taskItem.querySelector('.delete-btn').addEventListener('click', function() {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(filter);
        showAlert('Tarea eliminada', 'danger');
      });
    }
  });
}

function showAlert(message, type) {
  const alertContainer = document.getElementById('alertContainer');
  const alert = document.createElement('div');
  alert.className = `alert alert-${type} alert-dismissible fade show`;
  alert.role = 'alert';
  alert.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  alertContainer.appendChild(alert);

  setTimeout(() => {
    alert.classList.remove('show');
    alert.classList.add('hide');
    setTimeout(() => alert.remove(), 500);
  }, 1000);
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