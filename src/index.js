import todoObject from './todo';
import projectObject from './project';
import {
  mainContent,
  todoDetails,
  todosContents,
  todos,
  mySelect,
  domElements,
  newProjBtn,
  createProject,
  projectName,
  createTodo,
  todoTitle,
  todoDescription,
  todoDate,
  todoPriority,
} from './dom';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

const allProjects = [];
let currentProject = '';

const selectBoxOption = () => {
  // mySelect = '';
  allProjects.forEach((proj) => {
    const option = document.createElement('option');
    option.innerHTML = proj.projectName;
    mySelect.appendChild(option);
  });
};

const renderCurrentProject = (currentProject) => {
  allProjects.forEach((proj) => {
    if (proj.projectName === currentProject) {
      if (proj.todoList.length > 0) {
        for (let i = 0; i < proj.todoList.length; i += 1) {
          todoDetails.innerHTML = proj.todoList[i].title;
          todos.appendChild(todoDetails);
          mainContent.appendChild(todos);
        }
      } else {
        todoDetails.innerHTML = '';
      }
    }
  });
};

const initial = () => {
  const defaultProject = projectObject('defaultProject');
  const secondProject = projectObject('secondProject');
  const defaultTodo = todoObject('First Todo ', 'just for default', '05-10-2020', 1);
  const secondTodo = todoObject('Second Todo ', 'just for default', '05-10-2020', 1);

  defaultProject.todoList.push(defaultTodo);
  secondProject.todoList.push(secondTodo);

  allProjects.push(defaultProject);
  allProjects.push(secondProject);
  currentProject = defaultProject;
  renderCurrentProject(currentProject.projectName);
  selectBoxOption();
};

const createProjectName = (project) => {
  const newProject = projectObject(project);
  allProjects.push(newProject);
  mySelect.innerHTML = '';
  selectBoxOption();
  domElements.hideProjectForm();
  alert('success');
};

const createTodoObject = (title, description, dueDate, priority) => {
  const newTodo = todoObject(title, description, dueDate, priority);

  allProjects.forEach((proj) => {
    if (proj.projectName === currentProject) {
      proj.todoList.push(newTodo);
      alert(proj.todoList.length);
    }
  });
};

const validateProjInput = (ev) => {
  ev.preventDefault();
  if (projectName.value === '') {
    alert('Project cannot be empty');
  } else {
    createProjectName(projectName.value);
  }
};

const validateTodoInput = (ev) => {
  ev.preventDefault();
  if (todoTitle.value === '') {
    alert('Title cannot be empty');
  } else {
    createTodoObject(todoTitle.value, todoDescription.value, todoDate.value, todoPriority.value);
  }
};

// const saveAllProjects = () => {
//   const str = JSON.stringify(allProjects);
//   localStorage.setItem('allProjects', str);
// };

// // Get data from local storage
// const getTodos = () => {
//   const str = localStorage.getItem('allProjects');
//   allProjects = JSON.parse(str);
//   if (!allProjects) {
//     allProjects = [];
//   }
// };

initial();

newProjBtn.onclick = () => {
  domElements.createProjectForm();
};

createProject.onclick = (ev) => {
  validateProjInput(ev);
};

createTodo.onclick = (ev) => {
  validateTodoInput(ev);
};

// const closeForm = () => {
//   document.getElementById("myForm").style.display = "none";
// }

mySelect.onchange = () => {
  currentProject = mySelect.value;
  renderCurrentProject(currentProject);
};
