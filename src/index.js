import './style.css';
import Task from '../modules/task.js';

import {
  setCheckboxListener,
  checkCompleted,
  deleteCompleted,
} from '../modules/status.js';

const newTaskInput = document.querySelector('#new-task');
const element = document.querySelector('#todolist');

const getToDoList = () => {
  const storage = JSON.parse(localStorage.getItem('to_do_list'));
  const toDoList = storage === null ? [] : storage;
  return toDoList;
};

const printList = () => {
  const list = getToDoList();
  let tasks =
    list.length > 0 ? list.sort((a, b) => (a.index > b.index ? 1 : -1)) : list;
  tasks = tasks.map(
    (task) => `
    <li id = "${task.index}" class="item">
      <label>
        <input class="checked" type="checkbox" name="chk${task.index}" id="chk${task.index}">
        <input required class="edit borderless fit hidden" type="text" name="edit${task.index}" id="edit${task.index}" placeholder="Edit task...">
        <p id="task${task.index}">${task.description}</p>
      </label>
      <div class="edit-manager flex hidden">
        <button class="edit-confirm">Confirm</button>
        <button class="edit-cancel">Cancel</button>
      </div>
      <div class="list-editor flex">
        <button class="edit-task">edit</button>
        <button class="delete-task">Del</button>
      </div>
    </li>
  `
  );
  tasks = tasks.length > 1 ? tasks.reduce((prev, task) => prev + task) : tasks;

  element.innerHTML = tasks;

  const confirmEditTask = (e) => {
    const taskIndex = parseInt(e.target.parentNode.parentNode.id, 10);
    const newDescription = document.getElementById(`edit${taskIndex}`).value;
    if (newDescription !== '') {
      const taskElement = document.getElementById(`${taskIndex}`);
      const task = new Task(newDescription, taskIndex);
      task.Edit();

      document.querySelector(`#edit${taskIndex}`).classList.add('hidden');
      document.querySelector(`#task${taskIndex}`).classList.remove('hidden');

      taskElement.querySelector('.edit-manager').classList.add('hidden');
      taskElement.querySelector('.list-editor').classList.remove('hidden');
      printList();
    }
  };

  // Start editting
  document.querySelectorAll('.edit-task').forEach((editButton) => {
    editButton.addEventListener('click', (e) => {
      const taskIndex = parseInt(e.target.parentNode.parentNode.id, 10);
      document.getElementById(`edit${taskIndex}`).value =
        document.querySelector(`#task${taskIndex}`).innerHTML;
      const taskElement = document.getElementById(`${taskIndex}`);
      const editTask = document.querySelector(`#edit${taskIndex}`);
      editTask.classList.remove('hidden');
      document.querySelector(`#task${taskIndex}`).classList.add('hidden');

      taskElement.querySelector('.edit-manager').classList.remove('hidden');
      taskElement.querySelector('.list-editor').classList.add('hidden');

      editTask.addEventListener('keypress', (e) => {
        const keypressed = editTask ? e.keyCode : e.which;
        if (keypressed === 13) confirmEditTask(e);
      });
    });
  });

  // Confirm task edition
  document.querySelectorAll('.edit-confirm').forEach((editConfirm) => {
    editConfirm.addEventListener('click', confirmEditTask);
  });

  // Cancel task etition
  document.querySelectorAll('.edit-cancel').forEach((editCancel) => {
    editCancel.addEventListener('click', (e) => {
      const taskIndex = parseInt(e.target.parentNode.parentNode.id, 10);
      const taskElement = document.getElementById(`${taskIndex}`);

      document.querySelector(`#edit${taskIndex}`).classList.add('hidden');
      document.querySelector(`#task${taskIndex}`).classList.remove('hidden');

      taskElement.querySelector('.edit-manager').classList.add('hidden');
      taskElement.querySelector('.list-editor').classList.remove('hidden');

      printList();
    });
  });

  // delete selected task
  document.querySelectorAll('.delete-task').forEach((deleteButton) => {
    deleteButton.addEventListener('click', (e) => {
      const task = new Task();
      const taskIndex = parseInt(e.target.parentNode.parentNode.id, 10);
      task.Delete(taskIndex);

      printList();
    });
  });

  checkCompleted();
  setCheckboxListener();
};

if (getToDoList() !== []) {
  printList();
}

const addNewTask = () => {
  if (newTaskInput.value !== '') {
    const newIndex = getToDoList().length + 1;
    const task = new Task(newTaskInput.value, newIndex);
    task.Add();
    newTaskInput.value = '';
    printList();
  }
};

// Add new Task
document.querySelector('#add').addEventListener('click', addNewTask);
newTaskInput.addEventListener('keypress', (e) => {
  const keypressed = newTaskInput ? e.keyCode : e.which;
  if (keypressed === 13) addNewTask();
});

// Clear all selected
document.querySelector('#clear-list').addEventListener('click', () => {
  deleteCompleted();
  printList();
  checkCompleted();
});
