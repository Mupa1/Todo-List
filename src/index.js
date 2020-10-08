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
  cancelProject,
  cancelTodo,
  editTodo,
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

const priorityBg = (priority, todoDiv) => {
  if (priority === 'High') {
    todoDiv.classList.add('highPriority');
  } else if (priority === 'Low') {
    todoDiv.classList.add('lowPriority');
  }
};

const renderCurrentProject = (currentProject) => {
  allProjects.forEach((proj) => {
    if (proj.projectName === currentProject) {
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

const initial = () => {
  const defaultProject = projectObject('Default Project');
  const secondProject = projectObject('Second Project');
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
  alert('Success!');
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

const deleteTodo = (target) => {
  allProjects.forEach((proj) => {
    if (proj.projectName === currentProject) {
      proj.todoList.splice(target.value, 1);
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
    }
  });
};

const btnListner = (targetBtn) => {
  if (targetBtn.classList == 'editBtn') {
    showEditTodoForm(targetBtn);
  } else if (targetBtn.classList == 'deleteBtn') {
    deleteTodo(targetBtn);
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
  domElements.showCreateTodo();
  domElements.hideTodoForm();
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
