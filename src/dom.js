const mainContent = document.querySelector('#content');
const mySelect = document.querySelector('#mySelect');
const projectForm = document.querySelector('#projectForm');
const newProjBtn = document.querySelector('#newProjBtn');
const createProject = document.querySelector('#createProject');
const projectName = document.querySelector('#projectName');


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

  return {
    createProjectForm,
    hideProjectForm,
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
};