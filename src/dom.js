const mainContent = document.querySelector('#content');
const mySelect = document.querySelector('#mySelect');

const todos = document.createElement('div');
const todoDetails = document.createElement('p');


const todosContents = todoDetails.innerHTML;

export {
  mainContent,
  todoDetails,
  todosContents,
  todos,
  mySelect,
};