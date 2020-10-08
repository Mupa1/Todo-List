import todoObject from './todo';
import projectObject from './project';
import {
  mainContent,
  todoDetails,
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
  cancelProject,
  cancelTodo,
  editTodo,
} from './dom';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

let allProjects = [];
let currentProject = '';
let currentTodo = '';

const selectBoxOption = () => {
  allProjects.forEach((proj) => {
    const option = document.createElement('option');
    option.innerHTML = proj.projectName;
    mySelect.appendChild(option);
  });
};

const priorityBg = (priority, todoDiv) => {
  if (priority === 'High') {
    todoDiv.classList.add('highPriority');
  } else if (priority === 'Low') {
    todoDiv.classList.add('lowPriority');
  }
};

const renderCurrentProject = (currentProject) => {
  if (currentProject === '') {
    currentProject = mySelect.value;
  }
  allProjects.forEach((proj) => {
    if (proj.projectName === currentProject) {
      domElements.removeMsg();
      todos.innerHTML = '';
      if (proj.todoList.length > 0) {
        for (let i = 0; i < proj.todoList.length; i += 1) {
          const todoDiv = document.createElement('div');
          priorityBg(proj.todoList[i].priority, todoDiv);
          todoDiv.classList.add('todoDiv');
          let todoString = `Title: ${proj.todoList[i].title} </br>`;
          todoString += `Description: ${proj.todoList[i].description} </br>`;
          todoString += `Due Date: ${proj.todoList[i].dueDate} </br>`;
          todoString += `Priority: ${proj.todoList[i].priority} </br>`;
          todoDiv.innerHTML = todoString;
          const editBtn = document.createElement('button');
          const deleteBtn = document.createElement('button');
          editBtn.innerHTML = 'Edit';
          deleteBtn.innerHTML = 'Delete';
          editBtn.classList.add('editBtn');
          deleteBtn.classList.add('deleteBtn');
          editBtn.value = i;
          deleteBtn.value = i;
          todoDiv.appendChild(editBtn);
          todoDiv.appendChild(deleteBtn);
          todos.appendChild(todoDiv);
          mainContent.appendChild(todos);
        }
      } else {
        todoDetails.innerHTML = 'No Todos';
      }
    }
  });
};

const saveAllProjects = () => {
  const str = JSON.stringify(allProjects);
  localStorage.setItem('allProjects', str);
};

const getTodos = () => {
  const str = localStorage.getItem('allProjects');
  allProjects = JSON.parse(str);
  if (!allProjects) {
    allProjects = [];
  }
};

const initial = () => {
  getTodos();
  selectBoxOption();
  renderCurrentProject(currentProject);
};

const createProjectName = (project) => {
  const newProject = projectObject(project);
  allProjects.push(newProject);
  saveAllProjects();
  domElements.errorMsgsAlert('PROJECT CREATED SUCCESSFULLY!');
  mySelect.innerHTML = '';
  selectBoxOption();
  domElements.hideProjectForm();
  currentProject = mySelect.value;
};

const createTodoObject = (title, description, dueDate, priority) => {
  if (currentProject === '') {
    createProjectName('Default Project');
  }

  const newTodo = todoObject(title, description, dueDate, priority);
  allProjects.forEach((proj) => {
    if (proj.projectName === currentProject) {
      proj.todoList.push(newTodo);
      saveAllProjects();
      renderCurrentProject(currentProject);
      domElements.hideTodoForm();
    }
  });
};

const validateProjInput = (ev) => {
  ev.preventDefault();
  if (projectName.value === '') {
    domElements.errorMsgsAlert('PROJECT CANNOT BE EMPTY!');
  } else {
    createProjectName(projectName.value);
  }
};

const validateTodoInput = (ev) => {
  ev.preventDefault();
  if (todoTitle.value === '') {
    domElements.errorMsgsAlert('TITLE CANNOT BE EMPTY!');
  } else {
    createTodoObject(todoTitle.value, todoDescription.value, todoDate.value, todoPriority.value);
  }
};

const deleteTodo = (target) => {
  allProjects.forEach((proj) => {
    if (proj.projectName === currentProject) {
      proj.todoList.splice(target.value, 1);
      saveAllProjects();
      renderCurrentProject(currentProject);
    }
  });
};

const showEditTodoForm = (target) => {
  domElements.createTodoForm();
  domElements.hideCreateTodo();
  allProjects.forEach((proj) => {
    if (proj.projectName === currentProject) {
      const temp = proj.todoList[target.value];
      todoTitle.value = temp.title;
      todoDescription.value = temp.description;
      todoDate.value = temp.dueDate;
      todoPriority.value = temp.priority;
      currentTodo = target.value;
    }
  });
};

const editTodoObject = () => {
  domElements.showCreateTodo();
  domElements.hideTodoForm();
  allProjects.forEach((proj) => {
    if (proj.projectName === currentProject) {
      // eslint-disable-next-line max-len
      const editedTodo = todoObject(todoTitle.value, todoDescription.value, todoDate.value, todoPriority.value);
      proj.todoList[currentTodo] = editedTodo;
      const objIndex = allProjects.findIndex((obj => obj.projectName === currentProject));
      allProjects[objIndex] = proj;
      saveAllProjects();
      renderCurrentProject(currentProject);
    }
  });
};

const btnListner = (targetBtn) => {
  if (targetBtn.classList === 'editBtn') {
    showEditTodoForm(targetBtn);
  } else if (targetBtn.classList === 'deleteBtn') {
    deleteTodo(targetBtn);
  }
};

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

cancelProject.onclick = (ev) => {
  ev.preventDefault();
  domElements.hideProjectForm();
};

cancelTodo.onclick = (ev) => {
  ev.preventDefault();
  domElements.hideTodoForm();
  domElements.showCreateTodo();
};

editTodo.onclick = (ev) => {
  ev.preventDefault();
  editTodoObject();
};

newTodo.onclick = () => {
  domElements.createTodoForm();
};

todos.addEventListener('click', (e) => {
  btnListner(e.target);
});

mySelect.onchange = () => {
  currentProject = mySelect.value;
  renderCurrentProject(currentProject);
};
