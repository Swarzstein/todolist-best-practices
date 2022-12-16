/*
 * @jest-environment jsdom
 */

import Status, { deleteCompleted } from '../modules/status.js';
import Task from '../modules/task.js';

localStorage.setItem(
  'to_do_list',
  JSON.stringify([
    { description: 'clean the room', completed: false, index: 1 },
    { description: 'clean the kitchen', completed: false, index: 2 },
    { description: 'make dinner', completed: false, index: 3 },
  ])
);

describe('Update Tasks status', () => {
  test('Second task', () => {
    const status = new Status(true, 2);
    status.Set();
    const result = JSON.parse(localStorage.getItem('to_do_list'));
    expect(result).toEqual([
      { description: 'clean the room', completed: false, index: 1 },
      { description: 'clean the kitchen', completed: true, index: 2 },
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
  test('Third task', () => {
    const status = new Status(true, 3);
    status.Set();
    const result = JSON.parse(localStorage.getItem('to_do_list'));
    expect(result).toEqual([
      { description: 'clean the room', completed: false, index: 1 },
      { description: 'clean the kitchen', completed: true, index: 2 },
      { description: 'make dinner', completed: true, index: 3 },
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

test('Delete Completed tasks', () => {
  deleteCompleted();
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
