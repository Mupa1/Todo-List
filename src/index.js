import { todoObject } from './todo';
import { projectObject } from './project';
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
        alert(proj.todoList[i].title);
        // proj.todoList[i].description;
        // proj.todoList[i].dueDate;
        // proj.todoList[i].priority;
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