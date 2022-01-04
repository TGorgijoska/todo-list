import Project from './project.js';
import Todos from './todos.js';

function setStorage(name, value){
    localStorage.setItem(name, JSON.stringify(value));
}

function getProjects(){
    let projects = JSON.parse(localStorage.getItem('projects'));
    projects.map((el) => { return el=Project(el.name) });
    return projects;
}
function getTodos(projectName){
    let todos = JSON.parse(localStorage.getItem(projectName));
    todos.map((el) => { return el = Todos(el.name, el.priority, el.descr)})
}

export {getProjects, getTodos};