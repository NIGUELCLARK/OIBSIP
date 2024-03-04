
    let tasks = [];

    function showAddTaskPopup() {
      document.getElementById('addTaskPopup').style.display = 'flex';
      document.querySelector('.overlay').style.display = 'block';
      document.getElementById('addTaskPopup').classList.add('fade-in');
    }

    function saveTask() {
      const title = document.getElementById('taskTitle').value;
      const description = document.getElementById('taskDescription').value;

      tasks.push({ title, description, completed: false });
      updateTaskList();
      closePopup();
    }

    function updateTaskList() {
      const pendingTaskList = document.getElementById('pendingTaskList');
      const completedTaskList = document.getElementById('completedTaskList');
      pendingTaskList.innerHTML = '';
      completedTaskList.innerHTML = '';

      tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        if (task.completed) {
          taskElement.classList.add('completed');
          completedTaskList.appendChild(taskElement);
        } else {
          pendingTaskList.appendChild(taskElement);
        }
        taskElement.innerHTML = `
          <span>${task.title}</span>
          <button onclick="editTask(${index})">Edit</button>
          <button onclick="deleteTask(${index})">Delete</button>
          <button onclick="completeTask(${index})">Complete</button>
        `;
      });
    }

    function editTask(index) {
      const task = tasks[index];
      document.getElementById('editTaskTitle').value = task.title;
      document.getElementById('editTaskDescription').value = task.description;

      // Set the onclick function for the "Update" button
      document.getElementById('editTaskPopup').querySelector('button').onclick = function() { updateTask(index); };

      document.getElementById('editTaskPopup').style.display = 'flex';
      document.querySelector('.overlay').style.display = 'block';
      document.getElementById('editTaskPopup').classList.add('fade-in');
    }

    function updateTask(index) {
      tasks[index].title = document.getElementById('editTaskTitle').value;
      tasks[index].description = document.getElementById('editTaskDescription').value;

      updateTaskList();
      closePopup();
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      updateTaskList();
    }

    function completeTask(index) {
      tasks[index].completed = true;
      updateTaskList();
    }

    function closePopup() {
      document.querySelectorAll('.popup').forEach(popup => {
        popup.style.display = 'none';
        popup.classList.remove('fade-in');
      });
      document.querySelector('.overlay').style.display = 'none';
    }

    // Initial dummy tasks
    tasks.push({ title: 'Task 1', description: 'Description 1', completed: false });
    tasks.push({ title: 'Task 2', description: 'Description 2', completed: false });

    updateTaskList();
 
