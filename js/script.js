const taskInput = document.getElementById('task-input');
const taskDateInput = document.getElementById('task-date');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const clearCompletedButton = document.getElementById('clear-completed');
const clearAllButton = document.getElementById('clear-all');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        addTaskToDOM(task.text, task.date, task.completed, index);
    });
}

function addTaskToDOM(taskText, taskDate, isCompleted = false, index) {
    const li = document.createElement('li');
    if (isCompleted) {
        li.classList.add('completed');
    }
    
    const taskSpan = document.createElement('span'); 
    taskSpan.textContent = taskText;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'task-date';
    dateSpan.textContent = taskDate ? ` (Fecha: ${taskDate})` : '';

    const editButton = document.createElement('button');
    editButton.innerHTML = '✎'; // Lápiz minimalista como ícono

    editButton.addEventListener('click', () => {
        const newText = prompt('Edita la tarea:', taskText);
        if (newText !== null) {
            tasks[index].text = newText; // Actualizar el texto en el arreglo
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    });

    li.addEventListener('click', () => {
        tasks[index].completed = !tasks[index].completed; // Alternar estado de completado
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(); // Volver a renderizar la lista
    });

    li.appendChild(taskSpan);
    li.appendChild(dateSpan);
    li.appendChild(editButton);
    taskList.appendChild(li);
}

// Add task
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const taskDate = taskDateInput.value;

    if (taskText) {
        const newTask = {
            text: taskText,
            date: taskDate,
            completed: false
        };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        taskDateInput.value = '';
        renderTasks();
    }
});


// Clear completed tasks
clearCompletedButton.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
});

// Clear all tasks
clearAllButton.addEventListener('click', () => {
    tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
});

const toggleModeButton = document.getElementById('toggle-mode');
const modeIcon = document.getElementById('mode-icon'); // Obtener el ícono del modo

toggleModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // Alternar clase para modo oscuro
    // Cambiar el ícono según el modo
    if (document.body.classList.contains('dark-mode')) {
        modeIcon.textContent = '☀️'; // Ícono de sol para modo claro
    } else {
        modeIcon.textContent = '🌙'; // Ícono de luna para modo oscuro
    }
});


// Initial render
renderTasks();
