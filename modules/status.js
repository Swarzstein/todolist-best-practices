export default class Status {
  constructor(completed, index) {
    this.completed = completed;
    this.index = index;
  }

  Set = () => {
    const tasks = JSON.parse(localStorage.getItem('to_do_list'));
    tasks[this.index - 1].completed = this.completed;
    localStorage.setItem('to_do_list', JSON.stringify(tasks));
  };
}

const setCheckboxListener = () => {
  document.querySelectorAll('.checked').forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
      const checkboxId = e.target.id;
      const index = parseInt(e.target.parentNode.parentNode.id, 10);
      const Completed = () => {
        try {
          if (document.querySelector(`#${checkboxId}:checked`).value !== null) {
            document.querySelector(`#task${index}`).classList.add('completed');
            return true;
          }
        } catch (error) {
          document.querySelector(`#task${index}`).classList.remove('completed');
        }
        return false;
      };
      const status = new Status(Completed(), index);
      status.Set();
    });
  });
};

const checkCompleted = () => {
  const tasks = JSON.parse(localStorage.getItem('to_do_list'));
  if (tasks !== null) {
    tasks.forEach((task) => {
      if (task.completed === true) {
        document.querySelector(`#task${task.index}`).classList.add('completed');
        try {
          document.getElementById(`chk${task.index}`).checked = true;
          // eslint-disable-next-line no-empty
        } catch (error) {}
      }
    });
  }
};

const deleteCompleted = () => {
  let tasks = JSON.parse(localStorage.getItem('to_do_list'));
  const checked = [];
  tasks = tasks.filter((task) => {
    if (task.completed === true) {
      checked.push(task.index);
      return false;
    }
    return true;
  });
  for (let i = checked.length - 1; i >= 0; i -= 1) {
    tasks.forEach((task) => {
      if (task.index > checked[i]) {
        task.index -= 1;
      }
    });
  }
  localStorage.setItem('to_do_list', JSON.stringify(tasks));
};

export { setCheckboxListener, checkCompleted, deleteCompleted };
