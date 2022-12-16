/*
 * @jest-environment jsdom
 */

import Task from '../modules/task.js';

describe('Task', () => {
  test('Add first task', () => {
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

  test('Add second task', () => {
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

  test('Add third task', () => {
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
  test('Delete a task', () => {
    const task = new Task();
    task.Delete(2);
    const result = JSON.parse(localStorage.getItem('to_do_list'));
    expect(result).toEqual([
      { description: 'clean the room', completed: false, index: 1 },
      { description: 'make dinner', completed: false, index: 2 },
    ]);
  });
});
