import { parseISO } from 'date-fns';
import { clamp } from './helper';

class Task {
  constructor(name, description, dueDate, priority, projectName = null) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectName = projectName;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }

  get dueDate() {
    return this._dueDate;
  }

  set dueDate(value) {
    this._dueDate = value;
  }

  get priority() {
    return this._priority;
  }

  set priority(value) {
    this._priority = clamp(0, 100, parseInt(value, 10));
  }

  get projectName() {
    return this._projectName;
  }

  set projectName(value) {
    this._projectName = value;
  }

  static revive(data) {
    // Revives a task from basic object
    return new Task(data._name, data._description, parseISO(data._dueDate),
      data._priority, data._projectName);
  }
}
export default Task;
