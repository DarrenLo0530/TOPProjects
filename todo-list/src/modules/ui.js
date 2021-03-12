/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import { format, parseISO } from 'date-fns';
import attachModalListeners from './modal';
import {
  addProject, deleteProject, getProjectsList, loadProjectsLocal, saveProjectsLocal,
  getAllTasks, getTodaysTasks, completeTask,
} from './project-manager';

import Project from './projects';
import Task from './task';

let selectedProject;

function getValueAndClear(id) {
  const $field = document.querySelector(id);
  const fieldValue = $field.value;
  $field.value = '';

  return fieldValue;
}

function displayProjectHeader(headerTitle, canCreateTask) {
  const $projectHeader = document.querySelector('#tasks header');

  if (canCreateTask) {
    $projectHeader.querySelector('button').style.display = 'inline-block';
  } else {
    $projectHeader.querySelector('button').style.display = 'none';
  }

  $projectHeader.querySelector('h1').textContent = headerTitle;
}

function displayTasks(tasks) {
  const $tasksContainer = document.querySelector('.checklist');
  $tasksContainer.textContent = '';
  if (tasks.length) {
    tasks.forEach((task, index) => {
      $tasksContainer.appendChild(createTaskDisplay(task, index));
    });
  } else {
    const $noTasksMessage = document.createElement('p');
    $noTasksMessage.textContent = 'No tasks';

    $tasksContainer.appendChild($noTasksMessage);
  }
}

function displayAllTasks() {
  displayProjectHeader('All tasks', false);
  displayTasks(getAllTasks());
}

function displayTodayTasks() {
  displayProjectHeader("Today's tasks", false);
  displayTasks(getTodaysTasks());
}

function displaySelectedProject() {
  if (!selectedProject) {
    const $tasksContainer = document.querySelector('#tasks .checklist');
    displayProjectHeader('No Project Selected', false);
    $tasksContainer.textContent = '';
  } else if (selectedProject === 'all') {
    displayAllTasks();
  } else if (selectedProject === 'today') {
    displayTodayTasks();
  } else {
    displayProjectHeader(selectedProject.name, true);
    displayTasks(selectedProject.tasks);
  }
}

function createTaskDisplay(task, index) {
  const $taskTemplate = document.createElement('template');
  $taskTemplate.innerHTML = `<li class="checklist-item checked">
            <div class="checklist-item-main">
                <button class="task-complete"></button>
                <p class="item-name editable" id="item-name-${index}">${task.name}</p>
                <input type="text" class="editor item-name" data-editor="item-name-${index}" value="${task.name}">

                <div>
                    <span class="item-priority editable" id="item-priority-${index}">P${task.priority}</span>
                    <input type="number" class="editor item-priority" data-editor="item-priority-${index}" min="0" max ="100" value="${task.priority}">
                    
                    <span class="item-due editable" id="item-due-${index}">${format(task.dueDate, 'yyyy-MM-dd HH:mm')}</span>
                    <input type="datetime-local" class="editor item-due" data-editor="item-due-${index}" value="${format(task.dueDate, "yyyy-MM-dd'T'HH:mm")}">
                </div>
            </div>
            <div class="item-details"> 
                <p class="item-desc editable" id="item-desc-${index}">${task.description}</p>
                <textarea class="editor item-desc" data-editor="item-desc-${index}">${task.description}</textarea>
            </div>
        </li>`;

  const $task = $taskTemplate.content.childNodes[0];
  $task.querySelector('.task-complete').onclick = () => {
    completeTask(task);
    saveProjectsLocal();
    displaySelectedProject();
  };

  // Allow for editing of the fields
  $task.querySelector('input.item-name').addEventListener('change', (event) => {
    task.name = event.target.value;
  });
  $task.querySelector('textarea.item-desc').addEventListener('change', (event) => {
    task.description = event.target.value;
  });
  $task.querySelector('input.item-due').addEventListener('change', (event) => {
    task.dueDate = parseISO(event.target.value);
  });
  $task.querySelector('input.item-priority').addEventListener('change', (event) => {
    task.priority = event.target.value;
  });

  $task.querySelectorAll('.editable').forEach(($editable) => {
    const $editor = $task.querySelector(`[data-editor=${$editable.id}]`);
    $editable.addEventListener('click', () => {
      $editable.classList.add('editing');
      $editor.classList.add('editing');
      $editor.focus();
    });

    $editor.addEventListener('focusout', () => {
      $editor.classList.remove('editing');
      $editable.classList.remove('editing');
      saveProjectsLocal();
      displaySelectedProject();
    });
  });

  return $task;
}

/* Display all tasks button */
function displayProjectsList() {
  loadProjectsLocal();

  // Clear side bar
  const $projectList = document.querySelector('#projects-list');
  $projectList.textContent = '';

  getProjectsList().forEach((project) => {
    const $projectButton = document.createElement('div');
    $projectButton.className = 'project-button';

    // Create button to select a project
    const $projectSelect = document.createElement('button');
    $projectSelect.className = 'project-select';
    $projectSelect.setAttribute('data-projectName', project.name);
    $projectSelect.textContent = project.name;

    // Add event listener
    $projectSelect.onclick = () => {
      selectedProject = project;
      displaySelectedProject();
    };

    // Create button to delete a project
    const $projectDelete = document.createElement('button');
    $projectDelete.className = 'project-delete delete-button';
    $projectDelete.onclick = () => {
      if (confirm('Delete this project')) {
        deleteProject(project);

        if (selectedProject === project) {
          selectedProject = null;
        }

        saveProjectsLocal();
        displayProjectsList();
        displaySelectedProject();
      }
    };

    $projectButton.appendChild($projectSelect);
    $projectButton.appendChild($projectDelete);

    $projectList.append($projectButton);
  });
}

/* Allow for creation of projects */
(function initializeProjectCreation() {
  /* Set create projects button */
  const $createProjectButton = document.querySelector('#create-project');
  $createProjectButton.onclick = () => {
    // Get field value and clear
    const projectName = getValueAndClear('#project-name');

    // Alert if invalid
    if (!projectName) {
      alert('Project name must be non-empty');
      return;
    }

    const createdProject = new Project(projectName);
    if (!addProject(createdProject)) {
      alert('There already exists a project with this name');
    }

    saveProjectsLocal();
    displayProjectsList();
  };
}());

/* Allow for creation of tasks */
(function initializeTaskCreation() {
  const $createTaskButton = document.querySelector('#create-task');

  $createTaskButton.onclick = () => {
    const taskName = getValueAndClear('#task-name');
    const taskDesc = getValueAndClear('#task-desc');
    const taskPriority = getValueAndClear('#task-priority');
    const taskDue = getValueAndClear('#task-due');

    if (!taskName || !taskDesc || !taskPriority || !taskDue) {
      alert('One or more fields are empty');
      return;
    }

    const createdTask = new Task(taskName, taskDesc, parseISO(taskDue), taskPriority);
    selectedProject.addTask(createdTask);

    saveProjectsLocal();
    displaySelectedProject();
  };
}());

(function initializeAllTasksButton() {
  const $allTasksButton = document.querySelector('#all-tasks');
  $allTasksButton.onclick = () => {
    selectedProject = 'all';
    displaySelectedProject();
  };
}());

(function initializeTodayTasksButton() {
  const $todayTasksButton = document.querySelector('#today-tasks');
  $todayTasksButton.onclick = () => {
    selectedProject = 'today';
    displaySelectedProject();
  };
}());

function loadPage() {
  attachModalListeners();
  displayProjectsList();
  displaySelectedProject();
}

export default loadPage;
