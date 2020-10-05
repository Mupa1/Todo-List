import todoObject from './todo';
import projectObject from './project';
import {
  mainContent,
  todoDetails,
  todosContents,
  todos,
} from './dom';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

const allProjects = [];

const renderCurrentProject = (currentProject) => {
  allProjects.forEach((proj) => {
    if (proj === currentProject) {
      for (let i = 0; i < proj.todoList.length; i += 1) {
        todoDetails.innerHTML = proj.todoList[i].title;

        // alert('anything');
        todos.appendChild(todoDetails);
        // todosContents = proj.todoList[i].description;
        // todos.appendChild(todosContents);
        // todosContents = proj.todoList[i].dueDate;
        // todos.appendChild(todosContents);
        // todosContents = proj.todoList[i].priority;
        // todos.appendChild(todosContents);
        mainContent.appendChild(todos);
      }
    } else {
      alert('Not Found');
    }
  });
};

const initial = () => {
  const defaultProject = projectObject('efaultProject');
  const defaultTodo = todoObject('myDefaultTodo', 'just for default', '05-10-2020', 1);
  defaultProject.todoList.push(defaultTodo);
  allProjects.push(defaultProject);
  const currentProject = defaultProject;
  renderCurrentProject(currentProject);
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