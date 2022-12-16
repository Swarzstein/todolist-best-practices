/*
 * @jest-environment jsdom
 */

import Task from '../modules/task.js';

describe('Task', () => {
  test('add a task', () => {
    const task = new Task('clean the room', 1);
    task.Add();
    const result = JSON.parse(localStorage.getItem('to_do_list'));
    expect(result).toEqual([
      { description: 'clean the room', completed: false, index: 1 },
    ]);
  });
});
