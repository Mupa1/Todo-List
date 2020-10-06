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
  newTodo,
} from './dom';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      todos.innerHTML = '';
      if (proj.todoList.length > 0) {
        for (let i = 0; i < proj.todoList.length; i += 1) {
          const todoDiv = document.createElement('div');
          todoDiv.classList.add('todoDiv');
          let todoString = `Title: ${proj.todoList[i].title} </br>`;
          todoString += `Desscription: ${proj.todoList[i].description} </br>`;
          todoString += `Due Date: ${proj.todoList[i].dueDate} </br>`;
          todoString += `Priority: ${proj.todoList[i].priority} </br>`;
          todoDiv.innerHTML = todoString;
          todos.appendChild(todoDiv);
          mainContent.appendChild(todos);
        }
      } else {
        todoDetails.innerHTML = 'No Todos';
      }
    }
  });
};

const initial = () => {
  const defaultProject = projectObject('defaultProject');
  const secondProject = projectObject('secondProject');
  const defaultTodo = todoObject('First Todo ', 'just for default', '2020-10-05', 'High');
  const secondTodo = todoObject('Second Todo ', 'just for default', '2020-10-05', 'Low');

  defaultProject.todoList.push(defaultTodo);
  secondProject.todoList.push(secondTodo);

  allProjects.push(defaultProject);
  allProjects.push(secondProject);
  currentProject = defaultProject.projectName;
  renderCurrentProject(currentProject);
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
      renderCurrentProject(currentProject);
      domElements.hideTodoForm();
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

newTodo.onclick = () => {
  domElements.createTodoForm();
};

mySelect.onchange = () => {
  currentProject = mySelect.value;
  renderCurrentProject(currentProject);
};
