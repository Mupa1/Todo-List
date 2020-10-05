import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import render from './render';
// import project from './project';

const content = document.querySelector('#content');
// const projects = document.querySelector('#projects');

content.appendChild(render());
