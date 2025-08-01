// timer 
let timer;
let timeLeft = 25 * 60;
let currentMode = 'pomodoro';

const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

function updateDisplay() {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  displayMinutes.textContent = String(mins).padStart(2, '0');
  displaySeconds.textContent = String(secs).padStart(2, '0');
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      alert('Tijd is om!');
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  setMode(currentMode);
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// modes 
const modeButtons = document.querySelectorAll('.mode');

function setMode(mode) {
  currentMode = mode;
  if (mode === 'pomodoro') timeLeft = 25 * 60;
  if (mode === 'shortBreak') timeLeft = 5 * 60;
  if (mode === 'longBreak') timeLeft = 15 * 60;
  updateDisplay();
}

modeButtons.forEach(button => {
  button.addEventListener('click', () => {
    setMode(button.dataset.mode);
  });
});

setMode('pomodoro');

// takenlijst
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTaskToDOM(taskText);
    taskInput.value = '';
    saveTasks();
  }
});

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    const span = li.querySelector('.task-text');
    tasks.push({
      text: span.textContent,
      completed: span.classList.contains('done')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}




function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}


function addTaskToDOM(taskText, completed = false) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const removeBtn = document.createElement('button');

  span.textContent = taskText;
  span.classList.add('task-text');
  if (completed) span.classList.add('done');

  span.addEventListener('click', () => {
    span.classList.toggle('done');
    saveTasks();
  });

  removeBtn.textContent = '🗑';
  removeBtn.classList.add('delete-task');
  removeBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // voorkomt dat het 'done' toggle activeert
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(removeBtn);
  taskList.appendChild(li);
}



loadTasks();

// donkere modus 
const darkToggle = document.getElementById('darkModeToggle');

function applyTheme(isDark) {
  document.body.classList.toggle('dark', isDark);
  localStorage.setItem('darkMode', isDark);
  darkToggle.checked = isDark;
}

darkToggle.addEventListener('change', () => {
  applyTheme(darkToggle.checked);
});

// Laad voorkeur bij opstarten
const savedTheme = localStorage.getItem('darkMode') === 'true';
applyTheme(savedTheme);
