const mainContent = document.querySelector('#content');
const mySelect = document.querySelector('#mySelect');
const projectForm = document.querySelector('#projectForm');
const newProjBtn = document.querySelector('#newProjBtn');
const createProject = document.querySelector('#createProject');
const cancelProject = document.querySelector('#cancelProject');

const projectName = document.querySelector('#projectName');
const todoForm = document.querySelector('#todoForm');
const createTodo = document.querySelector('#createTodo');
const cancelTodo = document.querySelector('#cancelTodo');

const todoTitle = document.querySelector('#todoTitle');
const todoDescription = document.querySelector('#todoDescription');
const todoDate = document.querySelector('#todoDate');
const todoPriority = document.querySelector('#todoPriority');
const newTodo = document.querySelector('#newTodo');
const deleteTodo = document.getElementsByClassName('deleteBtn');


const todos = document.createElement('div');
const todoDetails = document.createElement('p');




const todosContents = todoDetails.innerHTML;

const domElements = (function () {
  const createProjectForm = () => {
    projectForm.style.display = "block";
  };

  const hideProjectForm = () => {
    projectForm.style.display = "none";
  };

  const hideTodoForm = () => {
    todoForm.style.display = "none";
  };

  const createTodoForm = () => {
    todoForm.style.display = "block";
  };

  return {
    createProjectForm,
    hideProjectForm,
    createTodoForm,
    hideTodoForm,
  };
}());

export {
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
  deleteTodo,
};