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
} from './dom';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

const allProjects = [];

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
  const currentProject = defaultProject;
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

const validateProjInput = (ev) => {
  ev.preventDefault();
  if (projectName.value === '') {
    alert('Project cannot be empty');
  } else {
    createProjectName(projectName.value);
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

// const closeForm = () => {
//   document.getElementById("myForm").style.display = "none";
// }

mySelect.onchange = () => {
  renderCurrentProject(mySelect.value);
};
