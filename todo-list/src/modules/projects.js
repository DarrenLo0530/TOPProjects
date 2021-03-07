import Task from "./task";

class Project {
    constructor(name, tasks = []) { 
        this._name = name;
        this._tasks = tasks;
        this._tasks.forEach(task => task.projectName = name);
    }

    get name() {
        return this._name;
    }

    get tasks() {
        return this._tasks;
    }

    addTask(task) {
        this.tasks.push(task);  
        task.projectName = this._name;
    }

    removeTask(removedTask) {
        this._tasks = this.tasks.filter(task => task !== removedTask);
        removedTask.projectName = null;
    }

    static revive(data) {
        return new Project(data._name, data._tasks.map(task => Task.revive(task)));
    }

}

export default Project;