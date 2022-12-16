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
    const task = new Task('clean the room', 1);
    task.Add();
    const result = JSON.parse(localStorage.getItem('to_do_list'));
    expect(result).toEqual([
      { description: 'clean the room', completed: false, index: 1 },
      { description: 'clean the room', completed: false, index: 1 },
    ]);
  });
});
