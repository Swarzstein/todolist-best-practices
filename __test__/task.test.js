/*
 * @jest-environment jsdom
 */

import Task from '../modules/task.js';

describe('Task', () => {
  test('add first task', () => {
    const task = new Task('clean the room', 1);
    task.Add();
    const result = JSON.parse(localStorage.getItem('to_do_list'));
    expect(result).toEqual([
      { description: 'clean the room', completed: false, index: 1 },
    ]);
  });

  test('add second task', () => {
    const task = new Task('clean the kitchen', 2);
    task.Add();
    const result = JSON.parse(localStorage.getItem('to_do_list'));
    expect(result).toEqual([
      { description: 'clean the room', completed: false, index: 1 },
      { description: 'clean the kitchen', completed: false, index: 2 },
    ]);
  });

  test('add third task', () => {
    const task = new Task('make dinner', 3);
    task.Add();
    const result = JSON.parse(localStorage.getItem('to_do_list'));
    expect(result).toEqual([
      { description: 'clean the room', completed: false, index: 1 },
      { description: 'clean the kitchen', completed: false, index: 2 },
      { description: 'make dinner', completed: false, index: 3 },
    ]);
  });
  test('delete a task', () => {
    const task = new Task();
    task.Delete(2);
    const result = JSON.parse(localStorage.getItem('to_do_list'));
    expect(result).toEqual([
      { description: 'clean the room', completed: false, index: 1 },
      { description: 'make dinner', completed: false, index: 2 },
    ]);
  });
});
