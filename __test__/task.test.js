/*
 * @jest-environment jsdom
 */

import Task from '../modules/task.js';

describe('Add Task', () => {
  test('First task', () => {
    const task = new Task('clean the room', 1);
    task.Add();
    const result = JSON.parse(localStorage.getItem('to_do_list'));
    expect(result).toEqual([
      { description: 'clean the room', completed: false, index: 1 },
    ]);

    let generatedHTML = '';
    result.forEach((element) => {
      generatedHTML += `<li id="${element.index}"  class="item"></li>`;
    });
    document.body.innerHTML = `<div><ul id='todolist'>${generatedHTML}</ul></div>`;
    const list = document.querySelectorAll('.item');
    expect(list).toHaveLength(result.length);
  });

  test('Second task', () => {
    const task = new Task('clean the kitchen', 2);
    task.Add();
    const result = JSON.parse(localStorage.getItem('to_do_list'));
    expect(result).toEqual([
      { description: 'clean the room', completed: false, index: 1 },
      { description: 'clean the kitchen', completed: false, index: 2 },
    ]);

    let generatedHTML = '';
    result.forEach((element) => {
      generatedHTML += `<li id="${element.index}"  class="item"></li>`;
    });
    document.body.innerHTML = `<div><ul id='todolist'>${generatedHTML}</ul></div>`;
    const list = document.querySelectorAll('.item');
    expect(list).toHaveLength(result.length);
  });

  test('Third task', () => {
    const task = new Task('make dinner', 3);
    task.Add();
    const result = JSON.parse(localStorage.getItem('to_do_list'));
    expect(result).toEqual([
      { description: 'clean the room', completed: false, index: 1 },
      { description: 'clean the kitchen', completed: false, index: 2 },
      { description: 'make dinner', completed: false, index: 3 },
    ]);

    let generatedHTML = '';
    result.forEach((element) => {
      generatedHTML += `<li id="${element.index}"  class="item"></li>`;
    });
    document.body.innerHTML = `<div><ul id='todolist'>${generatedHTML}</ul></div>`;
    const list = document.querySelectorAll('.item');
    expect(list).toHaveLength(result.length);
  });
});

describe('Edit Task', () => {
  test('first task', () => {
    const task = new Task('wash the car', 1);
    task.Edit();
    const result = JSON.parse(localStorage.getItem('to_do_list'));
    expect(result).toEqual([
      { description: 'wash the car', completed: false, index: 1 },
      { description: 'clean the kitchen', completed: false, index: 2 },
      { description: 'make dinner', completed: false, index: 3 },
    ]);
  });
  test('Second task', () => {
    const task = new Task('walk the dog', 2);
    task.Edit();
    const result = JSON.parse(localStorage.getItem('to_do_list'));
    expect(result).toEqual([
      { description: 'wash the car', completed: false, index: 1 },
      { description: 'walk the dog', completed: false, index: 2 },
      { description: 'make dinner', completed: false, index: 3 },
    ]);
  });
});

describe('Delete Task', () => {
  test('Second task', () => {
    const task = new Task();
    task.Delete(2);
    const result = JSON.parse(localStorage.getItem('to_do_list'));
    expect(result).toEqual([
      { description: 'wash the car', completed: false, index: 1 },
      { description: 'make dinner', completed: false, index: 2 },
    ]);

    let generatedHTML = '';
    result.forEach((element) => {
      generatedHTML += `<li id="${element.index}"  class="item"></li>`;
    });
    document.body.innerHTML = `<div><ul id='todolist'>${generatedHTML}</ul></div>`;
    const list = document.querySelectorAll('.item');
    expect(list).toHaveLength(result.length);
  });
  test('First task', () => {
    const task = new Task();
    task.Delete(1);
    const result = JSON.parse(localStorage.getItem('to_do_list'));
    expect(result).toEqual([
      { description: 'make dinner', completed: false, index: 1 },
    ]);

    let generatedHTML = '';
    result.forEach((element) => {
      generatedHTML += `<li id="${element.index}"  class="item"></li>`;
    });
    document.body.innerHTML = `<div><ul id='todolist'>${generatedHTML}</ul></div>`;
    const list = document.querySelectorAll('.item');
    expect(list).toHaveLength(result.length);
  });
});