import Project from './project.js';
import Todos from './todos.js';
import { getOpenedProject } from './interface.js';
import { remove } from "lodash";

export function setStorage(name, value){
    localStorage.setItem(name, JSON.stringify(value));
}

export function getProjects(){
    let projects = JSON.parse(localStorage.getItem('projects'));
    if(projects == null) return [];
    return projects.map(el => el = Project(el.name) );
}
export function getTodos(projectName){
    let todos = JSON.parse(localStorage.getItem(projectName));
    if(todos == null) return [];
    return todos.map(el => el = Todos(el.name, el.priority, el.date, el.done));   
}
export function addProjectStorage(project){
    const projectsArr = getProjects();  
    projectsArr.push(project);
    setStorage('projects',projectsArr);

}
export function removeProjectStorage(name){
    let projectsArr = getProjects();
    projectsArr = remove(projectsArr, (el) => {
        return el.name != name;
    })
    setStorage('projects', projectsArr);
    localStorage.removeItem(name);
}
export function addTodoStorage(todo){
    let todoArr = getTodos(getOpenedProject());
    todoArr.push(todo);
    setStorage(getOpenedProject(), todoArr);
}
export function removeTodoStorage(name){
    let todoArr = getTodos(getOpenedProject());
    todoArr = remove(todoArr, (el) => {
        return el.name != name;
    })
    
    setStorage(getOpenedProject(), todoArr);
}

export function updateDoneTodo(project, todo, done){
    const todos = getTodos(project);
    todos.forEach(el => {
        if(el.name == todo)
            el.done = done;
    })
    setStorage(project, todos);
}