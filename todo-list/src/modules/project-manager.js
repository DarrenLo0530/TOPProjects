import Project from './projects';
import { daysBetween } from './helper';

let projectsList = [];

function getProjectsList() {
  return projectsList;
}

function getProjectByName(name) {
  return projectsList.find((project) => project.name === name);
}

function deleteProject(deletedProject) {
  projectsList = projectsList.filter((project) => project !== deletedProject);
}

function saveProjectsLocal() {
  localStorage.setItem('projectsList', JSON.stringify(projectsList));
}

function addProject(project) {
  // Return false if project with name already exists
  if (getProjectByName(project.name)) {
    return false;
  }

  projectsList.push(project);
  saveProjectsLocal();

  return true;
}

function loadProjectsLocal() {
  if (localStorage.getItem('projectsList')) {
    projectsList = JSON.parse(localStorage.getItem('projectsList'));
    // Make projects objects again
    projectsList = projectsList.map((projectData) => Project.revive(projectData));
  }
}

function getAllTasks() {
  let allTasks = [];
  projectsList.forEach((project) => { allTasks = allTasks.concat(project.tasks); });

  return allTasks;
}

function getTodaysTasks() {
  const currTime = new Date();
  return getAllTasks().filter((task) => {
    const timeBetween = daysBetween(currTime, task.dueDate);
    return timeBetween >= 0 && timeBetween <= 1;
  });
}

function getTaskProject(task) {
  return projectsList.find((project) => project.name === task.projectName);
}

function completeTask(task) {
  getTaskProject(task).removeTask(task);
}

export {
  getProjectByName, deleteProject, addProject, saveProjectsLocal, loadProjectsLocal,
  getProjectsList, getAllTasks, getTodaysTasks, completeTask,
};
