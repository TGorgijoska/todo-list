import Project from './project.js';
import Todos from './todos.js';

function setStorage(name, value){
    localStorage.setItem(name, JSON.stringify(value));
}

function getProjects(){
    let projects = JSON.parse(localStorage.getItem('projects'));
    if(projects == null) return [];
    return projects.map(el => el = Project(el.name) );
}
function getTodos(projectName){
    let todos = JSON.parse(localStorage.getItem(projectName));
    if(todos == null) return [];
    return todos.map(el => el = Todos(el.name, el.priority, el.date, el.done));   
}
function projectsStorage(...projects){
    setStorage('projects', projects);
}

export {projectsStorage, getProjects, getTodos, setStorage};